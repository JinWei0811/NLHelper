document.addEventListener('DOMContentLoaded', function(dcle) {

    //#region icon, url
    var buttonName = ["FBbutton", "Youtubebutton", "Instagrambutton", "Twitchbutton", "Sponsorbutton"];
    var buttonUrl = ["https://www.facebook.com/NeVeRLosEs",
        "https://www.youtube.com/channel/UCRdJzOsu4MwKmY04vfAIDHw",
        "https://www.instagram.com/nln1nl/?hl=zh-tw",
        "https://www.twitch.tv/never_loses",

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
        var Total_Obj = document.getElementsByTagName("INPUT");
        if (Total_Obj[0].checked)
            autoClick = true;
        else
            autoClick = false;

        if (Total_Obj[2].checked)
            notification = true;
        else
            notification = false;
        chrome.runtime.sendMessage({ sclick: autoClick, snotification: notification }, function(response) {});
    });
    //#endregion
});

let autoClick;
let notification;
const app = document.getElementById("app")