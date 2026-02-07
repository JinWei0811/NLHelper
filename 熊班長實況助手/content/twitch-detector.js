(() => {
  const DEFAULT_SETTINGS = {
    sclick: true,
    snotification: false,
  };

  let settings = { ...DEFAULT_SETTINGS };
  let lastScanAt = 0;
  let lastPredictionSignal = 0;
  let lastPanelProbeAt = 0;
  const SCAN_DEBOUNCE_MS = 300;
  const PREDICTION_SIGNAL_COOLDOWN_MS = 30 * 1000;
  const PANEL_PROBE_COOLDOWN_MS = 20 * 1000;

  function loadSettings() {
    chrome.storage.local.get(DEFAULT_SETTINGS, (data) => {
      settings.sclick = Boolean(data.sclick);
      settings.snotification = Boolean(data.snotification);
      scanNow();
    });
  }

  function onStorageChanged(changes, areaName) {
    if (areaName !== "local") return;
    if (changes.sclick) settings.sclick = Boolean(changes.sclick.newValue);
    if (changes.snotification) settings.snotification = Boolean(changes.snotification.newValue);
    scanNow();
  }

  function claimPointsIfAvailable() {
    if (!settings.sclick) return;

    const claimBtn =
      document.querySelector('[data-test-selector="community-points-summary"] button[aria-label*="Claim"]') ||
      document.querySelector('[data-test-selector="community-points-summary"] button[aria-label*="領取"]') ||
      document.querySelector('[data-test-selector="claimable-bonus__icon"]') ||
      document.querySelector('.claimable-bonus__icon');

    if (claimBtn) {
      claimBtn.click();
      chrome.runtime.sendMessage({ type: "activityTab" });
    }
  }

  function isTargetChannel() {
    return location.hostname === "www.twitch.tv" && /^\/never_loses\/?$/i.test(location.pathname);
  }

  function getPredictionButton() {
    return (
      document.querySelector('[data-test-selector="prediction-blue-button"]') ||
      document.querySelector('[data-test-selector="prediction-pink-button"]') ||
      document.querySelector('[data-test-selector*="prediction"] button') ||
      document.querySelector('.fixed-prediction-button--blue') ||
      document.querySelector('.fixed-prediction-button--pink')
    );
  }

  function openCommunityPanelForProbe() {
    const now = Date.now();
    if (now - lastPanelProbeAt < PANEL_PROBE_COOLDOWN_MS) return;
    lastPanelProbeAt = now;

    const panelBtn =
      document.querySelector('[data-test-selector="community-points-summary"] button') ||
      document.querySelector('.community-points-summary button') ||
      document.querySelector('.tw-core-button');

    if (panelBtn) {
      panelBtn.click();
      setTimeout(() => {
        const maybePredictionCard =
          document.querySelector('[data-test-selector="prediction-card"]') ||
          document.querySelector('.predictions-list-item__body');
        if (maybePredictionCard) maybePredictionCard.click();
      }, 180);
    }
  }

  function notifyPredictionIfDetected() {
    if (!settings.snotification) return;
    if (!isTargetChannel()) return;

    let predictionBtn = getPredictionButton();

    // Fallback: Twitch sometimes renders prediction buttons only after opening panel/card
    if (!predictionBtn) {
      openCommunityPanelForProbe();
      setTimeout(() => {
        const delayedBtn = getPredictionButton();
        if (!delayedBtn) return;
        const nowDelayed = Date.now();
        if (nowDelayed - lastPredictionSignal < PREDICTION_SIGNAL_COOLDOWN_MS) return;
        lastPredictionSignal = nowDelayed;
        chrome.runtime.sendMessage({ type: "predictionDetected" });
      }, 350);
      return;
    }

    const now = Date.now();
    if (now - lastPredictionSignal < PREDICTION_SIGNAL_COOLDOWN_MS) return;

    lastPredictionSignal = now;
    chrome.runtime.sendMessage({ type: "predictionDetected" });
  }

  function scanNow() {
    try {
      claimPointsIfAvailable();
      notifyPredictionIfDetected();
    } catch (error) {
      // keep silent on content side
    }
  }

  function scheduleScan() {
    const now = Date.now();
    if (now - lastScanAt < SCAN_DEBOUNCE_MS) return;
    lastScanAt = now;
    scanNow();
  }

  function initObserver() {
    const observer = new MutationObserver(() => {
      scheduleScan();
    });

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "aria-label", "data-test-selector"],
    });
  }

  function initUrlChangeHooks() {
    const _pushState = history.pushState;
    const _replaceState = history.replaceState;

    history.pushState = function () {
      const ret = _pushState.apply(this, arguments);
      setTimeout(scanNow, 150);
      return ret;
    };

    history.replaceState = function () {
      const ret = _replaceState.apply(this, arguments);
      setTimeout(scanNow, 150);
      return ret;
    };

    window.addEventListener("popstate", () => setTimeout(scanNow, 150));
  }

  function initFallbackTicker() {
    setInterval(scanNow, 15000);
  }

  function init() {
    loadSettings();
    chrome.storage.onChanged.addListener(onStorageChanged);
    initObserver();
    initUrlChangeHooks();
    initFallbackTicker();
    scanNow();
  }

  init();
})();
