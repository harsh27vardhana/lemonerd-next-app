import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
function Quicksplained() {
  return (
    <Form className="container py-5 my-5">
      <Form.Group>
        <Form.Label>LINK</Form.Label>
        <Form.Control />
      </Form.Group>
      <Button>Submit</Button>
    </Form>
  );
}

export default Quicksplained;
