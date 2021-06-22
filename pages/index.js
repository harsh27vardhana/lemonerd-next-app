import Head from "next/head";
import { Container } from "react-bootstrap";
import { server } from "../config/config";
import ArticleCard from "../components/articleCard";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Button } from "react-bootstrap";

export default function Home({ posts }) {
  // Use this data array for all the posts fetched
  const data = posts.data;
  // console.log(data);
  return (
    <div>
      <Head>
        <title>Welcome To Lemonerd</title>
      </Head>

      <Jumbotron fluid className="mainJumbotron">
        <h1 className="display-1  text-center monotone text-warning jumbotronHead pt-5">
          <span className="text-white">LEMO</span>NERD
        </h1>
        <h2 className="jumbotronSubhead text-center text-white">
          Technology | Science | Culture
        </h2>
        <div className="text-center py-5 container-fluid">
          <Button variant="outline-warning" className="px-4">
            Learn More
          </Button>
        </div>
      </Jumbotron>

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
