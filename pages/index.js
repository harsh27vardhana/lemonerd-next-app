import Head from "next/head";
import { CardColumns } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { server } from "../config/config";
import ArticleCard from "../components/articleCard";

export default function Home({ posts }) {
  // Use this data array for all the posts fetched
  const data = posts.data;
  // console.log(data);
  return (
    <div>
      <Head>
        <title>Welcome To Lemonerd</title>
      </Head>

      {data.map((element) => (
        <div className="px-md-5 mx-md-5 px-3 mx-3 my-5" key={element._id}>
          <ArticleCard {...element} />
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const url = server + "/api/posts";
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts },
  };
};
