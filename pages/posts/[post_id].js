import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";
import { server } from "../../config/config";
import Author from "../../data/authors.json";
import Image from "react-bootstrap/Image";
import { useState, useEffect } from "react";

const authors = Author.authors;

function Posts({ post }) {
  const postAuthor = authors.find((item) => item.id === post.author);
  const [writerTags, setWriterTags] = useState([]);
  async function getPosts() {
    const res = await fetch("/api/posts", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await res.json();
    const data = result.data;
    const authorBlog = data.filter((item) => item.author === post.author);
    const authorTags = authorBlog.map((blog) => blog.tags);
    const allTags = [].concat.apply([], authorTags);
    const tags = [...new Set([...allTags])];
    setWriterTags(tags);
  }

  useEffect(async () => {
    getPosts();
  }, []);
  const getDate = () => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date =
      post.date[8] +
      post.date[9] +
      " " +
      month[post.date[5] * 10 + post.date[6] - 1] +
      " " +
      post.date[0] +
      post.date[1] +
      post.date[2] +
      post.date[3];
    return date;
  };
  return (
    <div className="my-5 pt-5">
      <Container className=" bg-white">
        <Row>
          <Col md={3} sm={12} className="d-none d-md-block">
            <div className="pt-5 mt-5">
              <Row>
                <Col lg={3} md={4}>
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={
                        postAuthor.image
                          ? postAuthor.image.replace(/%2F/gi, "/")
                          : "/author/default.png"
                      }
                      style={{
                        minWidth: "100%",
                        minHeight: "100%",
                        width: "auto",
                        height: "auto",
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </Col>
                <Col lg={9} md={8} className="d-flex align-self-end">
                  <h5>{postAuthor.name}</h5>
                </Col>
              </Row>
              <hr />
              <div>{postAuthor.description}</div>
              <div>
                <h6>Writer Tags</h6>
                {writerTags.map((tag) => (
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
              </div>
            </div>
          </Col>
          <Col md={9} xs={12}>
            <Card className="py-5" border="white">
              <div className="py-lg-5">
                <h1>{post.title}</h1>
                <footer className="blockquote-footer d-none d-md-block">
                  {getDate()}
                </footer>
                <div>
                  <br />
                  <Row className="d-flex d-md-none">
                    <Col xs={2}>
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={
                            postAuthor.image
                              ? postAuthor.image.replace(/%2F/gi, "/")
                              : "/author/default.png"
                          }
                          style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            width: "auto",
                            height: "auto",
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs={10}>
                      <h5>{postAuthor.name}</h5>
                      <footer className="blockquote-footer">{getDate()}</footer>
                    </Col>
                  </Row>
                  <hr />
                </div>
                <div
                  id="postContent"
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(/%2F/gi, "/"),
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
        <hr />
        <div className="px-5 pt-5 text-center">
          <h6 className="font-weight-bold">
            Related Tags:{" "}
            {post.tags.map((tag) => (
              <span key={tag}>
                <Button variant="outline-info" size="sm">
                  <Link href="/tags/[tag_name]" as={`/tags/${tag}`}>
                    {tag}
                  </Link>
                </Button>{" "}
              </span>
            ))}
          </h6>
        </div>
        <div className="py-5">
          <h3 className="font-weight-bold text-center">
            Want to share your ideas?
          </h3>
          <p className="text-center">
            If you love technology, science or politics and wish to share your
            ideas, send them to us and get featured on our blog as a
            distinguished author. Write us at <br />
            <span className="h4 font-weight-bold"> info@lemonerd.in</span>
          </p>
        </div>
      </Container>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { post_id } = context.query;
  const url = server + "/api/posts/" + post_id;
  const res = await fetch(url);
  const post = await res.json();
  return {
    props: { post },
  };
}

export default Posts;
