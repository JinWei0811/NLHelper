//this is background js 
console.log("chrome extension background is runing!")
var canbet;
var times = 0;
var sclick;
var snotification;
var clickTimes = 0;
var pointsStatus = 0;
var alarmInfo = {
    delayInMinutes: 1,
    periodInMinutes: 1
}

if (sclick === undefined)
    sclick = true;
if (snotification === undefined)
    snotification = false;
chrome.runtime.onMessage.addListener(function(message) {
    try {
        if (message.sclick !== undefined) {
            sclick = message.sclick;
        }
        if (message.snotification !== undefined) {
            snotification = message.snotification;
        }
        if (message.content !== undefined) {
            canbet = message.content;
        }
        if (message.plsSendBack !== undefined) {
            console.log(sclick, snotification, clickTimes, pointsStatus);
            chrome.runtime.sendMessage({ checkclick: sclick, checknotification: snotification, clickT: clickTimes, pointsS: pointsStatus });
        }
        if (message.activityTab !== undefined) {
            clickTimes++;
        }
        console.log(sclick, snotification, clickTimes, pointsStatus);
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
            var href = url.href;
            if (domain === "www.twitch.tv") {
                console.log(currentDateTime + " Get Twitch Pages: " + url);
                console.log(sclick, ' and ', snotification, ' and ', canbet, ' and ', times);
                if (sclick) {
                    console.log(currentDateTime, ' click');
                    chrome.tabs.executeScript(tab.id, { file: "/execute.js" });
                }
                if (snotification && href === "https://www.twitch.tv/never_loses") {
                    console.log(currentDateTime, ' detectbet');
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