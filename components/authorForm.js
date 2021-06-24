import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

function AuthorForm() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const [image, setImage] = useState("");

  function uploadAuthorImage(event, response) {
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = async (e) => {
      var img = e.target.result;
      var img_data = img.replace(/^data:image\/\w+;base64,/, "");
      console.log(file.name);

      const res = await fetch("api/images/author", {
        body: JSON.stringify({ data: img_data, filename: file.name }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });

      const result = await res.json();

      setImage(result);
      // console.log(result);
    };
    reader.readAsDataURL(file);
  }

  async function handleClick(event) {
    event.preventDefault();
    const newInput = {
      name: input.name,
      description: input.description,
      image: image.location,
    };
    setInput(newInput);
    console.log(newInput);
    const res = await fetch("/api/authors", {
      body: JSON.stringify(newInput),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (newInput.name && newInput.image && newInput.description) setValid(true);
    setSubmitted(true);
  }

  return (
    <Form className="container">
      <Alert show={submitted && valid} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>Author successfully added</p>
      </Alert>
      <Form.Group>
        <Form.Label>NAME</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter the name of author"
          value={input.name}
          onChange={handleChange}
          required
          isInvalid={submitted && !input.name}
        />
        <Form.Control.Feedback type="invalid">
          Author name cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>DESCRIPTION</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Describe the author"
          value={input.description}
          onChange={handleChange}
          required
          isInvalid={submitted && !input.description}
        />
        <Form.Control.Feedback type="invalid">
          Description cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-center">
        <Image
          src={
            image ? image.location.replace(/%2F/gi, "/") : "/author/default.png"
          }
          width="500px"
          height="500px"
          thumbnail
        />
        <br />
        <br />
      </div>
      <Form.Group>
        <Form.Label>IMAGE</Form.Label>
        <Form.File
          id="authorImage"
          onChange={uploadAuthorImage}
          label={
            image ? image.location.replace(/%2F/gi, "/") : "Upload Image here"
          }
          type="file"
          custom
          required
          isInvalid={submitted && !image}
        />
        {submitted && !image ? (
          <span className="text-danger">Please select author image</span>
        ) : null}
      </Form.Group>
      <Button type="submit" onClick={handleClick}>
        Submit form
      </Button>
    </Form>
  );
}

export default AuthorForm;
