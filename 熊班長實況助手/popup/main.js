document.addEventListener('DOMContentLoaded', function(dcle) {

    //#region icon, url
    var buttonName = ["FBbutton", "Youtubebutton", "Instagrambutton", "Twitchbutton", "GitHubrbutton", "ChromeStorebutton", "Discordbutton"];
    var buttonUrl = ["https://www.facebook.com/NeVeRLosEs",
        "https://www.youtube.com/channel/UCRdJzOsu4MwKmY04vfAIDHw",
        "https://www.instagram.com/nln1nl/?hl=zh-tw",
        "https://www.twitch.tv/never_loses",
        "https://github.com/JinWei0811/TwitchNLHelper",
        "https://chrome.google.com/webstore/detail/nlnlouo/dhokajppblijnlidbgdphkpjbocpnhec?hl=zh-TW&authuser=0",
        "https://discord.com/invite/Ycf9Gsxy2A",
    ];
    for (var i = 0; i < buttonName.length; i++) {
        var button = document.getElementById(buttonName[i]);
        button.setAttribute("data-content", buttonUrl[i]);
        button.addEventListener('click', function(ce) {
            chrome.tabs.create({ "url": this.getAttribute("data-content") });
        });
    }
    //#endregion

    //#region check radio
    var dButtonEvent = document.getElementById("submitButton");
    dButtonEvent.addEventListener('click', function(e) {
        var channelP = document.getElementsByName("Channel_Points");
        var Notification = document.getElementsByName("Quiz");

        channelP[0].checked ? autoClick = true : autoClick = false;
        Notification[0].checked ? notification = true : notification = false;
        chrome.runtime.sendMessage({ sclick: autoClick, snotification: notification });
        var showSuccess = document.getElementById("submitSuccess");
        showSuccess.style.display = "";
        setTimeout(disappear_show, 1000);
    });
    //#endregion


    //#region 
    // var T_Obj = document.getElementsByTagName("INPUT");
    // T_Obj[0].checked ? document.getElementById(autoClick).checked = true : document.getElementById(dontautoClick).checked = true;
    // Total_Obj[2].checked ? document.getElementById(cannotifi).checked = true : document.getElementById(cantnotifi).checked = true;
    //#endregion
});

function disappear_show() {
    var showSuccess = document.getElementById("submitSuccess");
    showSuccess.style.display = "none";
}

function get_detail() {
    chrome.runtime.sendMessage({ plsSendBack: true });
}

chrome.runtime.onMessage.addListener(function(message) {
    try {
        var testp = document.getElementsByTagName('input');
        // testp[0].checked = false;
        if (message.checkclick !== undefined) {
            message.checkclick === true ? testp[0].checked = true : testp[0].checked = false;
        }
        if (message.checknotification !== undefined) {
            message.checknotification === true ? testp[1].checked = true : testp[1].checked = false;
        }
    } catch (error) {
        console.log(error);
    }
});

get_detail();

let autoClick = true;
let notification = true;
console.log(autoClick, '  ', notification);
const app = document.getElementById("app")