import { gql } from "graphql-request";
import { faqs } from "../queries";
import { Config } from "sst/node/config";

export const getFaqsQuery = gql`
  ${faqs}
`;

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
    const response = await query(getFaqsQuery);
    const data = await response.json();
    return data.data.faqses;
  } catch (err) {
    console.log("Failed to fetch faqs!", err);
    return [];
  }
});
