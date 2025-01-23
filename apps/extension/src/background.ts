import { state } from "./state/extensionState";

chrome.runtime.onMessageExternal.addListener((request) => {
  console.log("message received");
  if (request.authToken) {
    state.authToken = request.authToken;
  } else {
    state.authToken = null;
  }
});

export const getCookies = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ domain: "linkedin.com" }, (cookies) => {
      if (cookies && cookies.length > 0) {
        resolve(
          cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; "),
        );
      } else {
        reject("No cookies found for domain linkedin.com");
      }
    });
  });
};

export const getCSRFToken = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get(
      { name: "JSESSIONID", url: "https://www.linkedin.com" },
      (cookie) => {
        if (cookie) {
          const token = cookie.value.replace(/^"|"$/g, "");
          resolve(token);
        } else {
          reject("Cookie not found");
        }
      },
    );
  });
};

