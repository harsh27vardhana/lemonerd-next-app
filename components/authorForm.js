import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

function AuthorForm() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
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

  const [image, setImage] = useState("");

  function uploadThunbnail(event, response) {
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = async (e) => {
      var img = e.target.result;
      var img_data = img.replace(/^data:image\/\w+;base64,/, "");
      console.log(file.name);

      // const res = await fetch("api/images/thumbnail", {
      //   body: JSON.stringify({ data: img_data, filename: file.name }),
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   method: "POST",
      // });

      // const result = await res.json();

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
    // const res = await fetch("/api/posts", {
    //   body: JSON.stringify(newInput),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    // const result = await res.json();
    // console.log(result);
  }

  return (
    <Form className="container">
      <Form.Group>
        <Form.Label>NAME</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter the name of author"
          value={input.name}
          onChange={handleChange}
        />
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
      <div className="jsutify-content-center">
        {image ? (
          <Image
            src={image.location.replace(/%2F/gi, "/")}
            width="500px"
            height="500px"
            thumbnail
          />
        ) : null}
        <br />
      </div>
      <Button type="submit" onClick={handleClick}>
        Submit form
      </Button>
    </Form>
  );
}

export default AuthorForm;
