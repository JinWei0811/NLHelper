document.addEventListener('DOMContentLoaded', function() {
    //#region icon, url
    var buttonName = ["FBbutton", "Youtubebutton", "Instagrambutton", "Twitchbutton", "GitHubrbutton", "ChromeStorebutton", "Discordbutton", "LineCommunitybutton", "LineSticker1button", "LineSticker2button"];
    var buttonUrl = [
        "https://www.facebook.com/NeVeRLosEs",
        "https://www.youtube.com/channel/UCRdJzOsu4MwKmY04vfAIDHw",
        "https://www.instagram.com/nln1nl/?hl=zh-tw",
        "https://www.twitch.tv/never_loses",
        "https://github.com/JinWei0811/TwitchNLHelper",
        "https://chrome.google.com/webstore/detail/nlnlouo/dhokajppblijnlidbgdphkpjbocpnhec?hl=zh-TW&authuser=0",
        "https://discord.com/invite/Ycf9Gsxy2A",
        "https://reurl.cc/Ldp8L4",
        "https://store.line.me/stickershop/product/13117151/zh-Hant",
        "https://store.line.me/stickershop/product/14696383/zh-Hant"
    ];

    for (var i = 0; i < buttonName.length; i++) {
        var button = document.getElementById(buttonName[i]);
        if (!button) continue;
        button.setAttribute("data-content", buttonUrl[i]);
        button.addEventListener('click', function() {
            chrome.tabs.create({ url: this.getAttribute("data-content") });
        });
    }
    //#endregion

    var submitButton = document.getElementById("submitButton");
    submitButton.addEventListener('click', function() {
        var channelP = document.getElementsByName("Channel_Points");
        var notification = document.getElementsByName("Quiz");

        var autoClick = Boolean(channelP[0] && channelP[0].checked);
        var notify = Boolean(notification[0] && notification[0].checked);

        chrome.runtime.sendMessage({ type: "setState", sclick: autoClick, snotification: notify }, function() {
            var showSuccess = document.getElementById("submitSuccess");
            showSuccess.style.display = "";
            setTimeout(function() { showSuccess.style.display = "none"; }, 1000);
        });
    });

    // tab
    var tabButtons = document.querySelectorAll('.tablinks');
    tabButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            showTab(this.getAttribute('data-target'), this);
        });
    });

    loadState();

    fetch('../manifest.json')
        .then(response => response.json())
        .then(data => document.getElementById("version").innerHTML = `${data.version}`)
        .catch(() => {});
});

function showTab(targetId, activeBtn) {
    document.querySelectorAll('.tabContent').forEach(function(panel) {
        panel.style.display = (panel.id === targetId) ? '' : 'none';
    });

    document.querySelectorAll('.tablinks').forEach(function(btn) {
        btn.style.backgroundColor = (btn === activeBtn) ? 'rgb(4, 59, 68)' : 'rgb(8, 130, 151)';
    });
}

function loadState() {
    chrome.runtime.sendMessage({ type: "getState" }, function(message) {
        if (!message) return;

        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        if (checkboxes[0]) checkboxes[0].checked = Boolean(message.checkclick);
        if (checkboxes[1]) checkboxes[1].checked = Boolean(message.checknotification);
    });
}
