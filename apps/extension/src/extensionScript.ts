const extensionId = chrome.runtime.id;

const event = new CustomEvent("extensionId", { detail: { extensionId } });
window.dispatchEvent(event);
console.log("Content script injected!");
console.log("Here is the id: ", chrome.runtime.id)
