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
    <Card
      className="m-2"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      }}
    >
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url("${props.thumbnail.replace(/%2F/gi, "/")}")`,
          height: "25vw",
          width: "100%",
        }}
      />
      <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
        <Card.Body>
          <Link href="/posts/[post_id]" as={`/posts/${props._id}`}>
            <Card.Title role="button" style={{ fontSize: "2vw" }}>
              {props.title.substring(0, 20) +
                (props.title.length > 19 ? "..." : "")}
            </Card.Title>
          </Link>
          <Card.Text>
            <small className="text-muted">Posted {getDate()}</small>
          </Card.Text>
          <footer className="blockquote-footer my-0">
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
        </Card.Body>
      </div>
    </Card>
  );
}

export default RelatedArticle;
