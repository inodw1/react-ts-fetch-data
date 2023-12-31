import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";

type RawDataBlogPost = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

function App() {
    const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();

    useEffect(() => {
        const fetchPosts = async () => {
            const data = (await get(
                "https://jsonplaceholder.typicode.com/posts"
            )) as RawDataBlogPost[];

            const blogPosts: BlogPost[] = data.map((rawPost) => {
                return {
                    id: rawPost.id,
                    title: rawPost.title,
                    text: rawPost.body,
                };
            });

            setFetchedPosts(blogPosts);
        };
        fetchPosts();
    }, []);

    let content: ReactNode;

    if (fetchedPosts) {
        content = <BlogPosts posts={fetchedPosts} />;
    }

    return (
        <main>
            <img
                src={fetchingImg}
                alt="An abstract image depicting a data fetching process"
            />
            {content}
        </main>
    );
}

export default App;
