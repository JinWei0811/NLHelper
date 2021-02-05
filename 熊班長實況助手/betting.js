function detectBet() {
    try {
        var today = new Date();
        var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;
        var activityTabbet = document.getElementsByClassName("tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--text tw-inline-flex tw-justify-content-center tw-overflow-hidden tw-relative")[0];
        activityTabbet.click();
        var bettest = document.getElementsByClassName("predictions-list-item__body tw-align-items-center tw-border-radius-medium tw-c-background-alt tw-flex tw-full-width")[0];
        bettest.click();
        var bettest0 = document.getElementsByClassName("fixed-prediction-button fixed-prediction-button--blue tw-align-items-center tw-border-radius-small tw-flex tw-pd-x-1 tw-pd-y-05")[0];
        console.log(currentDateTime, '  bettest0  ', bettest0);
        if (bettest0 !== undefined) {
            chrome.runtime.sendMessage({ content: true });
        }
        var close = document.getElementsByClassName("tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-button-icon--secondary tw-core-button tw-inline-flex tw-justify-content-center tw-overflow-hidden tw-relative");
        close.click();
        // console.log(currentDateTime + ' detectbet');
    } catch (error) {}

}
detectBet();