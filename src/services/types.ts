export type Author = {
    bio: string;
    name: string;
    id: string;
    photo: {
        url: string;
    };
};

export type Category = {
    name: string;
    slug: string;
};

export type PostNode = {
    author: Author;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    categories: Category[];
};

export type PostEdge = {
    cursor: string;
    node: PostNode;
};

export type PostsConnection = {
    edges: PostEdge[];
};

export type GetPostsResponse = {
    postsConnection: PostsConnection;
};