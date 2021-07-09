import { Card, Button, Col, Row } from "react-bootstrap";
import style from "../styles/articleCard.module.css";
import Link from "next/link";
import Author from "../data/authors.json";

const authors = Author.authors;

function RelatedArticle(props) {
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
    <Card className="d-flex align-items-stretch m-2" style={{ height: "100%" }}>
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url("${props.thumbnail.replace(/%2F/gi, "/")}")`,
          height: "35rem",
          width: "100%",
        }}
      />
      <Card.Body>
        <Link href="/posts/[post_id]" as={`/posts/${props._id}`}>
          <Card.Title className="font-weight-bold" role="button">
            {props.title}
          </Card.Title>
        </Link>
        <Card.Text>
          <small className="text-muted">Posted {getDate()}</small>
        </Card.Text>
        <blockquote className="blockquote my-0 card-body">
          <footer className="blockquote-footer my=0">
            <small className="text-muted">
              Written by{" "}
              <cite title="Source Title" className="author-anchor">
                <Link href="/authors/[author]" as={`/authors/${props.author}`}>
                  {authors.find((item) => item.id === props.author)
                    ? authors.find((item) => item.id === props.author).name
                    : null}
                </Link>
              </cite>
            </small>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default RelatedArticle;
