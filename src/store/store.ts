import {create} from 'zustand';
import {GetPostsResponse, PostEdge, RecentPost, RelatedPost} from '@/services/types';
import {getPosts, getRecentPosts, getSimilarPosts} from '@/services/blogAPI';


interface PostsState {
    posts: PostEdge[];
    recentPosts: RecentPost[];
    loading: boolean;
    recentPostsLoading: boolean;
    similarPostsLoading: boolean;
    similarPosts: RelatedPost[];
    error: string | null;
    recentPostsError: string | null;
    similarPostsError: string | null;
    fetchPosts: () => Promise<void>;
    fetchRecentPosts: () => Promise<void>;
    fetchSimilarPosts: (categories: string[], slug: string) => Promise<void>;
}
export const usePostsStore = create<PostsState>((set) => ({
    posts: [],
    recentPosts: [],
    loading: false,
    error: null,
    similarPosts: [],
    recentPostsLoading: false,
    similarPostsLoading: false,
    recentPostsError: null,
    similarPostsError: null,
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

    fetchSimilarPosts: async (categories: string[], slug: string) => {
        set({ similarPostsLoading: true, similarPostsError: null });
        try {
            const similarPosts: RelatedPost[] = await getSimilarPosts(categories, slug);
            set({ similarPosts, similarPostsLoading: false });
        } catch (error: any) {
            set({
                similarPostsError: error.message || 'Error fetching similar posts',
                similarPostsLoading: false
            });
        }
    },
}));
