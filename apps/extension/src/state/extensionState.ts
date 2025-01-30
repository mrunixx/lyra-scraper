import { proxy } from "valtio";

export interface ExtensionProxyState {
  authToken: string | null;
}

export const state = proxy<ExtensionProxyState>({
  authToken: null,
});

export const loadAuthToken = async () => {
  chrome.storage.local.get("authToken", (result) => {
    if (result.authToken) {
      state.authToken = result.authToken;
    }
  });
};