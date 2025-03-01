import {gql, request} from 'graphql-request';
import {
  GetPostDetailResponse,
  GetPostsResponse,
  GetRecentPostsResponse,
  PostDetail,
  RecentPost
} from "@/services/types";

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

export const getPostDetails = async (slug: string): Promise<PostDetail> => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  if (!graphqlAPI) {
    throw new Error('GraphQL API endpoint is not defined');
  }

  const result: GetPostDetailResponse = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getRecentPosts = async (): Promise<RecentPost[]> => {
  const query = gql`
    query GetPostDetails {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  if (!graphqlAPI) {
    throw new Error('GraphQL API endpoint is not defined');
  }

  const result: GetRecentPostsResponse = await request(graphqlAPI, query);
  return result.posts;
};