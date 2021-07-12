import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import { server } from "../config/config";
import ArticleCard from "../components/articleCard";
import Tags from "../data/tags.json";
import { useRef, useState } from "react";
import dbConnect from "../database/dbconnect";
import Post from "../database/postSchema";

const tags = Tags.categories;
const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Home({ blogs }) {
  const data = blogs;
  const blogsRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const executeScroll = () => scrollToRef(blogsRef);

  const scrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

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
        <h1 className="display-1 text-center font-weight-bold text-yellow jumbotronHead pt-5">
          <span className="text-white">Lemo</span>nerd
        </h1>
        <h2 className="jumbotronSubhead text-center text-white">
          Technology | Science | Culture
        </h2>
        <div className="text-center py-5 container-fluid">
          <Button
            variant="outline-warning"
            className="px-4 outline-yellow"
            onClick={executeScroll}
          >
            Learn More
          </Button>
        </div>
      </Jumbotron>

      <Container className="bg-white">
        <FaArrowUp
          className="scrollTop"
          onClick={scrollTop}
          style={{ height: 40, display: showScroll ? "flex" : "none" }}
        />
        <Row className="text-center pt-5 justify-content-center">
          <Col
            role="button"
            xs={3}
            className="justify-content-center d-flex"
            onClick={executeScroll}
          >
            <div className="text-center">
              <Image src="/assets/blogs.png" className="h-50 w-auto" />
              <p className="mt-2 d-none d-sm-block">BLOGS</p>
              <small className="mt-2 d-block d-sm-none">BLOGS</small>
            </div>
          </Col>
          <Col sm={1} xs={1} className="justify-content-center d-flex">
            <div className="vl" />
          </Col>
          <Link href="/quicksplained" className="anchor" role="button">
            <Col role="button" xs={3} className="justify-content-center d-flex">
              <div className="text-center">
                <Image src="/assets/stats.png" className="h-50 w-auto" />
                <p className="mt-2 d-none d-sm-block">INFOGRAPHICS</p>
                <small className="mt-2 d-block d-sm-none">INFOGRAPHICS</small>
              </div>
            </Col>
          </Link>
          <Col sm={1} xs={1} className="justify-content-center d-flex">
            <div className="vl" />
          </Col>
          <Link href="/authors">
            <Col role="button" xs={3} className="justify-content-center d-flex">
              <div className="text-center">
                <Image src="/assets/magnify.png" className="h-50 w-auto" />
                <p className="mt-2 d-none d-sm-block">AUTHORS</p>
                <small className="mt-2 d-block d-sm-none">AUTHORS</small>
              </div>
            </Col>
          </Link>
        </Row>
        <Row className="pl-md-3 pr-md-0" ref={blogsRef}>
          <Col lg={2} className="pt-5 d-none d-lg-block">
            <div className="sticky-top" style={{ top: "6rem" }}>
              <h6>Trending on Lemonerd</h6>
              <p>
                {tags.map((tag) => (
                  <span key={tag}>
                    <Button
                      variant="outline-info"
                      size="md"
                      className="px-1 py-0 m-1 tags"
                    >
                      <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                        {tag}
                      </Link>
                    </Button>{" "}
                  </span>
                ))}
              </p>
            </div>
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
  dbConnect();

  const posts = await Post.find({ hidden: "false" }).sort({ date: -1 });

  const blogs = JSON.parse(JSON.stringify(posts));
  return {
    props: { blogs },
    revalidate: 100,
  };
};

