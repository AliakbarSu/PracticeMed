import { get_videos } from "../queries";
import { Config } from "sst/node/config";

export default defineEventHandler(async () => {
  const hygraph_token = (Config as any).HYGRAPH_TOKEN;
  try {
    const {
      public: { hygraph_endpoint },
    } = useRuntimeConfig();
    const query = (query: string) => {
      return fetch(hygraph_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hygraph_token}`,
        },
        body: JSON.stringify({
          query,
        }),
      });
    };
    const response = await query(get_videos);
    const data = await response.json();
    return data.data.videos;
  } catch (err) {
    console.log("Failed to fetch videos!", err);
    return [];
  }
});
