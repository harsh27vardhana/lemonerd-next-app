import Form from "../components/postform";
import AuthorForm from "../components/authorForm";
import ArticleCard from "../components/articleCard";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { server } from "../config/config";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useState } from "react";

function admin({ posts }) {
  const data = posts.data;
  const [key, setKey] = useState("create");

  async function deletePost(id) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
  }

  async function hidePost(id) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    console.log(result);
  }

  return (
    <div className="pt-5">
      <Container className="py-5 my-5" style={{ backgroundColor: "white" }}>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="create" title="Create Post">
            <br />
            <Form />
          </Tab>
          <Tab eventKey="update" title="Update Posts">
            <Container>
              {data.map((element) => (
                <div className="p-3" key={element._id}>
                  <Card>
                    <ArticleCard {...element} />
                    <Row className="pt-2 text-center">
                      <Col>
                        <Button className="px-5 py-1 mb-2 " variant="primary">
                          Update
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="px-5 py-1 mb-2 "
                          variant="danger"
                          onClick={() => deletePost(element._id)}
                        >
                          Delete
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="px-5 py-1 mb-2 "
                          variant="warning"
                          onClick={() => hidePost(element._id)}
                        >
                          Hide
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ))}
            </Container>
          </Tab>
          <Tab eventKey="author" title="Create Author">
            <br />
            <AuthorForm />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export const getStaticProps = async () => {
  const url = server + "/api/admin";
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: { posts },
  };
};

export default admin;
