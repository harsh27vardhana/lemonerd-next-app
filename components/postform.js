import React, { useEffect, useState } from "react";
import {
  Badge,
  Row,
  Button,
  Dropdown,
  Image,
  Alert,
  Form,
} from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { server } from "../config/config";
import { storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import Tags from "../data/tags.json";
const tags = Tags.categories;

function postform({ toUpdate, authors }) {
  /* Function to upload tinymce images to firebase storage */
  function example_image_upload_handler(blobInfo, success, failure, progress) {
    const filename = uuidv4() + Date.now() + blobInfo.filename();
    const uploadTask = storage.ref(`${filename}`).put(blobInfo.blob());
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error + "onupload fail");
        failure(error);
      },
      () => {
        storage
          .ref(filename)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            success(url);
          });
      }
    );
  }
  /* Function to upload tinymce images to firebase storage */

  /*--------------State Variables-------------------------*/
  const [activeTags, setActiveTags] = useState([]);
  const [availableTags, setAvailableTags] = useState(tags);
  const [author, setAuthor] = useState("");
  const [thumb, setThumb] = useState("");
  const [imageLabel, setImageLabel] = useState("");
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
    tags: activeTags,
    thumbnail: "",
    hidden: "false",
  });
  /*--------------State Variables-------------------------*/

  /* Function to associate a tag with the current blog */
  function updateActiveTags(item) {
    setActiveTags((oldArray) => [...oldArray, item]);
    const newAvailableTags = availableTags.filter(
      (element) => element !== item
    );
    setAvailableTags(newAvailableTags);
  }
  /* Function to associate a tag with the current blog */

  /* Function to remove an associated tag from the current blog */
  function updateAvailableTags(item) {
    setAvailableTags((oldArray) => [...oldArray, item]);
    const newActiveTags = activeTags.filter((element) => element !== item);
    setActiveTags(newActiveTags);
  }
  /* Function to remove an associated tag from the current blog */

  /* Function to reset the form to it's initial/empty state */
  function resetForm() {
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
    setInput(newInput);
    setThumb("");
    setAuthor("");
    setActiveTags([]);
    setAvailableTags(tags);
    if (typeof tinymce !== "undefined" && tinymce !== null) {
      tinymce.activeEditor.setContent("");
    }
  }
  /* Function to reset the form to it's initial/empty state */

  /* Function to set data of the blog to be updated else set it empty */
  async function getPostToUpdate() {
    if (toUpdate.update) {
      const result = toUpdate.blog;
      result.date = result.date.substring(0, 10);
      setSubmitted(false);
      setInput(result);
      setThumb(result.thumbnail);
      setImageLabel(result.thumbnail);
      setAuthor(authors.find(({ _id }) => _id === result.author));
      setActiveTags(result.tags);
      const newAvailableTags = availableTags.filter(
        (tag) => !result.tags.includes(tag)
      );
      setAvailableTags(newAvailableTags);
      if (typeof tinymce !== "undefined" && tinymce !== null) {
        tinymce.activeEditor.setContent(result.content);
      }
    } else {
      setSubmitted(false);
      resetForm();
    }
  }
  /* Function to set data of the blog to be updated else set it empty */

  /* Side effect to be executed whenever the toupdate prop changes */
  useEffect(async () => {
    getPostToUpdate();
  }, [toUpdate]);
  /* Side effect to be executed whenever the toupdate prop changes */

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

  /* Function to upload thumbnail image to firebase storage */
  function uploadThunbnail(event, response) {
    let file = event.target.files[0];
    const filename = Date.now() + file.name;
    setImageLabel(filename);
    const uploadTask = storage.ref(`thumbnails/${filename}`).put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("thumbnails")
          .child(filename)
          .getDownloadURL()
          .then((url) => setThumb(url));
      }
    );
  }
  /* Function to upload thumbnail image to firebase storage */

  /* Function to be executed when Submit/Update button is clicked */
  async function handleClick(event) {
    event.preventDefault();
    setSubmitAttempt(true);
    const newInput = {
      title: input.title,
      caption: input.caption,
      author: author._id,
      content: tinymce.get("postcontent").getContent(),
      date: input.date,
      tags: activeTags,
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
  /* Function to be executed when Submit/Update button is clicked */

  /* Side effect to be executed whenever submit/update attempt is made and inputs are valid */
  useEffect(async () => {
    if (toUpdate.update && valid) {
      const res = await fetch(`${server}/api/admin/${toUpdate.blog._id}`, {
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          resetForm();
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    } else if (valid) {
      const res = await fetch(`${server}/api/admin`, {
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => response.json())
        .then((attempt) => {
          attempt.success ? setSubmitted(true) : setErrorSubmit(true);
          resetForm();
          setSubmitAttempt(false);
          window.scrollTo(0, 0);
        });
    }
  }, [valid]);
  /* Side effect to be executed whenever submit/update attempt is made and inputs are valid */

  return (
    <Form className="container">
      <Alert
        show={submitted}
        variant="success"
        onClose={() => setSubmitted(false)}
        dismissible
      >
        <Alert.Heading>Success!</Alert.Heading>
        <p>
          Your blog was successfully {toUpdate.update ? "updated" : "posted"}
        </p>
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
          src={thumb ? thumb : "/thumbnail/default.png"}
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
          label={thumb ? imageLabel : "Upload File here"}
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
          <Dropdown.Toggle variant="success">Tags</Dropdown.Toggle>

          <Dropdown.Menu>
            {availableTags.sort().map((tag) => (
              <Dropdown.Item key={tag} onClick={() => updateActiveTags(tag)}>
                {tag}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {submitAttempt && !activeTags.length ? (
          <span className="text-danger">
            Please select the categories of the blog
          </span>
        ) : null}
        <br />
        <div>
          <h5>
            {activeTags.length > 0 &&
              activeTags.map((tag) => (
                <span key={tag}>
                  <Badge
                    pill
                    role="button"
                    variant="info"
                    onClick={() => updateAvailableTags(tag)}
                  >
                    {tag}
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
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
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
          <Badge variant="warning">{author ? author.name : null}</Badge>
        </div>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="success">Author</Dropdown.Toggle>

          <Dropdown.Menu style={{ height: "25rem", overflowY: "scroll" }}>
            <Dropdown.Item onClick={() => setAuthor("")}>Select</Dropdown.Item>
            <Dropdown.Divider />
            {authors.map((item) => (
              <Dropdown.Item key={item._id} onClick={() => setAuthor(item)}>
                <Row className="justify-content-between align-items-center">
                  {item.name}
                  &ensp; &ensp;
                  <div
                    className="circular-img"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundImage: `url("${item.image}")`,
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
        {toUpdate.update ? "Update" : "Post"}
      </Button>
    </Form>
  );
}

export default postform;
