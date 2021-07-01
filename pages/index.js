import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import { server } from "../config/config";
import ArticleCard from "../components/articleCard";
import Tags from "../data/tags.json";

const tags = Tags.categories;

export default function Home({ posts }) {
  const data = posts.data;
  return (
    <div>
      <Head>
        <title>Welcome To Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>

      <Jumbotron fluid className="mainJumbotron mb-0">
        <h1 className="display-1  text-center fw-bold text-warning jumbotronHead pt-5">
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

      <Container className="bg-white">
        <Row className="text-center pt-5">
          <Link href="/">
            <Col role="button" xs={4}>
              <Image src="/assets/blogs.svg" />
              <br />
              <br />
              <p>BLOGS</p>
            </Col>
          </Link>
          <Link href="/quicksplained">
            <Col role="button" xs={4}>
              <Image src="/assets/stats.svg" />
              <br />
              <br />
              <p>INFOGRAPHICS</p>
            </Col>
          </Link>
          <Link href="/">
            <Col role="button" xs={4}>
              <Image src="/assets/magnify.svg" />
              <br />
              <br />
              <p>INSIGHTS</p>
            </Col>
          </Link>
        </Row>
        <Row className="pl-md-3 pr-md-0">
          <Col lg={2} className="pt-5">
            <h6>Trending on Lemonerd</h6>
            <p>
              {tags.map((tag) => (
                <span key={tag}>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="px-1 py-0"
                  >
                    <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </Button>{" "}
                </span>
              ))}
            </p>
          </Col>
          <Col lg={10}>
            {data.map((element) => (
              <div className="p-3" key={element._id}>
                <ArticleCard {...element} />
              </div>
            ))}
          </Col>
        </Row>
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
