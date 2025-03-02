'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import graphCMSImageLoader from "@/services/graphImageLoader";
import { usePostsStore } from "@/store/store";

type PropsType = {
    slug?: string;
    categories?: string[];
}

export const PostWidget = ({ slug, categories }: PropsType) => {
    const {
        recentPosts,
        similarPosts,
        fetchRecentPosts,
        fetchSimilarPosts,
        recentPostsLoading,
        similarPostsLoading
    } = usePostsStore();

    useEffect(() => {
        if (slug && categories && categories.length) {
            fetchSimilarPosts(categories, slug);
        } else {
            fetchRecentPosts();
        }
    }, [slug, categories, fetchRecentPosts, fetchSimilarPosts]);

    const postsToDisplay = slug ? similarPosts : recentPosts;
    const isLoading = slug ? similarPostsLoading : recentPostsLoading;

    if (isLoading) return <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">Loading posts...</div>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
            {postsToDisplay.length ? (
                postsToDisplay.map((post, index) => (
                    <div key={index} className="flex items-center w-full mb-4">
                        <div className="w-16 flex-none">
                            <Image
                                loader={graphCMSImageLoader}
                                alt={post.title}
                                height={60}
                                width={60}
                                unoptimized
                                className="align-middle rounded-full"
                                src={post.featuredImage.url}
                            />
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                            <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center">No {slug ? 'related' : 'recent'} posts found</div>
            )}
        </div>
    );
};