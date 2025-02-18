import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { Category } from '@/types';
import { usePostsStore } from '@/store/store';
import { graphCMSImageLoader } from '@/services/graphImageLoader';

interface PostWidgetProps {
    categories?: Category[];
    slug?: string;
}

const PostWidget: React.FC<PostWidgetProps> = ({ categories, slug }) => {
    const { widgetPosts, loading, error, fetchWidgetPosts } = usePostsStore();

    React.useEffect(() => {
        fetchWidgetPosts(categories, slug);
    }, [categories, slug, fetchWidgetPosts]);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            {/* Rest of your component... */}
        </div>
    );
};

export default PostWidget;