import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import { getAllPostsIds, getPostData } from "../../lib/posts";

// Dynamic routes: /pages/posts/[id]
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
            <h1 className={utilStyles.headingXl}>
                {postData.title}
            </h1>
            <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
            </article>
        </Layout>
    )
} 





export async function getStaticPaths() {
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false,
    }
}


// get post data by id
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}

// // this is to fetch the external data to specify the path you want to pre-render (/posts/)
// export async function getStaticPaths() {
//     // fetch external API
//     const res = await fetch('https://api.hubapi.com/content/api/v2/blog-posts?hapikey=demo')
//     const posts = await res.json()

//     // get the post path based on post id in params
//     const paths = posts.map((post) => ({
//         params: {id: post.id}
//     }))


//     // now, Blog component will receive posts as a prop at build time.
//     return {
//         paths, 
//         fallback: false, // this means other routes return 404
//     }

// }


// // fetch the data based on id of the path specified
// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://api.hubapi.com/content/api/v2/blog-posts/${params.id}?hapikey=demo`)
//     const post = await res.json()

//     return {
//         props: {
//             post
//         }
//     }
// }
