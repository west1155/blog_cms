import {gql, request} from 'graphql-request';
import {
    Category,
    GetCategoriesResponse,
    SubmitCommentResponse,
    GetCommentsResponse,
} from "@/types";
import {Post} from "@/types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async (): Promise<getPostsResponse> => {
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

export const submitComment = async (comment: {
    name: string;
    email: string;
    comment: string;
    slug: string;
}): Promise<SubmitCommentResponse> => {
    const query = gql`
        mutation CreateComment(
            $name: String!
            $email: String!
            $comment: String!
            $slug: String!
        ) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect: { slug: $slug } }
                }
            ) { id }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    return await request(graphqlAPI, query, comment);
};

export const getComments = async (slug: string): Promise<Comment[]> => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    const result = await request<GetCommentsResponse>(graphqlAPI, query, { slug });
    return result.comments;
};

export const getFeaturedPosts = async (): Promise<Post[]> => {
    const query = gql`
        query GetFeaturedPosts() {
            posts(where: {featuredPost: true}) {
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                title
                slug
                createdAt
            }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    const result = await request<{ posts: Post[] }>(graphqlAPI, query);
    return result.posts;
};

export const getCategoryPost = async (slug: string): Promise<Post[]> => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: {categories_some: {slug: $slug}}) {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    if (!graphqlAPI) {
        throw new Error('GraphQL API endpoint is not defined');
    }

    const result = await request<GetPostsResponse>(graphqlAPI, query, { slug });
    return result.postsConnection.edges.map(edge => edge.node);
};

export const getAdjacentPosts = async (createdAt: string, slug: string): Promise<{
    previous: Post | null;
    next: Post | null;
}> => {
    const query = gql`
        query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
            previous: posts(
                first: 1
                orderBy: createdAt_DESC
                where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
            next: posts(
                first: 1
                orderBy: createdAt_ASC
                where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
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

    const result = await request<{
        previous: Post[];
        next: Post[];
    }>(graphqlAPI, query, { slug, createdAt });

    return {
        previous: result.previous[0] || null,
        next: result.next[0] || null,
    };
};