function detectBet() {
    try {
        // Open community points panel first, then inspect prediction area
        activityF();
        setTimeout(activityS, 300);
        setTimeout(activityT, 600);
        setTimeout(activityF, 900); // close panel
    } catch (error) {
        console.log(error);
    }
}

function activityF() {
    var activityFirst =
        document.querySelector('[data-test-selector="community-points-summary"] button') ||
        document.querySelector('.tw-core-button');
    if (activityFirst) activityFirst.click();
}

function activityS() {
    var activitySecond =
        document.querySelector('[data-test-selector="prediction-card"]') ||
        document.querySelector('.predictions-list-item__body');
    if (activitySecond !== undefined)
        activitySecond.click();
}

function activityT() {
    var detectBet =
        document.querySelector('[data-test-selector="prediction-blue-button"]') ||
        document.querySelector('[data-test-selector="prediction-pink-button"]') ||
        document.querySelector('.fixed-prediction-button--blue') ||
        document.querySelector('.fixed-prediction-button--pink');

    if (detectBet !== undefined)
        chrome.runtime.sendMessage({ content: true });
}

detectBet();
