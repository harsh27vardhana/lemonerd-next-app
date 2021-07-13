import { useEffect, useState } from "react";
import { Form, Button, Image, Alert } from "react-bootstrap";
import { storage } from "../config/firebase";

function AuthorForm() {
  /*--------------State Variables-------------------------*/
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [image, setImage] = useState("");
  const [imageLabel, setImageLabel] = useState("");
  /*--------------State Variables-------------------------*/

  /* Function to handle change in any of the form inputs */
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  /* Function to handle change in any of the form inputs */

  /* Function to upload author image to firebase storage */
  function uploadAuthorImage(event, response) {
    let file = event.target.files[0];
    const filename = Date.now() + file.name;
    setImageLabel(filename);
    const uploadTask = storage.ref(`authors/${filename}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("authors")
          .child(filename)
          .getDownloadURL()
          .then((url) => setImage(url));
      }
    );
  }
  /* Function to upload author image to firebase storage */

  /* Function to be executed when Submit button is clicked */
  async function handleClick(event) {
    event.preventDefault();
    setSubmitAttempt(true);
    const newInput = {
      name: input.name,
      description: input.description,
      image: image,
    };

    if (newInput.name && newInput.image && newInput.description) setValid(true);
    setInput(newInput);
  }
  /* Function to be executed when Submit button is clicked */

  /* Side effect to be executed whenever submit attempt is made and inputs are valid */
  useEffect(async () => {
    if (valid) {
      const res = await fetch(`/api/authors`, {
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          setInput({
            name: "",
            description: "",
            image: "",
          });
          setImage("");
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    }
  }, [valid]);
  /* Side effect to be executed whenever submit attempt is made and inputs are valid */

  return (
    <Form className="container">
      <Alert
        show={submitted}
        variant="success"
        onClose={() => setSubmitted(false)}
        dismissible
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Author successfully added</p>
      </Alert>
      <Alert
        show={errorSubmit}
        variant="danger"
        onClose={() => setErrorSubmit(false)}
        dismissible
      >
        <Alert.Heading>OOPS!!</Alert.Heading>
        <p>Something went wrong.</p>
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
          isInvalid={submitAttempt && !input.name}
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
          isInvalid={submitAttempt && !input.description}
        />
        <Form.Control.Feedback type="invalid">
          Description cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-center">
        <Image
          src={image ? image : "/author/default.png"}
          width="300px"
          height="300px"
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
          label={image ? imageLabel : "Upload Image here"}
          type="file"
          custom
          required
          isInvalid={submitAttempt && !image}
        />
        {submitAttempt && !image ? (
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
