import fs from 'fs'; // read files from the file system
import path from 'path'; // manipulate file path
import matter from 'gray-matter'; // parse the metadata in each md file
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // get filenames under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove .md from file name
        const id = fileName.replace(/\.md$/, '');

        console.log('id ' + id);

        // Read md file as string 
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // console.log('fileContents: ' + fileContents)

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        console.log(matterResult)


        // combine the data with the id and return
        return {
            id, 
            ...matterResult.data,
        }
    })
    // sort posts by date
return allPostsData.sort(({date: a}, {date: b}) => {
    if (a < b) {
        return 1;
    }
    else if (a > b) {
        return -1;
    }
    else {
        return 0;
    }
})

}

// get all post data
export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        }
    })

}

// get post data by id
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    //parse the post metadata section
    const matterResult = matter(fileContents);


    // use remark to convert md into html string
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

    const contentHtml = processedContent.toString();

    return {
        id, 
        contentHtml,
        ...matterResult.data,
    }
}