document.addEventListener('DOMContentLoaded', function(dcle) {

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
        "",
        "",
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

    //#region Tabs
    var FButtonEvent = document.getElementById('FeaturesList'); // 功能列表
    var PButtonEvent = document.getElementById("PointsList"); // 忠誠點數
    var LButtonEvent = document.getElementById("AllLink"); // 相關連結
    var AButtonEvent = document.getElementById("AboutAuthor"); // 關於作者

    FButtonEvent.addEventListener('click', function(e) {
        change_tab(0);
        // document.getElementById('Points').style.display = 'none';
        // document.getElementById('AllLinkPage').style.display = 'none';
        // document.getElementById('AboutAuthorPage').style.display = 'none';
        // document.getElementById('Features').style.display = '';

        // PButtonEvent.style.backgroundColor = "rgb(8, 130, 151)";
        // LButtonEvent.style.backgroundColor = "rgb(8, 130, 151)";
        // AButtonEvent.style.backgroundColor = "rgb(8, 130, 151)";
        // FButtonEvent.style.backgroundColor = "rgb(4, 59, 68)";
    });
    PButtonEvent.addEventListener('click', function(e) {
        change_tab(1);
    });
    LButtonEvent.addEventListener('click', function(e) {
        change_tab(2);
    });
    AButtonEvent.addEventListener('click', function(e) {
        change_tab(3);
    });
    //#endregion


    //#region 
    // var T_Obj = document.getElementsByTagName("INPUT");
    // T_Obj[0].checked ? document.getElementById(autoClick).checked = true : document.getElementById(dontautoClick).checked = true;
    // Total_Obj[2].checked ? document.getElementById(cannotifi).checked = true : document.getElementById(cantnotifi).checked = true;
    //#endregion
});

function change_tab(value) {
    Tabcontent = document.getElementsByClassName("tabContent");
    Buttoncontent = document.getElementsByClassName("tablinks");
    for (i = 0; i < Tabcontent.length; i++) {
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
        if (message.clickT !== undefined) {
            document.getElementById('ClickTimes').innerHTML = message.clickT;
        }
        if (message.pointsS !== undefined) {
            document.getElementById('PointsStatus').innerHTML = message.pointsS;
        }

        console.log(message.checkclick, message.checknotification, message.clickT, message.pointsS);
    } catch (error) {
        console.log(error);
    }
});

let autoClick;
let notification;
get_detail();
const app = document.getElementById("app")

// var clickTimes = document.getElementById('ClickTimes').innerHTML = 'NaN';
// var pointsStatus = document.getElementById('PointsStatus').innerHTML = 'NaN';

fetch('../manifest.json').then(response => {
    return response.json();
}).then(data => document.getElementById("version").innerHTML = `${data.version}`);