import { client } from "./trpc/trpcClient";

// type LinkedInUser = {
//   entityUrn: string,
//   firstName: string,
//   lastName: string,
//   headline: string,
//   publicIdentifier: string,
// }

// type LinkedInUserResponse = {
//   user: LinkedInUser,
//   included: []
// }

const connectionMutation = client.linkedIn.addConnection.useMutation();

let sent = false;
async function resendRequest(
  url: string,
  method: string,
  headers: Record<string, string>,
  body: string | null,
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ?? undefined,
    });

    const responseData = await response.json();
    console.log("Resent Request Response:", responseData);
    // const mappedData: LinkedInUser[] = responseData.filter((item: any) => {
    //   const user = item;
    //   return user.entityUrn.includes("urn:li:fsd_profile")
    // }).map((i: any) => ({
    //   entityUrn: i.entityUrn,
    //   firstName: i.firstName,
    //   lastName: i.lastName,
    //   headline: i.headline,
    //   publicIdentifier: i.publicIdentifier,
    // }))

    sent = false;
    return responseData;
  } catch (error) {
    console.error("Error resending request:", error);
    return null;
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  (details: chrome.webRequest.WebRequestBodyDetails) => {
    if (details.url.includes("/voyager/api/relationships/dash/connections")) {
      const requestBody = details.requestBody?.raw?.[0]?.bytes
        ? new TextDecoder().decode(
            new Uint8Array(details.requestBody.raw[0].bytes),
          )
        : null;

      try {
        let headers: Record<string, string>;
        getCookies().then((cookie) => {
          getCSRFToken().then((token) => {
            headers = {
              "Content-Type": "application/json",
              Cookie: cookie,
              Accept: "application/vnd.linkedin.normalized+json+2.1",
              "Csrf-Token": token,
              "X-Restli-Protocol-Version": "2.0.0",
            };
            if (!sent) {
              resendRequest(
                details.url,
                details.method,
                headers,
                requestBody,
              )
              sent = true;
            }
          });
        });
      } catch (error) {
        console.error("Error in onBeforeRequest listener:", error);
      }
    }
  },
  { urls: ["https://www.linkedin.com/*"] },
  ["requestBody"],
);

const getCookies = (): Promise<string> => {
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

const getCSRFToken = (): Promise<string> => {
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

// vanityName
// provides the logged in user profile

// voyager/api/relationships/connectionsSummary
// provides the num connection of logged in user
