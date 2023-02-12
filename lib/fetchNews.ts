import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";
const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  //GraphQL query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;
  //fetch function nextjs13 caching
  const res = await fetch(
    "https://esparza.stepzen.net/api/righteous-eagle/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 30 }, // 30seconds revalidate
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );
  //sort function by images vs not images present
  //return res
  console.log("Loading New Data From API for Category >>>", category, keywords);

  const newsResponse = await res.json();

  //sort function by images present then without images
  const news = sortNewsByImage(newsResponse.data.myQuery);

  //return res
  return news;
};

export default fetchNews;
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=1c389887feac33ad31f24e10d1294fb3&sources=business,sports"
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=1c389887feac33ad31f24e10d1294fb3&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
