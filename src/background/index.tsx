/**
 * 此js会在后台运行
 * 不允许用 eval
 */
import jQuery from 'jquery'
import {getValidSearchKey} from "../util";

window.selectData = '';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log("tab:"+tab);
    // console.log(changeInfo);
    // changeInfo {status: "loading", url: "chrome://newtab/"} {status:
    // "complete"}
    if (changeInfo.status == 'loading') {
        chrome.pageAction.show(tabId);
    }
});

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    console.log('onMessage', msg);
    switch (msg.type) {
        case 'select' :
            console.log('search_and_add_dom', msg)
            window.selectData = msg.data;
            break;
        case 'search_and_add_dom' :
            console.log('search_and_add_dom', msg)
            const key = msg.data;
            jQuery.ajax({
                url: "http://fanyi.youdao.com/openapi.do?keyfrom=mypydict&doctype=json&version=1.2&key=27855339&type=data&q=" + encodeURIComponent(getValidSearchKey(key)),
                type: "get",
                async: false, //异步请求无法 sendResponse
                dataType: "json",
                success(data) {
                    const translation = (data.translation || []).join(" ");
                    console.log("search_and_add_dom success", data);
                    sendResponse({
                        data: data,
                        translation: translation
                    });
                },
                error() {
                }
            });
            break;
    }
});
