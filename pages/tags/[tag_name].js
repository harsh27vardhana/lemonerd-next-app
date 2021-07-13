import Head from "next/head";
import { Container } from "react-bootstrap";
import ArticleCard from "../../components/articleCard";
import { server } from "../../config/config";
import Data from "../../data/tags.json"
import dbConnect from "../../database/dbconnect";
import Post from "../../database/postSchema";

function Tags({ posts, tag }) {
  const data = posts;
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
      {data.map((item) =>
        item.tags.includes(tag) ? (
          <div className="p-3" key={item._id}>
            <ArticleCard {...item} />
          </div>
        ) : null
      )}
    </Container>
  );
}

export async function getStaticPaths(){
  const tags= Data.categories;
  const paths = tags.map((tag)=>({
    params:{
      tag_name:tag
    }
  }))
  return { paths, fallback: true };

}

export async function getStaticProps({params}) {
  dbConnect();
  const tag=params.tag_name;
  const post = await Post.find({ tags: params.tag_name, hidden: "false" }).sort({ date: -1 });
  const posts = JSON.parse(JSON.stringify(post));
  return {
    props: { posts, tag },
  };
}

export default Tags;
