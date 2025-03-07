'use client'

import { useParams } from "next/navigation";
import { Categories } from "./categories";
import { PostContent } from "./post_content";
import { PostWidget } from "./post_widget";
import {useEffect, useState } from "react";
import { PostDetailType } from "@/services/types";
import {getPostDetails} from "@/services/blogAPI";
import {Author} from "@/components/author";

export function PostDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<PostDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const postData = await getPostDetails(slug);
                setPost(postData);
            } catch (err: any) {
                setError(err.message || 'Error fetching post details');
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPostDetails();
        }
    }, [slug]);

    if (loading) return <div className="container mx-auto px-10">Loading post...</div>;
    if (error) return <div className="container mx-auto px-10">Error: {error}</div>;
    if (!post) return <div className="container mx-auto px-10">Post not found</div>;

    const categorySlugArray = post.categories.map(category => category.slug);

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostContent post={post} />
                    <Author author={post.author} />
                    {/* If you have CommentsForm and Comments components, add them here */}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={slug} categories={categorySlugArray} />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
}