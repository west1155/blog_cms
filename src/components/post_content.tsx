import {graphCMSImageLoader} from "@/services/graphImageLoader";
import Image from 'next/image';
import moment from "moment";

export const PostContent = ({ post }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <Image
                    loader={graphCMSImageLoader}
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top h-full w-full rounded-t-lg"
                    width={1200}
                    height={600}
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <Image
                            loader={graphCMSImageLoader}
                            alt={post.author.name}
                            height={30}
                            width={30}
                            className="align-middle rounded-full"
                            src={post.author.photo.url}
                        />
                        <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                </div>
                <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
                <div className="post-content">
                    {typeof post.content.raw === 'string'
                        ? <div dangerouslySetInnerHTML={{ __html: post.content.raw }} />
                        : <div>Content format not supported</div>}
                </div>
            </div>
        </div>
    );
};