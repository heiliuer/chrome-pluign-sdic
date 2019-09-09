import Tab = chrome.tabs.Tab;

export function getCurrentTab(): Promise<Tab> {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const activeTab = tabs[0];
            resolve(activeTab);
        });
    });
}

function checkChromeExtensionEnv() {
    return 'chrome' in window && 'extension' in window.chrome;
}

export const isChromeExtensionEnv = checkChromeExtensionEnv();
