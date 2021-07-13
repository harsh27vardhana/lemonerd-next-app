import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Tabs,
  Tab,
  Modal,
  Alert,
} from "react-bootstrap";
import PostForm from "../components/postform";
import AuthorForm from "../components/authorForm";
import ArticleCard from "../components/articleCard";
import Quicksplained from "../components/quicksplainedform";
import { server } from "../config/config";
import { useAuth } from "../context/AuthContext";

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

function admin({ posts, authors }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  const data = posts.data;
  const [key, setKey] = useState("create");
  const [Blogs, setBlogs] = useState(data);
  const [confirmation, setConfirmation] = useState(false);

  async function getPosts() {
    const res = await fetch(`${server}/api/admin`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    }).then((result) => {
      result.json().then((resp) => {
        setBlogs(resp.data);
      });
    });
  }

  useEffect(async () => {
    getPosts();
  }, [confirmation, key]);

  useEffect(async () => {
    if (key !== "create") {
      setToUpdate({
        update: false,
        id: "",
      });
    }
  }, [key]);

  const [toUpdate, setToUpdate] = useState({
    update: false,
    id: "",
  });

  async function updatePost(blog) {
    setToUpdate({
      update: true,
      blog: blog,
    });
    setKey("create");
  }

  const [deleteId, setDeleteId] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  async function deletePost() {
    const res = await fetch(`${server}/api/admin/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((attempt) => {
        setDeleteSuccess(attempt.success);
        getPosts();
      });
  }

  async function hidePost(id) {
    const res = await fetch(`${server}/api/admin/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    });
    const result = await res.json();
    result.hidden = result.hidden === "false" ? "true" : "false";
    const response = await fetch(`${server}/api/admin/${id}`, {
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "PATCH",
    }).then(() => getPosts());
  }

  return (
    <div className="pt-5">
      <Head>
        <title>Admin | Lemonerd</title>
        <script
          async
          src="https://cse.google.com/cse.js?cx=d6ab724b223f8e2ef"
        ></script>
      </Head>
      <Modal
        show={confirmation}
        onHide={() => setConfirmation(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this post? You cannot undo the
          changes.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmation(false)}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletePost();
              setConfirmation(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="py-5 my-5 bg-white">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab eventKey="create" title="Create">
            <br />
            <PostForm {...{ toUpdate, authors }} />
          </Tab>
          <Tab eventKey="update" title="Update">
            <Container>
              <Alert
                show={deleteSuccess}
                variant="success"
                onClose={() => setDeleteSuccess(false)}
                dismissible
              >
                <Alert.Heading>Success!</Alert.Heading>
                <p>Post deleted successfully</p>
              </Alert>
              {Blogs.map((blog) => (
                <div className="p-3" key={blog._id}>
                  <Card>
                    <ArticleCard {...{ blog, authors }} />
                    <Row className="pt-2 text-center">
                      <Col>
                        <Button
                          className="px-md-5 py-1 mb-2 "
                          variant="primary"
                          onClick={() => updatePost(blog)}
                        >
                          Update
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="px-md-5 py-1 mb-2 "
                          variant="danger"
                          onClick={() => {
                            setDeleteId(blog._id);
                            setConfirmation(true);
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          className="px-md-5 py-1 mb-2 "
                          variant="warning"
                          onClick={() => hidePost(blog._id)}
                        >
                          {blog.hidden === "false" ? "HIDE" : "UNHIDE"}
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
          <tab eventKey="quicksplained" title="Link">
            <br />
            <Quicksplained />
          </tab>
        </Tabs>
      </Container>
    </div>
  );
}

export const getServerSideProps = async () => {
  const url = server + "/api/admin";
  const res = await fetch(url);
  const posts = await res.json();
  const author = await fetch(server + "/api/authors");
  const authorsJson = await author.json();
  const authors = authorsJson.data;
  return {
    props: { posts, authors },
  };
};

export default admin;
