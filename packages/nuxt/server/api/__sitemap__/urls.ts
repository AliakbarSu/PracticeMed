import { gql } from "graphql-request";
import { blog } from "../../queries";
import { Config } from "sst/node/config";

export const listBlogsQuery = gql`
  query GetBlogs {
    blogs {
      ${blog}
    }
  }
`;
export default defineEventHandler(async () => {
  // fetch data directly in the correct type
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
    const response = await query(listBlogsQuery);
    const { data } = await response.json();
    return [
      ...data.blogs.map((p: { slug: string; createdAt: string }) =>
        asSitemapUrl({
          loc: `/resources/blogs/${p.slug}`,
          lastmod: p.createdAt,
        }),
      ),
    ];
  } catch (err) {
    console.log("Failed to fetch blogs urls!", err);
    return [];
  }
});
