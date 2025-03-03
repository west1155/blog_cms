import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
    PostDetail,
    Categories,
    PostWidget,
    Author,
    Comments,
    CommentsForm,
    Loader
} from '@/components';
import { getPosts, getPostDetails } from '@/services/blogAPI';
import { AdjacentPosts } from '../../sections';
import { PostDetail as PostDetailType } from '@/services/types';

interface PostDetailsProps {
    post: PostDetailType;
}

interface IParams extends ParsedUrlQuery {
    slug: string;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <>
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const data = await getPostDetails(slug);

    return {
        props: {
            post: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await getPosts();

    return {
        paths: posts.postsConnection.edges.map(({ node }) => ({
            params: { slug: node.slug }
        })),
        fallback: true,
    };
};