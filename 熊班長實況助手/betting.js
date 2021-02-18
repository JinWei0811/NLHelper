function detectBet() {
    try {
        var today = new Date();
        var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;
        // console.log(currentDateTime + '  Bet Detect');

        // 開啟第一層
        var activityTabbet = document.getElementsByClassName("ScCoreButton-sc-1qn4ixc-0 ScCoreButtonText-sc-1qn4ixc-3 kGWcAX tw-core-button")[0];
        // 開啟第二層
        var bettest = document.getElementsByClassName("predictions-list-item__body tw-align-items-center tw-border-radius-medium tw-c-background-alt tw-flex tw-full-width")[0];
        // 檢查可否下注
        var bettest0 = document.getElementsByClassName("fixed-prediction-button fixed-prediction-button--blue tw-align-items-center tw-border-radius-small tw-flex tw-pd-x-1 tw-pd-y-05")[0];

        activityTabbet.click(); // First On
        if (bettest !== undefined) {
            bettest.click(); // Second On
            if (bettest0 !== undefined) {
                chrome.runtime.sendMessage({ content: true });
                activityTabbet.click();
            } else {
                activityTabbet.click();
            }
        } else {
            activityTabbet.click(); // 無偵測到第二層則關閉
        }

    } catch (error) {
        console.log(error);
    }
}

detectBet();