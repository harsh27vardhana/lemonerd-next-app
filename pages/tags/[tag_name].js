import Head from "next/head";
import { Container } from "react-bootstrap";
import ArticleCard from "../../components/articleCard";
import { server } from "../../config/config";
import Data from "../../data/tags.json";
import dbConnect from "../../database/dbconnect";
import Author from "../../database/authorSchema";
import Post from "../../database/postSchema";

function Tags({ blogs, authors, tag }) {
  return (
    <Container className="mt-5 py-5 bg-white">
      <Head>
        <title>{tag} | Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <h1 className="py-5 text-center font-weight-bold display-3 gradient-text d-none d-sm-block">
        {tag}
      </h1>
      <h1 className="py-5 text-center font-weight-bold display-4 gradient-text d-block d-sm-none">
        {tag}
      </h1>
      {blogs.map((blog) =>
        blog.tags.includes(tag) ? (
          <div className="p-3" key={blog._id}>
            <ArticleCard {...{ blog, authors }} />
          </div>
        ) : null
      )}
    </Container>
  );
}

export async function getStaticPaths() {
  const tags = Data.categories;
  const paths = tags.map((tag) => ({
    params: {
      tag_name: tag,
    },
  }));
  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  dbConnect();
  const tag = params.tag_name;
  const post = await Post.find({ tags: params.tag_name, hidden: "false" }).sort(
    { date: -1 }
  );
  const author = Author.find();
  const result = await Promise.all([post, author]).then(([poss, authos]) => {
    const blogs = JSON.parse(JSON.stringify(poss));
    const authors = JSON.parse(JSON.stringify(authos));
    return { blogs, authors, tag };
  });
  // const posts = JSON.parse(JSON.stringify(post));
  return {
    props: result,
    revalidate: 100,
  };
}

export default Tags;
