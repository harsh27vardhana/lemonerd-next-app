import React, { useEffect, useState } from "react";
import { Button, Alert, Form } from "react-bootstrap";

function Quicksplained() {
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [input, setInput] = useState({
    embed: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function handleClick(event) {
    event.preventDefault();
    setSubmitAttempt(true);
    if (input.embed) setValid(true);
  }

  useEffect(async () => {
    if (valid) {
      const res = await fetch(`/api/quickSplained`, {
        body: JSON.stringify(input),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          setInput({
            embed: "",
          });
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    }
  }, [valid]);
  return (
    <Form className="container py-5 my-5">
      <Alert
        show={submitted}
        variant="success"
        onClose={() => setSubmitted(false)}
        dismissible
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Quicksplained successfully added</p>
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
        <Form.Label>LINK</Form.Label>
        <Form.Control
          name="embed"
          placeholder="Paste the embed link here"
          value={input.embed}
          onChange={handleChange}
          required
          isInvalid={submitAttempt && !input.embed}
        />
        <Form.Control.Feedback type="invalid">
          This cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <Button onClick={handleClick}>Submit</Button>
    </Form>
  );
}

export default Quicksplained;
