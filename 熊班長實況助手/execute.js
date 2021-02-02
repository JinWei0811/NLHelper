function goToActivityTab() {
    try {
        var startNotification = true;
        var startClick = true;
        var today = new Date();
        var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;
        var activityTab = document.getElementsByClassName("tw-button tw-button--success")[0];
        // console.log(currentDateTime + '  Click');
        // console.log(activityTab);
        if (startClick && activityTab != undefined) {
            activityTab.click();
            console.log(currentDateTime + '  Click Success');
        }
    } catch (error) {

    }

}

goToActivityTab();