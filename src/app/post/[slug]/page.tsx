import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import {
    PostDetailPage,
    Categories,
    PostWidget,
    Author,
} from '@/components';
import { getPostDetails, getPosts } from '@/services/blogAPI';
import { PostDetailType, PostNode } from '@/services/types';

interface PostDetailsProps {
    post: PostDetailType;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const data = await getPostDetails(params?.slug as string);

    return {
        props: {
            post: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();

    return {
        paths: posts.postsConnection.edges.map(({ node }: { node: PostNode }) => ({
            params: { slug: node.slug }
        })),
        fallback: true,
    };
};

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading ...</div>;
    }



    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetailPage post={post} />
                        <Author author={post.author} />
                        <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget
                                slug={post.slug}
                                categories={post.categories.map((category) => category.slug)}
                            />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetails;
