// background service worker (MV3)
console.log("chrome extension background is running!");

let clickTimes = 0;
let pointsStatus = 0;

const DEFAULT_SETTINGS = {
  sclick: true,
  snotification: false,
};

let settings = { ...DEFAULT_SETTINGS };
let lastNotifyAt = 0;
const NOTIFY_COOLDOWN_MS = 60 * 1000;

function loadSettings() {
  chrome.storage.local.get(DEFAULT_SETTINGS, (data) => {
    settings = {
      sclick: Boolean(data.sclick),
      snotification: Boolean(data.snotification),
    };
    console.log("loaded settings:", settings);
  });
}

function saveSettings() {
  chrome.storage.local.set(settings);
}

chrome.runtime.onInstalled.addListener(() => {
  loadSettings();
});

chrome.runtime.onStartup.addListener(() => {
  loadSettings();
});

loadSettings();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (!message) return;

    if (message.type === "getState") {
      sendResponse({
        checkclick: settings.sclick,
        checknotification: settings.snotification,
        clickT: clickTimes,
        pointsS: pointsStatus,
      });
      return;
    }

    if (message.type === "setState") {
      if (message.sclick !== undefined) settings.sclick = Boolean(message.sclick);
      if (message.snotification !== undefined) settings.snotification = Boolean(message.snotification);
      saveSettings();
      sendResponse({ ok: true });
      return;
    }

    if (message.type === "activityTab") {
      clickTimes++;
      return;
    }

    if (message.type === "predictionDetected") {
      const now = Date.now();
      if (now - lastNotifyAt >= NOTIFY_COOLDOWN_MS) {
        lastNotifyAt = now;
        chromeNotification();
      }
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

function chromeNotification() {
  try {
    const notificationOptions = {
      type: "basic",
      iconUrl: "./nlnlGqG.png",
      title: "班長開賭盤囉",
      message: "Twitch 頁面偵測到競猜可下注",
    };
    chrome.notifications.create(notificationOptions, () => {});
  } catch (error) {
    console.log(error);
  }
}
