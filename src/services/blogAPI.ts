import {gql, request} from 'graphql-request';
import {
    Category,
    GetCategoriesResponse, GetPostDetailsResponse,
    GetPostsResponse, PostDetails,
} from "@/types";

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


export const getPostDetails = async (): Promise<PostDetails> => {
    const query = gql`
        query MyQuery($slug: String!) {
            post(where: {slug: {eq: $slug}}) {
                id
                title
                content {
                    raw {
                        children {
                            ... on GraphCMS_RichText {
                                html
                            }
                            __typename
                        }
                    }
                }
                excerpt
                createdAt
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                category {
                    name
                    slug
                }
            }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    const result = await request<PostDetails>(graphqlAPI, query, {slug});
    return result;
}

export const getCategories = async (): Promise<Category[]> => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
                id
            }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    const result = await request<GetCategoriesResponse>(graphqlAPI, query);
    return result.categories;
};