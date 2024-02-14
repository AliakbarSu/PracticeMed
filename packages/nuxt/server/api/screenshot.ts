// import { Config } from "sst/node/config";

export default defineEventHandler(async (event) => {
  console.log(event);
  // const API_FLASH_SECRET = (Config as any).API_FLASH_KEY;
  try {
    // const url = `https://practicemed.org/questions/`;
    // return fetch(`https://api.apiflash.com/v1/urltoimage?access_key=${API_FLASH_SECRET}&url=${url}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return "ok ";
  } catch (err) {
    console.log("Failed to fetch blog");
    return {};
  }
});
