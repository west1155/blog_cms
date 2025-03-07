export type AuthorType = {
    bio: string;
    name: string;
    photo: {
        url: string;
    };
};

export type Category = {
    name: string;
    slug: string;
};

export type PostNode = {
    author: AuthorType;
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

export type PostDetailType = {
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    author: {
        name: string;
        bio: string;
        photo: {
            url: string;
        };
    };
    createdAt: string;
    slug: string;
    content: any;
    categories: Category[];
};


export type RelatedPost = {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
};

export type GetPostDetailResponse = {
    post: PostDetailType;
};

export type RecentPost = {
    title: string;
    featuredImage: {
        url: string;
    };
    createdAt: string;
    slug: string;
};

export type GetRecentPostsResponse = {
    posts: RecentPost[];
};

export type GetSimilarPostsResponse = {
    posts: RelatedPost[];
};
