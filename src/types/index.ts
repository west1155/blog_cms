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