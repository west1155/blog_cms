'use client'


import {logPosts} from "@/services";

export default function Home() {

    logPosts()





    // const [postNodes, setPostNodes] = useState<PostNode[]>([]);
    //
    // useEffect(() => {
    //     getPosts().then(data => setPostNodes(data.postsConnection.edges.map(edge => edge.node)));
    // }, []);


    return <div className={'container mx-auto px-10 mb-8'}>
        <header/>
        <div className={'grid grid-cols-1 lg:grid-cols-12 gap-12'}>
            {/*{postNodes.map((post, index) => (*/}
            {/*    <div key={index}>*/}
            {/*        <PostCard post={post}/>*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>

        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">

            </div>
        </div>
    </div>
}
