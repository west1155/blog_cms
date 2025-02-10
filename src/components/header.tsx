import React from 'react';
import Link from "next/link";


type PropsType = {
    className?: string;
}
export const Header = ({className}: PropsType) => {

    const categories = [
        {name: 'reactlink', slug: 'dzigi'},
        {name: 'reactlink1', slug: 'dzigi'},
        {name: 'reactlink2', slug: 'dzigi'},
        {name: 'reactlink3', slug: 'dzigi'},

    ]
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">Graph CMS</span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((category, index) => (
                        <Link key={index} href={`/category/${category.slug}`}><span
                            className="md:float-right mt-2 align-middle
                            text-white ml-4 font-semibold cursor-pointer">
                            {category.name}
                        </span></Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
