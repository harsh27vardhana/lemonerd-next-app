import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Tags from "../data/tags.json";
import Data from "../data/authors.json";
import { Badge } from "react-bootstrap";
const authors = Data.authors;
const category = Tags.categories;

function postform() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  function example_image_upload_handler(blobInfo, success, failure, progress) {
    var xhr, formData;
    // console.log("fjhf")
    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", "/api/images");
    xhr.setRequestHeader("Content-type", "application/json");

    // xhr.upload.onprogress = function (e) {
    //     progress(e.loaded / e.total * 100);
    // };

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

    // formData = new FormData();
    // formData.append('file', blobInfo.blob(), blobInfo.filename());
    // console.log(blobInfo.base64())
    const data = { data: blobInfo.base64(), filename: blobInfo.filename() };
    xhr.send(JSON.stringify(data));
  }
  const [activeCategory, setActiveCategory] = useState([]);
  const [availableCategory, setAvailableCategory] = useState(category);
  const [author, setAuthor] = useState("");
  return (
    <Form className="container">
      <Form.Group>
        <Form.Label>TITLE</Form.Label>
        <Form.Control type="text" placeholder="Enter the title of the blog" />
      </Form.Group>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {availableCategory.map((item) => (
              <Dropdown.Item
                onClick={() => {
                  setActiveCategory((oldArray) => [...oldArray, item]);
                  const newAvailableCategory = availableCategory.filter(
                    (element) => element.id !== item.id
                  );
                  setAvailableCategory(newAvailableCategory);
                }}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <p>
          {activeCategory.map((element) => (
            <span>
              <Badge
                pill
                variant="info"
                onClick={() => {
                  setAvailableCategory((oldArray) => [...oldArray, element]);
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
        </p>
      </Form.Group>
      <Form.Group>
        <Editor
          apiKey="tfdzlyaoyss9o0y1lrzoheoxrhpz8l7rfe0myrgrqra266fq"
          id="postcontent"
          init={{
            height: 500,
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
            // file_picker_callback: function (callback, value, meta) {
            //     console.log("flag");
            //     if (meta.filetype == 'image') {

            //         $('#upload').trigger('click');
            //         $('#upload').on('change', function () {
            //             var file = this.files[0];
            //             console.log(file);
            //             var reader = new FileReader();
            //             reader.onload = function (e) {
            //                 callback(e.target.result, {
            //                     alt: ''
            //                 });
            //             };
            //             reader.readAsDataURL(file);
            //         });
            //     }
            // }
          }}
        />
      </Form.Group>
      <Form.Group>
        <div>
          <Badge variant="warning">{author.name}</Badge>
        </div>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Author
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setAuthor("")}>Select</Dropdown.Item>
            <Dropdown.Divider />
            {authors.map((item) => (
              <Dropdown.Item onClick={() => setAuthor(item)}>
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control className="mb-2" type="text" placeholder="Password" />
      </Form.Group>
    </Form>
  );
}

export default postform;
