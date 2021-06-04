import Image from "next/image";
import Button from "react-bootstrap/Button";
import { Card, Badge, Col, Row } from "react-bootstrap";
import Link from "next/link";

function ArticleCard(props) {
  return (
    <Card className="p-md-3">
      <Row>
        <Col xs={12} md={4}>
          <Card.Img
            variant="top"
            src="/team/harsh.png"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body>
            <Card.Title className="p-md-3">{props.title}</Card.Title>
            <blockquote className="blockquote mb-0 card-body">
              <p>{props.caption}</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Written by <cite title="Source Title">{props.author}</cite>
                </small>
              </footer>
            </blockquote>
            <Link href="/posts/[post_id]" as={`/posts/${props._id}`}>
              Read More
            </Link>
            <Card.Text>
              <small className="text-muted">Posted {props.date}</small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Card.Footer>
        <small className="text-muted">
          {props.tags.map((item) => (
            <span key={item}>
              <Badge pill variant="info">
                {item.name ? item.name : item}
              </Badge>{" "}
            </span>
          ))}
        </small>
      </Card.Footer>
    </Card>
  );
}

export default ArticleCard;
