'use client';

import {useEffect} from 'react';
import {usePostsStore} from "@/store/store";
import {PostCard} from "@/components";

export default function Home() {
    const {posts, loading, error, fetchPosts} = usePostsStore();


    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);


    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(posts);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((edge, index) => (
                        <PostCard key={index} post={edge.node}/>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                </div>
            </div>
        </div>
    );
}
