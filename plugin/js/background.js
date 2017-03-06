/**
 * 此js会在后台运行
 * 不允许用 eval
 */
var selectData;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log("tab:"+tab);
    // console.log(changeInfo);
    // changeInfo {status: "loading", url: "chrome://newtab/"} {status:
    // "complete"}
    if (changeInfo.status == 'loading') {
        chrome.pageAction.show(tabId);
    }
    chrome.runtime.onMessage.addListener(function (msg, sender, sendRequest) {
        switch (msg.type) {
            case 'select' :
                selectData = msg.data;
                break;
        }
    });
});
