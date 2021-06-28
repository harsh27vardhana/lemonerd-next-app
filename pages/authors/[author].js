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
          <Row>
            <Col lg={3} md={4} sm={12} className="my-auto">
              <div className="d-flex justify-content-center">
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={
                      currentAuthor
                        ? currentAuthor.image.replace(/%2F/gi, "/")
                        : "/author/default.png"
                    }
                    style={{
                      minWidth: "100%",
                      minHeight: "100%",
                      width: "auto",
                      height: "auto",
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col lg={9} md={8} sm={12}>
              <h1>{currentAuthor ? currentAuthor.name : null} </h1>
              <hr />
              <Card.Text>
                {currentAuthor ? currentAuthor.description : null}
              </Card.Text>
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
