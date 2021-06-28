import { Container, Card, Row, Col } from "react-bootstrap";
import ArticleCard from "../../components/articleCard";
import { server } from "../../config/config";
import Author from "../../data/authors.json";
import Image from "react-bootstrap/Image";

function Authors({ posts, author }) {
  const data = posts.data;
  const currentAuthor = Author.authors.find((item) => item.id === author);
  return (
    <Container className="mt-5 py-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center display-1">
            About Author
          </Card.Title>
          <Row className="justify-content-center">
            <Col xs={4} style={{ borderRadius: "50%" }}>
              <Image
                className="py-4"
                src={
                  currentAuthor.image
                    ? currentAuthor.image.replace(/%2F/gi, "/")
                    : "/author/default.png"
                }
                roundedCircle
              />
            </Col>
            <Col xs={12} className="text-center">
              <Card.Subtitle className="display-4">
                {currentAuthor.name}
              </Card.Subtitle>
              <Card.Text>{currentAuthor.description}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {data.map((item) =>
        item.author === author ? (
          <div className="p-3" key={item._id}>
            <ArticleCard {...item} />
          </div>
        ) : null
      )}
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { author } = context.query;
  const url = server + "/api/posts/";
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts, author },
  };
}

export default Authors;
