// Static generation - with data to fetch

export default function Blog({posts}) {
    return (
        <ul>
            {posts.map((post) => {
                return (<li key={1}>{post.title}</li>)
            })}
        </ul>
    )
}

export async function getStaticProps() {
    // fetch external API
    const res = await fetch('https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo')
    const posts = await res.json()

    // get the post path based on post id in params
    const paths = posts.map((post) => ({
        params: {id: post.id}
    }))


    // now, Blog ocmponent will receive posts as a prop at build time.
    return {
        props: {
            posts,
        }
    }

}