import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Tags from "../data/tags.json";
import Data from "../data/authors.json";
import { Badge } from "react-bootstrap";
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
      (element) => element.id !== item.id
    );
    setAvailableCategory(newAvailableCategory);
  }

  async function getPostToUpdate() {
    const res = await fetch(`/api/posts/${props.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const result = await res.json();
    result.date = result.date.substring(0, 10);
    console.log(result);
    setInput(result);
    setThumb(result.thumbnail);
    setAuthor(authors.find(({ name }) => name === result.author));
    availableCategory.forEach((item) =>
      item.name === result.tags.find((element) => element === item.name)
        ? updateActiveCategory(item)
        : null
    );
    tinyMCE.activeEditor.setContent(result.content);
  }

  useEffect(() => {
    props.update && getPostToUpdate();
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
      console.log(result);
      setThumb(result.location);
      // Image.get('thumbnailimg').setContent({src:result.location})
      // thumbnailwidth = 50;
      // thumbnailheight = 50;
    };
    reader.readAsDataURL(file);
  }

  async function handleClick(event) {
    event.preventDefault();
    const tagName = activeCategory.map((item) => item.name);
    const newInput = {
      title: input.title,
      caption: input.caption,
      author: author.name,
      content: tinymce.get("postcontent").getContent(),
      date: input.date,
      tags: tagName,
      thumbnail: thumb,
      hidden: input.hidden,
    };
    setInput(newInput);
    if (props.update) {
      const res = await fetch(`/api/posts/${props.id}`, {
        body: JSON.stringify(newInput),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      });
    } else {
      const res = await fetch("/api/admin", {
        body: JSON.stringify(newInput),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    }
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
    setSubmitted(true);
  }
  return (
    <Form className="container">
      <Alert show={submitted && valid} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>Your blog was successfully {props.update ? "updated" : "posted"}</p>
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
          isInvalid={submitted && !input.date}
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
          isInvalid={submitted && !input.title}
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
          isInvalid={submitted && !input.caption}
        />
        <Form.Control.Feedback type="invalid">
          The caption cannot be left blank.
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-center">
        <Image
          src={thumb ? thumb.replace(/%2F/gi, "/") : "/thumbnail/default.png"}
          height="500px"
          width="500px"
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
          isInvalid={submitted && !thumb}
        />
        {submitted && !thumb ? (
          <span className="text-danger">Please select the thumbnail</span>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="success">Category</Dropdown.Toggle>

          <Dropdown.Menu>
            {availableCategory.map((item) => (
              <Dropdown.Item
                key={item.id}
                onClick={() => updateActiveCategory(item)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {submitted && !activeCategory.length ? (
          <span className="text-danger">
            Please select the categories of the blog
          </span>
        ) : null}
        <br />
        <div>
          <h5>
            {activeCategory.length > 0 &&
              activeCategory.map((element) => (
                <span key={element.id}>
                  <Badge
                    pill
                    variant="info"
                    onClick={() => {
                      setAvailableCategory((oldArray) => [
                        ...oldArray,
                        element,
                      ]);
                      const newActiveCategory = activeCategory.filter(
                        (item) => item.id !== element.id
                      );
                      setActiveCategory(newActiveCategory);
                    }}
                  >
                    {element.name}
                  </Badge>{" "}
                </span>
              ))}
          </h5>
        </div>
      </Form.Group>
      <Form.Group>
        {submitted && !tinymce.get("postcontent").getContent() ? (
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
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {submitted && !author.name ? (
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
