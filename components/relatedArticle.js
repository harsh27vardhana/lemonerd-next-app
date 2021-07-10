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
      <Link
        href="/posts/[post_id]"
        as={`/posts/${props._id}`}
        className="stretched-link"
      >
        <div
          role="button"
          className={style.cardImg}
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3),rgba(70, 70, 70, 1)), url("${props.thumbnail.replace(
              /%2F/gi,
              "/"
            )}")`,
          }}
        >
          <Card.Title className={style.cardTitle}>
            {props.title.substring(0, 25) +
              (props.title.length > 24 ? "..." : "")}
          </Card.Title>
        </div>
      </Link>
      <div className="d-flex align-items-stretch">
        <Card.Body>
          <footer className="blockquote-footer my-0 pb-3">
            <small className="text-muted">
              Posted {getDate()}
              <br />
              by{" "}
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
