import { Card, Button, Col, Row } from "react-bootstrap";
import style from "../styles/articleCard.module.css";
import Link from "next/link";
import Author from "../data/authors.json";

const authors = Author.authors;

function ArticleCard(props) {
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
      props.date[8] +
      props.date[9] +
      " " +
      month[props.date[5] * 10 + props.date[6] - 1] +
      " " +
      props.date[0] +
      props.date[1] +
      props.date[2] +
      props.date[3];
    return date;
  };
  return (
    <Card className={`p-md-3 ${style.articleCard}`} border="white">
      <Row>
        <Col xs={12} md={4}>
          <Card.Img
            variant="top"
            src={
              props.thumbnail
                ? props.thumbnail.replace(/%2F/gi, "/")
                : "/thumbnail/default.png"
            }
            className={style.cardImage}
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title className="">{props.title}</Card.Title>
            <Card.Text>{props.caption}</Card.Text>
            <blockquote className="blockquote mb-0 card-body">
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Written by{" "}
                  <cite title="Source Title" className="author-anchor">
                    <Link
                      href="/authors/[author]"
                      as={`/authors/${props.author}`}
                    >
                      {authors.find((item) => item.id === props.author)
                        ? authors.find((item) => item.id === props.author).name
                        : null}
                    </Link>
                  </cite>
                </small>
              </footer>
            </blockquote>
            <Link href="/posts/[post_id]" as={`/posts/${props._id}`}>
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
          {props.tags.map((item) => (
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
