import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function AuthorForm() {
  return (
    <Form className="container">
      <Form.Group>
        <Form.Label>NAME</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter the name of author"
          //   value={input.title}
          //   onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>DESCRIPTION</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="name"
          placeholder="Enter the name of author"
          //   value={input.title}
          //   onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>IMAGE</Form.Label>
        <Form.File
          id="authorImage"
          label="Upload Image here"
          type="file"
          custom
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default AuthorForm;
