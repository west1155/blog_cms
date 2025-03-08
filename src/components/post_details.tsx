'use client'

import {useParams} from "next/navigation";
import {Categories} from "./categories";
import {PostContent} from "./post_content";
import {PostWidget} from "./post_widget";
import {Author} from "@/components/author";
import {PostDetailType} from "@/services/types";

interface Props {
    post: PostDetailType | null;
}

export function PostDetailPage({post}: Props) {
    const params = useParams();
    const slug = params.slug as string;


    const categorySlugArray = post ? post.categories.map(category => category.slug) : [];

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    {post && (
                        <>
                            <PostContent post={post}/>
                            <Author author={post.author}/>
                        </>

                    )}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget slug={slug} categories={categorySlugArray}/>
                        <Categories/>
                    </div>
                </div>
            </div>
        </div>
    );
}