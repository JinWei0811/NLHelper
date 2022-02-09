function goToActivityTab() {
    try {
        var today = new Date();
        var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;
        var activityTab = document.getElementsByClassName("ScCoreButton-sc-1qn4ixc-0 ScCoreButtonSuccess-sc-1qn4ixc-5 boGviw iNPKuE")[0];
        // console.log(currentDateTime + '  Point Detect');
        if (activityTab != undefined) {
            activityTab.click();
            chrome.runtime.sendMessage({ activityTab: true });
            console.log(currentDateTime + '  Click Success');
        }
    } catch (error) {

    }

}

goToActivityTab();