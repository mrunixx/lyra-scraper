import { getCookies, getCSRFToken } from "../background";
import client from "../trpc/trpcClient";

type LinkedInUserResponse = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data: any;
  included: Array<LinkedInUser>;
};

type LinkedInUser = {
  entityUrn: string;
  firstName: string;
  lastName: string;
  headline: string;
  publicIdentifier: string;
};
export const syncUserConnections = async () => {
  const baseUrl =
    "https://www.linkedin.com/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=40&q=search&sortType=RECENTLY_ADDED";
  
  let start = 0;

  try {
    const cookie = await getCookies();
    const csrfToken = await getCSRFToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Cookie: cookie,
      Accept: "application/vnd.linkedin.normalized+json+2.1",
      "Csrf-Token": csrfToken,
      "X-Restli-Protocol-Version": "2.0.0",
    };

    while (true) {
      const url = `${baseUrl}&start=${start}`;
      console.log(`Fetching connections starting at: ${start}`);

      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();

      if (!data.included || data.included.length === 0) {
        console.log("No more connections to fetch.");
        break;
      }

      console.log("User connections data:", data);

      const connectionList = parseConnectionsList(data);

      for (const user of connectionList) {
        try {
          await client.linkedIn.addConnection.mutate({
            entityUrn: user.entityUrn,
            firstName: user.firstName,
            lastName: user.lastName,
            headline: user.headline,
            publicIdentifier: user.publicIdentifier,
          });
        } catch (e) {
          console.warn(
            `Failed to add connection for user ${user.firstName + user.lastName}:`, e
          );
        }
      }

      start += 40;

      console.log("Waiting for 10 seconds before fetching the next batch...");
      await delay(10000);
    }
  } catch (error) {
    console.error("Error in syncUserConnections:", error);
  }
};


const parseConnectionsList = (data: LinkedInUserResponse) => {
  return data.included
      .filter((val) => {
        return val.entityUrn.includes("urn:li:fsd_profile");
      })
      .map((connection) => ({
        entityUrn: connection.entityUrn,
        firstName: connection.firstName,
        lastName: connection.lastName,
        headline: connection.headline,
        publicIdentifier: connection.publicIdentifier,
      }));
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));