import Form from "react-bootstrap/Form";
import { Button, Container, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useRef, useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/router";

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    return <Redirect to="/admin" />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      setLoading(true);
      login(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error);
      setError("Failed to signin");
    }

    setLoading(false);
  }
  return (
    <div className="mt-5 pt-5">
      <Container>
        <div className="d-flex justify-content-center py-5 px-md-5 my-5 mx-md-5">
          <Card style={{ width: "600px" }} className="py-5 px-md-5">
            <Card.Body>
              <Card.Title className="display-4">
                <strong>Login</strong>
              </Card.Title>
              <br />
              {error && <Alert variant="danger">{error}</Alert>}
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    disabled={loading}
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
