import Tab = chrome.tabs.Tab;

export function getCurrentTab(): Promise<Tab> {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            const activeTab = tabs[0];
            resolve(activeTab)
        })
    });
}
