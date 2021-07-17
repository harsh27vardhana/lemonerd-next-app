import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../styles/authors.module.css";
import dbConnect from "../../database/dbconnect";
import Author from "../../database/authorSchema";
import Post from "../../database/postSchema";

function Authors({ posts, authors }) {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", checkScrollTop);

  function getAuthorTags(author) {
    const authorBlog = posts.filter((item) => item.author === author);
    const authorTags = authorBlog.map((blog) => blog.tags);
    const allTags = [].concat.apply([], authorTags);
    const tags = [...new Set([...allTags])];
    return tags;
  }
  return (
    <div className="my-5 pt-5">
      <Head>
        <title>Authors | Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <Container>
        <FaArrowUp
          className="scrollTop"
          onClick={scrollTop}
          style={{ height: 40, display: showScroll ? "flex" : "none" }}
        />
        <h1 className="font-weight-bold text-center py-5 display-3 gradient-text">
          Authors
        </h1>
        <Row
          className="justify-content-center"
          style={{ transform: "translateY(5rem)" }}
        >
          {authors.map((author) => (
            <Col
              key={author._id}
              lg={6}
              xs={12}
              className="d-flex align-items-strech h-auto w-auto justify-content-center"
            >
              <Card
                className={`px-3 py-5 m-3 ${styles.authorIndividualCard}`}
                border="white"
              >
                <Link href="/authors/[author]" as={`/authors/${author._id}`}>
                  <div
                    className={`d-flex justify-content-center ${styles.translateDiv}`}
                  >
                    <div
                      className={`circular-img ${styles.authorImage}`}
                      role="button"
                      style={{
                        backgroundImage: `url("${author.image}")`,
                      }}
                    />
                  </div>
                </Link>
                <Card.Body className={`p-md-3 ${styles.translateDiv}`}>
                  <Link href="/authors/[author]" as={`/authors/${author._id}`}>
                    <Card.Title
                      role="button"
                      className="text-center font-weight-bold"
                    >
                      {author.name}
                    </Card.Title>
                  </Link>
                  <Link href="/authors/[author]" as={`/authors/${author._id}`}>
                    <Card.Text role="button">{author.description}</Card.Text>
                  </Link>
                  <br />
                </Card.Body>
                <span className="d-inline pl-3">
                  <strong className="h5">Related Tags: </strong>
                  {getAuthorTags(author._id).map((tag) => (
                    <span key={tag}>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="px-1 py-0 tags m-1"
                      >
                        <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                          {tag}
                        </Link>
                      </Button>{" "}
                    </span>
                  ))}
                </span>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Authors;

export const getStaticProps = async () => {
  dbConnect();
  const post = Post.find({ hidden: "false" });
  const author = Author.find();
  const result = await Promise.all([post, author]).then(([poss, authos]) => {
    const posts = JSON.parse(JSON.stringify(poss));
    const authors = JSON.parse(JSON.stringify(authos));
    return { posts, authors };
  });

  return {
    props: result,
    revalidate: 100,
  };
};
