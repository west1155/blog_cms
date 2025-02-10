import {Post, PostCard} from "@/components/postcard";
import {Categories, PostWidget} from "@/components";


export default function Home() {

    const posts: Post[] = [
        {title: 'React testing', excerpt: 'Learn React testing'},
        {title: 'React testing with TS', excerpt: 'Learn React testing with TS'}
    ]
    return <div className={'container mx-auto px-10 mb-8 '}>
        <div className={'grid grid-cols-1 lg:grid-cols-12 gap-12'}>
            <div className="lg:col-span-8 col-span-1">
                {posts.map((post, index) => (<div key={index}><PostCard post={post}/></div>))}
            </div>

            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                    <PostWidget/>
                    <Categories/>
                </div>
            </div>
        </div>
    </div>
}
