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

});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    switch (msg.type) {
        case 'select' :
            selectData = msg.data;
            break;
        case 'search_and_add_dom' :
            // sendResponse({translation: "111"})
            var key = msg.data;
            $.ajax({
                url: "http://fanyi.youdao.com/openapi.do?keyfrom=mypydict&doctype=json&q=" + key + "&version=1.2&key=27855339&type=data",
                type: "get",
                async: false,//异步请求无法 sendResponse
                dataType: "json",
                success: function (data) {
                    var translation = (data.translation || []).join(" ");
                    console.log("search_and_add_dom success");
                    sendResponse({translation: translation})
                },
                error: function () {

                }
            });
            break;
    }
});
