// background service worker (MV3)
console.log("chrome extension background is running!");

let canbet = false;
let times = 0;
let clickTimes = 0;
let pointsStatus = 0;

const DEFAULT_SETTINGS = {
  sclick: true,
  snotification: false,
};

let settings = { ...DEFAULT_SETTINGS };

const alarmInfo = {
  delayInMinutes: 1,
  periodInMinutes: 1,
};

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

function ensureAlarm() {
  chrome.alarms.create("scanTwitch", alarmInfo);
}

chrome.runtime.onInstalled.addListener(() => {
  loadSettings();
  ensureAlarm();
});

chrome.runtime.onStartup.addListener(() => {
  loadSettings();
  ensureAlarm();
});

loadSettings();
ensureAlarm();

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

    if (message.content !== undefined) {
      canbet = Boolean(message.content);
    }

    if (message.activityTab !== undefined) {
      clickTimes++;
    }

    if (canbet === true && times === 0) {
      chromeNotification();
      canbet = false;
      times++;
    } else {
      times = 0;
    }
  } catch (error) {
    console.log(error);
  }
});

chrome.alarms.onAlarm.addListener(() => {
  const today = new Date();
  const nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  const currentDateTime = today.getHours() + ":" + nowm;

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      try {
        if (!tab.url) return;

        const url = new URL(tab.url);
        const domain = url.hostname;
        const href = url.href;

        if (domain === "www.twitch.tv") {
          console.log(currentDateTime + " Get Twitch Pages: " + url);

          if (settings.sclick) {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["execute.js"],
            });
          }

          if (settings.snotification && href === "https://www.twitch.tv/never_loses") {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["betting.js"],
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
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
