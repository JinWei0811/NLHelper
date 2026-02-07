document.addEventListener('DOMContentLoaded', function() {

    //#region icon, url
    var buttonName = ["FBbutton", "Youtubebutton", "Instagrambutton", "Twitchbutton", "GitHubrbutton", "ChromeStorebutton", "Discordbutton", "LineCommunitybutton", "LineSticker1button", "LineSticker2button", "JkoPayButton", "LinePayButton"];
    var buttonUrl = ["https://www.facebook.com/NeVeRLosEs",
        "https://www.youtube.com/channel/UCRdJzOsu4MwKmY04vfAIDHw",
        "https://www.instagram.com/nln1nl/?hl=zh-tw",
        "https://www.twitch.tv/never_loses",
        "https://github.com/JinWei0811/TwitchNLHelper",
        "https://chrome.google.com/webstore/detail/nlnlouo/dhokajppblijnlidbgdphkpjbocpnhec?hl=zh-TW&authuser=0",
        "https://discord.com/invite/Ycf9Gsxy2A",
        "https://reurl.cc/Ldp8L4",
        "https://store.line.me/stickershop/product/13117151/zh-Hant",
        "https://store.line.me/stickershop/product/14696383/zh-Hant",
        "https://raw.githubusercontent.com/JinWei0811/NLHelper/main/JKOPay.png",
        "https://raw.githubusercontent.com/JinWei0811/NLHelper/main/Linepay.png",
    ];
    for (var i = 0; i < buttonName.length; i++) {
        var button = document.getElementById(buttonName[i]);
        if (!button) continue;
        button.setAttribute("data-content", buttonUrl[i]);
        button.addEventListener('click', function() {
            chrome.tabs.create({ "url": this.getAttribute("data-content") });
        });
    }
    //#endregion

    //#region check box + save
    var dButtonEvent = document.getElementById("submitButton");
    dButtonEvent.addEventListener('click', function() {
        var channelP = document.getElementsByName("Channel_Points");
        var Notification = document.getElementsByName("Quiz");

        var autoClick = Boolean(channelP[0] && channelP[0].checked);
        var notification = Boolean(Notification[0] && Notification[0].checked);

        chrome.runtime.sendMessage({ type: "setState", sclick: autoClick, snotification: notification }, function() {
            var showSuccess = document.getElementById("submitSuccess");
            showSuccess.style.display = "";
            setTimeout(disappear_show, 1000);
        });
    });
    //#endregion

    //#region Tabs
    var FButtonEvent = document.getElementById('FeaturesList');
    var PButtonEvent = document.getElementById("PointsList");
    var LButtonEvent = document.getElementById("AllLink");
    var AButtonEvent = document.getElementById("AboutAuthor");

    FButtonEvent.addEventListener('click', function() { change_tab(0); });
    PButtonEvent.addEventListener('click', function() { change_tab(1); });
    LButtonEvent.addEventListener('click', function() { change_tab(2); });
    AButtonEvent.addEventListener('click', function() { change_tab(3); });
    //#endregion

    loadState();

    fetch('../manifest.json')
        .then(response => response.json())
        .then(data => document.getElementById("version").innerHTML = `${data.version}`)
        .catch(() => {});
});

function change_tab(value) {
    var Tabcontent = document.getElementsByClassName("tabContent");
    var Buttoncontent = document.getElementsByClassName("tablinks");
    for (var i = 0; i < Tabcontent.length; i++) {
        if (i != value) {
            Tabcontent[i].style.display = "none";
            Buttoncontent[i].style.backgroundColor = "rgb(8, 130, 151)";
        } else {
            Tabcontent[i].style.display = '';
            Buttoncontent[i].style.backgroundColor = "rgb(4, 59, 68)";
        }
    }
}

function disappear_show() {
    var showSuccess = document.getElementById("submitSuccess");
    showSuccess.style.display = "none";
}

function loadState() {
    chrome.runtime.sendMessage({ type: "getState" }, function(message) {
        if (!message) return;
        var testp = document.getElementsByTagName('input');
        if (message.checkclick !== undefined && testp[0]) {
            testp[0].checked = Boolean(message.checkclick);
        }
        if (message.checknotification !== undefined && testp[1]) {
            testp[1].checked = Boolean(message.checknotification);
        }
    });
}
