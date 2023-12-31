import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

function App() {
    const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setIsFetching(true);
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
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            setIsFetching(false);
        };
        fetchPosts();
    }, []);

    let content: ReactNode;

    if (error) {
        content = <ErrorMessage text={error} />;
    }

    if (fetchedPosts) {
        content = <BlogPosts posts={fetchedPosts} />;
    }

    if (isFetching) {
        content = <p id="loading-fallback">Fetching posts...</p>;
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
