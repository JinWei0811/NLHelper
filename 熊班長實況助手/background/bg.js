//this is background js 
// console.log("chrome extension background is runing!")
var canbet;
var times = 0;
var sclick = true;
var snotification = true;
var alarmInfo = {
    delayInMinutes: 1,
    periodInMinutes: 1
}

chrome.runtime.onMessage.addListener(function(message, sendResponse) {
    try {
        sclick = message.sclick;
        snotification = message.snotification;
        canbet = message.content;
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

chrome.alarms.clearAll();
chrome.alarms.onAlarm.addListener(function(alarm) {
    var today = new Date();
    var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    var currentDateTime = today.getHours() + ':' + nowm;
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            var url = new URL(tab.url);
            var domain = url.hostname;
            if (domain === "www.twitch.tv") {
                console.log("Get Twitch Pages:" + url);
                console.log(currentDateTime, ' detectbet and click');
                if (sclick) {
                    chrome.tabs.executeScript(tab.id, { file: "/execute.js" });
                }
                if (snotification) {
                    chrome.tabs.executeScript(tab.id, { file: "/betting.js" });
                }
            }
        });
    });

});
chrome.alarms.create('testAlarm', alarmInfo);

function chromeNotification() {
    try {
        var notificationOptions = {
            type: "basic",
            iconUrl: "./nlnlGqG.png",
            title: "班長開賭盤囉",
            message: "",
            isClickable: true
        };
        chrome.notifications.create(notificationOptions, function(id) {});
    } catch (error) {
        console.log(error);
    }
}