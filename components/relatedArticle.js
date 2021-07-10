import { Card, Button, Col, Row } from "react-bootstrap";
import style from "../styles/relatedArticle.module.css";
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
    <Card className={style.cardMain}>
      <div
        className={style.cardImg}
        style={{
          backgroundImage: `url("${props.thumbnail.replace(/%2F/gi, "/")}")`,
        }}
      />
      <div className="d-flex align-items-stretch" style={{ height: "100%" }}>
        <Card.Body>
          <Link href="/posts/[post_id]" as={`/posts/${props._id}`}>
            <Card.Title role="button" className={style.cardTitle}>
              {props.title.substring(0, 30) +
                (props.title.length > 29 ? "..." : "")}
            </Card.Title>
          </Link>
          <footer className="blockquote-footer my-0">
            <small className="text-muted">
              Posted {getDate()}
              <br />
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
