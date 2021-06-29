import Link from "next/link";
import { Container, Card, Row, Col } from "react-bootstrap";
import Author from "../../data/authors.json";
import Image from "react-bootstrap/Image";

const authors = Author.authors;

function Authors() {
  return (
    <div className="my-5 pt-5">
      <Container>
        <h1 className="monotone display-1 text-center py-5">Authors</h1>
        <Row>
          {authors.map((author) => (
            <Col
              key={author.id}
              md={6}
              className="d-flex align-items-strech h-auto"
            >
              <Card className="p-3 m-3" border="white">
                <Link href="/authors/[author]" as={`/authors/${author.id}`}>
                  <div>
                    <Card.Img
                      role="button"
                      src={
                        author.image
                          ? author.image.replace(/%2F/gi, "/")
                          : "/author/default.png"
                      }
                      className="p-3"
                    />
                  </div>
                </Link>
                <Card.Body className="p-md-3">
                  <Link href="/authors/[author]" as={`/authors/${author.id}`}>
                    <Card.Title role="button" className="display-4">
                      {author.name}
                    </Card.Title>
                  </Link>
                  <Card.Text>{author.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Authors;