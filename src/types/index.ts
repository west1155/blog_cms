export interface Author {
    id: string;
    name: string;
    bio: string;
    photo: {
        url: string;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Post {
    id: string;
    title: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    author: Author;
    createdAt: string;
    slug: string;
    content?: {
        raw: {
            children: any[];
        };
    };
    categories: Category[];
}

export interface Comment {
    name: string;
    email: string;
    comment: string;
    createdAt: string;
    slug: string;
}


export interface GetCategoriesResponse {
    categories: Category[];
}


export interface GetPostDetailsResponse {
    post: Post;
}
export interface GetCommentsResponse {
    comments: Comment[];
}

export interface SubmitCommentResponse {
    createComment: {
        id: string;
    };
}

export interface GetAdjacentPostsResponse {
    previous: Post[];
    next: Post[];
}

export type PostNode = {
    id: string;
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


export interface PostDetails {
    id: string;
    title: string;
    content: {
        raw: {
            children: any[];
        };
    };
    excerpt: string;
    createdAt: string;
    author: Author;
    featuredImage: {
        url: string;
    };
    category: {
        name: string;
        slug: string;
    };
}