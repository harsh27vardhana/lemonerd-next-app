import Form from "react-bootstrap/Form";
import { Button, Container, Card } from "react-bootstrap";
function Login() {
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
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit">
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
