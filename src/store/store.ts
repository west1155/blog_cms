import {create} from 'zustand';
import {GetPostsResponse, PostEdge, RecentPost} from '@/services/types';
import {getPosts, getRecentPosts} from '@/services/blogAPI';


interface PostsState {
    posts: PostEdge[];
    recentPosts: RecentPost[];
    loading: boolean;
    recentPostsLoading: boolean;
    error: string | null;
    recentPostsError: string | null;
    fetchPosts: () => Promise<void>;
    fetchRecentPosts: () => Promise<void>;
}
export const usePostsStore = create<PostsState>((set) => ({
    posts: [],
    recentPosts: [],
    loading: false,
    error: null,
    recentPostsLoading: false,
    recentPostsError: null,
    fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
            const data: GetPostsResponse = await getPosts();
            const posts: PostEdge[] = data.postsConnection.edges;
            set({ posts, loading: false });
        } catch (error: any) {
            set({ error: error.message || 'Error fetching posts', loading: false });
        }
    },
    fetchRecentPosts: async () => {
        set({ recentPostsLoading: true, recentPostsError: null });
        try {
            const recentPosts: RecentPost[] = await getRecentPosts();
            set({ recentPosts, recentPostsLoading: false });
        } catch (error: any) {
            set({
                recentPostsError: error.message || 'Error fetching recent posts',
                recentPostsLoading: false
            });
        }
    },
}));
