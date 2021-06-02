import Image from "next/image";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";

function ArticleCard() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Article Title</Card.Title>
        <Card.Text>
          <blockquote className="blockquote mb-0 card-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              <small className="text-muted">
                Written by <cite title="Source Title">Author</cite>
              </small>
            </footer>
          </blockquote>
        </Card.Text>
        <Button variant="primary">Read More</Button>
        <Card.Text>
          <small className="text-muted">Posted 3 mins ago</small>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">categories</small>
      </Card.Footer>
    </Card>
  );
}

export default ArticleCard;
