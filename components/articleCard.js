import Link from "next/link";
import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import style from "../styles/articleCard.module.css";

function ArticleCard({ authors, blog }) {
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
      blog.date[8] +
      blog.date[9] +
      " " +
      month[parseInt(blog.date[5]) * 10 + parseInt(blog.date[6]) - 1] +
      " " +
      blog.date[0] +
      blog.date[1] +
      blog.date[2] +
      blog.date[3];
    return date;
  };
  return (
    <Card className={`${style.articleCard}`} border="white">
      <Row>
        <Col
          xs={12}
          xl={4}
          lg={5}
          role="button"
          className="p-0 d-flex justify-content-center"
        >
          <Link href="/posts/[post_id]" as={`/posts/${blog._id}`}>
            <Card.Img
              variant="top"
              src={blog.thumbnail ? blog.thumbnail : "/thumbnail/default.png"}
              className={style.cardImage}
            />
          </Link>
        </Col>
        <Col xs={12} xl={8} lg={7} className="p-lg-0">
          <Card.Body className="pt-lg-0">
            <Card.Title className="anchor-link" role="button">
              <Link href="/posts/[post_id]" as={`/posts/${blog._id}`}>
                {blog.title}
              </Link>
            </Card.Title>

            <Card.Text className="anchor-link" role="button">
              <Link href="/posts/[post_id]" as={`/posts/${blog._id}`}>
                {blog.caption}
              </Link>
            </Card.Text>
            <blockquote className="blockquote p-0 card-body">
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Written by{" "}
                  <cite
                    title={
                      authors.find((item) => item._id === blog.author).name
                    }
                    className="author-anchor"
                  >
                    <Link
                      href="/authors/[author]"
                      as={`/authors/${blog.author}`}
                    >
                      {authors.find((item) => item._id === blog.author).name}
                    </Link>
                  </cite>
                </small>
              </footer>
            </blockquote>
            <Link href="/posts/[post_id]" as={`/posts/${blog._id}`}>
              <span className="btn btn-outline-info">Read More</span>
            </Link>
            <Card.Text>
              <small className="text-muted">Posted {getDate()}</small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <div className="p-3 bg-light">
        <small className="text-muted">
          {blog.tags.map((item) => (
            <span key={item}>
              <Button variant="outline-info" className="tags" size="sm">
                <Link href="/tags/[tag_name]" as={`/tags/${item}`}>
                  {item}
                </Link>
              </Button>{" "}
            </span>
          ))}
        </small>
      </div>
    </Card>
  );
}

export default ArticleCard;
