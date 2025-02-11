import {gql, request} from 'graphql-request';
import {GetPostsResponse} from "@/services/types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<GetPostsResponse> => {
    const query = gql`
    query MyQuery {
  postsConnection {
    edges {
      node {
        author {
          bio
          id
          name
          photo {
            url
          }
          post {
            id
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
        }
      }
    }
  }
}`;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    return await request(graphqlAPI, query)
};
