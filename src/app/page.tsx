export default function Home() {

    const posts = [
        {title: 'React testing', excerpt: 'Learn React testing'},
        {title: 'React testing with TS', excerpt: 'Learn React testing with TS'}
    ]
    return <div className={'container mx-auto px-10 mb-8 bg-gray-300'}>
        <header/>
        <div className={'grid grid-cols-1 lg:grid-cols-12 gap-12'}>
            {posts.map((post, index) => (
                <div key={index}>
                    {post.title}
                    {post.excerpt}
                </div>
            ))}
        </div>

        <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">

            </div>
        </div>
    </div>
}
