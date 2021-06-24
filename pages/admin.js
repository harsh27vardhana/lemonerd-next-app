import Form from "../components/postform";
import AuthorForm from "../components/authorForm";
import ArticleCard from "../components/articleCard";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { server } from "../config/config";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function admin({ posts }) {
  const data = posts.data;
  const [key, setKey] = useState("create");

  const [Blogs, setBlogs] = useState(data);

  async function getPosts() {
    const res = await fetch("/api/admin", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp.data);
        setBlogs(resp.data);
      });
    });
  }

  const [toUpdate, setToUpdate] = useState({
    update: false,
    id: "",
  });

  async function updatePost(id) {
    setToUpdate({
      update: true,
      id: id,
    });
    setKey("create");
  }

  async function deletePost(id) {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => getPosts());
  }

  async function hidePost(id) {
    const res = await fetch(`/api/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const result = await res.json();
    result.hidden = result.hidden === "false" ? "true" : "false";
    const response = await fetch(`/api/posts/${id}`, {
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    }).then(() => getPosts());
  }

  return (
    <div className="pt-5">
      <Container className="py-5 my-5 bg-white">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="create" title="Create">
            <br />
            <Form {...toUpdate} />
          </Tab>
          <Tab eventKey="update" title="Update">
            <Container>
              {Blogs.map((element) => (
                <div className="p-3" key={element._id}>
                  <Card>
                    <ArticleCard {...element} />
                    <Row className="pt-2 text-center">
                      <Col>
                        <Button
                          className="px-5 py-1 mb-2 "
                          variant="primary"
                          onClick={() => updatePost(element._id)}
                        >
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
                          {element.hidden === "false" ? "HIDE" : "UNHIDE"}
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </div>
              ))}
            </Container>
          </Tab>
          <Tab eventKey="author" title="Author">
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
