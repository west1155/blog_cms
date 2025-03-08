"use client";

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {getPostDetails} from "@/services/blogAPI";
import {PostDetailType} from "@/services/types";
import {notFound} from "next/navigation";
import {PostDetailPage, Categories, Author} from "@/components";

const PostDetails: React.FC = () => {
    const {slug} = useParams(); // Get dynamic slug from URL
    const [post, setPost] = useState<PostDetailType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            try {
                const data = await getPostDetails(slug as string);
                if (!data) {
                    setError("Post not found");
                    return;
                }
                setPost(data);
            } catch (err) {
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return <p className="text-center">Loading post...</p>;
    if (error) return notFound();

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {post && (
                        <>
                            <PostDetailPage post={post}/>
                            <Author author={post.author}/>
                        </>
                    )}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
