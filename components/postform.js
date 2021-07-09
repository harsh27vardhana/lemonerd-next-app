import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Tags from "../data/tags.json";
import Data from "../data/authors.json";
import { Badge, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
const authors = Data.authors;
const category = Tags.categories;

function postform(props) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function example_image_upload_handler(blobInfo, success, failure, progress) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "/api/images");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onload = function () {
      var json;

      if (xhr.status === 403) {
        failure("HTTP Error: " + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure("HTTP Error: " + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != "string") {
        failure("Invalid JSON: " + xhr.responseText);
        return;
      }

      success(json.location);
    };

    xhr.onerror = function () {
      failure(
        "Image upload failed due to a XHR Transport error. Code: " + xhr.status
      );
    };

    console.log(blobInfo.base64());
    const data = { data: blobInfo.base64(), filename: blobInfo.filename() };
    xhr.send(JSON.stringify(data));
  }

  const [activeCategory, setActiveCategory] = useState([]);
  const [availableCategory, setAvailableCategory] = useState(category);
  const [author, setAuthor] = useState("");
  const [thumb, setThumb] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);

  const [input, setInput] = useState({
    title: "",
    caption: "",
    author: author,
    content: "",
    date: "",
    tags: activeCategory,
    thumbnail: "",
    hidden: "false",
  });

  function updateActiveCategory(item) {
    setActiveCategory((oldArray) => [...oldArray, item]);
    const newAvailableCategory = availableCategory.filter(
      (element) => element !== item
    );
    setAvailableCategory(newAvailableCategory);
  }

  async function getPostToUpdate() {
    const res = await fetch(`/api/admin/${props.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const result = await res.json();
    // console.log(result);
    props.update ? (result.date = result.date.substring(0, 10)) : null;
    setSubmitted(false);
    const newInput = {
      title: "",
      caption: "",
      author: "",
      content: "",
      date: "",
      tags: "",
      thumbnail: "",
      hidden: "false",
    };
    props.update ? setInput(result) : setInput(newInput);
    props.update ? setThumb(result.thumbnail) : setThumb("");
    props.update
      ? setAuthor(authors.find(({ id }) => id === result.author))
      : setAuthor("");
    props.update ? setActiveCategory(result.tags) : setActiveCategory([]);
    const newAvailableCategory = props.update
      ? availableCategory.filter((tag) => !result.tags.includes(tag))
      : null;
    props.update
      ? setAvailableCategory(newAvailableCategory)
      : setAvailableCategory(category);
    if (typeof tinymce !== "undefined" && tinymce !== null) {
      props.update
        ? tinymce.activeEditor.setContent(result.content)
        : tinymce.activeEditor.setContent(" ");
    }
  }

  useEffect(() => {
    getPostToUpdate();
  }, [props]);

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function uploadThunbnail(event, response) {
    let file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = async (e) => {
      var img = e.target.result;
      var img_data = img.replace(/^data:image\/\w+;base64,/, "");
      console.log(event.target.files[0].height);

      const res = await fetch("api/images/thumbnail", {
        body: JSON.stringify({ data: img_data, filename: file.name }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });

      const result = await res.json();
      // console.log(result);
      setThumb(result.location);
    };
    reader.readAsDataURL(file);
  }

  async function handleClick(event) {
    event.preventDefault();
    setSubmitAttempt(true);
    const newInput = {
      title: input.title,
      caption: input.caption,
      author: author.id,
      content: tinymce.get("postcontent").getContent(),
      date: input.date,
      tags: activeCategory,
      thumbnail: thumb,
      hidden: input.hidden,
    };
    if (
      newInput.title &&
      newInput.caption &&
      newInput.author &&
      newInput.content &&
      newInput.date &&
      newInput.tags &&
      newInput.thumbnail
    )
      setValid(true);
    setInput(newInput);
  }

  useEffect(async () => {
    // console.log(input);
    // console.log(valid);
    if (props.update && valid) {
      const res = await fetch(`/api/admin/${props.id}`, {
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          setActiveCategory([]);
          setAvailableCategory(category);
          setAuthor("");
          setThumb("");
          tinymce.get("postcontent").setContent("");
          const newInput = {
            title: "",
            caption: "",
            author: author,
            content: "",
            date: "",
            tags: activeCategory,
            thumbnail: "",
            hidden: "false",
          };
          setInput(newInput);
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    } else if (valid) {
      const res = await fetch("/api/admin", {
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          setActiveCategory([]);
          setAvailableCategory(category);
          setAuthor("");
          setThumb("");
          tinymce.get("postcontent").setContent("");
          const newInput = {
            title: "",
            caption: "",
            author: author,
            content: "",
            date: "",
            tags: activeCategory,
            thumbnail: "",
            hidden: "false",
          };
          setInput(newInput);
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    }
  }, [valid]);
  return (
    <Form className="container">
      <Alert
        show={submitted}
        variant="success"
        onClose={() => setSubmitted(false)}
        dismissible
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>Your blog was successfully {props.update ? "updated" : "posted"}</p>
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
        <Form.Label>POST DATE</Form.Label>
        <Form.Control
          id="date"
          label="Post date"
          type="date"
          name="date"
          value={input.date}
          onChange={handleChange}
          required
          isInvalid={submitAttempt && !input.date}
        />
        <Form.Control.Feedback type="invalid">
          Please choose the post date.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>TITLE</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter the title of the blog"
          value={input.title}
          onChange={handleChange}
          required
          isInvalid={submitAttempt && !input.title}
        />
        <Form.Control.Feedback type="invalid">
          The title cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>CAPTION</Form.Label>
        <Form.Control
          name="caption"
          as="textarea"
          rows={3}
          placeholder="Write a caption for the blog"
          value={input.caption}
          onChange={handleChange}
          required
          isInvalid={submitAttempt && !input.caption}
        />
        <Form.Control.Feedback type="invalid">
          The caption cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-center">
        <Image
          src={thumb ? thumb.replace(/%2F/gi, "/") : "/thumbnail/default.png"}
          height="300px"
          width="300px"
          thumbnail
        />
        <br />
        <br />
      </div>
      <Form.Group>
        <Form.Label>THUMBNAIL</Form.Label>
        <Form.File
          id="Thumbnail"
          onChange={uploadThunbnail}
          label={thumb ? thumb.replace(/%2F/gi, "/") : "Upload File here"}
          type="file"
          custom
          required
          isInvalid={submitAttempt && !thumb}
        />
        {submitAttempt && !thumb ? (
          <span className="text-danger">Please select the thumbnail</span>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="success">Category</Dropdown.Toggle>

          <Dropdown.Menu>
            {availableCategory.map((item) => (
              <Dropdown.Item
                key={item}
                onClick={() => updateActiveCategory(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {submitAttempt && !activeCategory.length ? (
          <span className="text-danger">
            Please select the categories of the blog
          </span>
        ) : null}
        <br />
        <div>
          <h5>
            {activeCategory.length > 0 &&
              activeCategory.map((element) => (
                <span key={element}>
                  <Badge
                    pill
                    role="button"
                    variant="info"
                    onClick={() => {
                      setAvailableCategory((oldArray) => [
                        ...oldArray,
                        element,
                      ]);
                      const newActiveCategory = activeCategory.filter(
                        (item) => item !== element
                      );
                      setActiveCategory(newActiveCategory);
                    }}
                  >
                    {element}
                  </Badge>{" "}
                </span>
              ))}
          </h5>
        </div>
      </Form.Group>
      <Form.Group>
        {submitAttempt && !tinymce.get("postcontent").getContent() ? (
          <Alert variant="danger">You cannot post an empty blog</Alert>
        ) : null}
        <Editor
          apiKey="tfdzlyaoyss9o0y1lrzoheoxrhpz8l7rfe0myrgrqra266fq"
          id="postcontent"
          init={{
            height: 500,
            force_br_newlines: true,
            force_p_newlines: true,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor image| alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            image_advtab: true,
            // image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            // images_upload_url: '/api/images',
            images_upload_handler: example_image_upload_handler,
            images_upload_base_path: "/",
          }}
        />
      </Form.Group>
      <Form.Group>
        <div>
          <Badge variant="warning">{author.name}</Badge>
        </div>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="success">Author</Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAuthor("")}>Select</Dropdown.Item>
            <Dropdown.Divider />
            {authors.map((item) => (
              <Dropdown.Item key={item.id} onClick={() => setAuthor(item)}>
                <Row className="justify-content-between align-items-center">
                  {item.name}
                  &ensp; &ensp;
                  <div
                    className="circular-img"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundImage: `url(${item.image.replace(
                        /%2F/gi,
                        "/"
                      )})`,
                    }}
                  />
                </Row>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {submitAttempt && !author.name ? (
          <span className="text-danger">Please select the author</span>
        ) : null}
      </Form.Group>
      <Button type="submit" onClick={handleClick}>
        {props.update ? "Update" : "Post"}
      </Button>
    </Form>
  );
}

export default postform;
