function goToActivityTab() {
    try {
        var today = new Date();
        var nowm = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        var nowt = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        var currentDateTime = today.getHours() + ':' + nowm + ":" + nowt;

        // Prefer stable selectors, class names are likely to change
        var activityTab =
            document.querySelector('[data-test-selector="community-points-summary"] button') ||
            document.querySelector('[aria-label*="Claim"]') ||
            document.querySelector('[aria-label*="領取"]') ||
            document.querySelector('.claimable-bonus__icon');

        if (activityTab != undefined) {
            activityTab.click();
            chrome.runtime.sendMessage({ activityTab: true });
            console.log(currentDateTime + '  Click Success');
        }
    } catch (error) {
        // silent by design
    }
}

goToActivityTab();
