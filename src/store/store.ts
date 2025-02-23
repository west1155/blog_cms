import { create } from 'zustand';
import {
    Category,
    Post, PostEdge
} from '@/types';
import {getPostDetails, getPosts} from "@/services/blogAPI";

export interface WidgetPost {
    title: string;
    featuredImage: { url: string };
    createdAt: string;
    slug: string;
}

interface PostsState {
    posts: PostEdge[],
    postDetails: Post | null;
    widgetPosts: WidgetPost[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
    fetchPostDetails: (slug: string) => Promise<void>;
    fetchWidgetPosts: (categories?: Category[], slug?: string) => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
    posts: [],
    postDetails: null,
    widgetPosts: [],
    loading: false,
    error: null,

    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const data = await getPosts();
            set({ posts: data.postsConnection.edges, loading: false });
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message || 'Error fetching posts', loading: false });
            } else {
                set({error: 'Error fetching posts', loading: false});
            }
        }
    },

    fetchPostDetails: async (slug: string) => {
        set({ loading: true, error: null });
        try {
            const data = await getPostDetails(slug);
            set({ postDetails: data.post, loading: false });
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message || 'Error fetching post details', loading: false });
            } else {
                set({ error: 'Error fetching post details', loading: false });
            }
        }
    },

    fetchWidgetPosts: async (categories?: Category[], slug?: string) => {
        set({ loading: true, error: null });
        try {
            let posts: WidgetPost[];
            if (slug && categories) {
                posts = await getSimilarPosts(categories, slug);
            } else {
                const data = await getRecentPosts();
                posts = data.posts;
            }
            set({ widgetPosts: posts, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Error fetching widget posts', loading: false });
        }
    },
}));