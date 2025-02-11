// usePostsStore.ts
import {create} from 'zustand';
import { GetPostsResponse, PostEdge } from '@/services/types';
import { getPosts } from '../services/blogAPI';

interface PostsState {
    posts: PostEdge[];
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
}

export const usePostsStore = create<PostsState>((set) => ({
    posts: [],
    loading: false,
    error: null,
    fetchPosts: async () => {
        // Start loading and reset any previous error.
        set({ loading: true, error: null });
        try {
            // Call your getPosts function to fetch data.
            const data: GetPostsResponse = await getPosts();
            // Extract the posts edges from the response.
            const posts: PostEdge[] = data.postsConnection.edges;
            // Update state with the posts and mark loading as false.
            set({ posts, loading: false });
        } catch (error: any) {
            // Update state with the error message.
            set({ error: error.message || 'Error fetching posts', loading: false });
        }
    },
}));
