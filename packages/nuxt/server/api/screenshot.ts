import { Config } from "sst/node/config";

export default defineEventHandler(async (event) => {
  const query = getQuery<{ id?: string }>(event);
  const API_FLASH_SECRET = (Config as any).API_FLASH_KEY;
  try {
    const url = `https://pr.practicemed.org/questions/${query.id}`;
    const config = `format=jpeg&full_page=true&width=1188&height=558&crop=0,58,1188,500&response_type=json`;
    return fetch(
      `https://api.apiflash.com/v1/urltoimage?access_key=${API_FLASH_SECRET}&url=${url}&${config}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (err) {
    console.log("Failed to fetch blog");
    return {};
  }
});
