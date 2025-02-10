import React from 'react';

export type Post = {
    title: string
    excerpt: string
}

type PropsType = {
    className?: string
    post: Post

}
export const PostCard = ({className, post}: PropsType) => {
    return <div className={className}>
        {post.title}
        {post.excerpt}
    </div>
}
