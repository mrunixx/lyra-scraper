import { proxy } from "valtio";

export interface ExtensionProxyState {
  authToken: string | null;
}

export const state = proxy<ExtensionProxyState>({
  authToken: null,
});
