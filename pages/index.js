import Head from "next/head";
import { Container } from "react-bootstrap";
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

      <Container>
        {data.map((element) => (
          <div className="p-3" key={element._id}>
            <ArticleCard {...element} />
          </div>
        ))}
      </Container>
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
