function detectBet() {
    try {
        // var today = new Date();
        // var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        // var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        // var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;
        // console.log(currentDateTime + '  Bet Detect');
        // var activityFirst = document.getElementsByClassName("ScCoreButton-sc-1qn4ixc-0 ScCoreButtonText-sc-1qn4ixc-3 kGWcAX tw-core-button")[0];
        activityF(); // 打開第一層

        setTimeout(activityS, 300); // 0.3S 如果有第二層則打開

        setTimeout(activityT, 600); // 0.5S 如果有找到第三層發通知

        setTimeout(activityF, 900); // 關閉全部

    } catch (error) {
        console.log(error);
    }
}

function activityF() {
    var activityFirst = document.getElementsByClassName("ScCoreButton-sc-1qn4ixc-0 ScCoreButtonText-sc-1qn4ixc-3 kGWcAX tw-core-button")[0];
    activityFirst.click();
}

function activityS() {
    var activitySecond = document.getElementsByClassName("predictions-list-item__body tw-align-items-center tw-border-radius-medium tw-c-background-alt tw-flex tw-full-width")[0];
    if (activitySecond !== undefined)
        activitySecond.click();
}

function activityT() {
    var detectBet = document.getElementsByClassName("fixed-prediction-button fixed-prediction-button--blue tw-align-items-center tw-border-radius-small tw-flex tw-pd-x-1 tw-pd-y-05")[0];
    // var test = document.getElementsByClassName("tw-font-size-4 tw-line-height-heading tw-semibold tw-title tw-word-break-word")[0];
    // console.log(test);
    if (detectBet !== undefined)
        chrome.runtime.sendMessage({ content: true });
}

detectBet();