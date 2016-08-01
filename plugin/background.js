/**
 * 此js会在
 */
var selectData;
function tabUpdated(tabId, changeInfo, tab) {
	// console.log("tab:"+tab);
	// console.log(changeInfo);
	// changeInfo {status: "loading", url: "chrome://newtab/"} {status:
	// "complete"}
	if (changeInfo.status == 'loading') {
		chrome.pageAction.show(tabId);
	}
	chrome.runtime.onMessage.addListener(function(msg, sender, sendRequest) {
				switch (msg.type) {
					case 'select' :
						selectData = msg.data;
						break;
				}
			});
};
chrome.tabs.onUpdated.addListener(tabUpdated);
