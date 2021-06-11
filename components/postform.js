import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Tags from "../data/tags.json";
import Data from "../data/authors.json";
import { Badge } from "react-bootstrap";
import Image from 'next/image'
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
    console.log(blobInfo.base64())
    const data = { data: blobInfo.base64(), filename: blobInfo.filename() };
    xhr.send(JSON.stringify(data));
  }

  const [activeCategory, setActiveCategory] = useState([]);
  const [availableCategory, setAvailableCategory] = useState(category);
  const [author, setAuthor] = useState("");

  const [input, setInput] = useState({
    title: "",
    caption: "",
    author: author,
    content: "",
    date: "",
    tags: activeCategory,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };


  let thumbnailsrc='/';
  var thumbnailwidth = 50;
  var thumbnailheight = 50;

  function uploadThunbnail(event,response) {

    let file = event.target.files[0];
    // console.log(file); 
    // let img=URL.createObjectURL(file);
    // console.log(img);
    var reader = new FileReader();
    // console.log(reader);
    reader.onload = async (e) => {
      // The file's text will be printed here
      // console.log(e.target.result);
      var img = e.target.result;
      var img_data = img.replace(/^data:image\/\w+;base64,/, "");
      console.log(file.name);

      const res = await fetch("api/images/thumbnail", {
        body: JSON.stringify({ data: img_data, filename: file.name }),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST"
      })

      const result = await res.json();
      console.log(result);
      Image.get('thumbnailimg').setContent({src:result.location})
      thumbnailwidth = 50;
      thumbnailheight = 50;
    };
    reader.readAsDataURL(file);
    // // reader.setReady(true);


  };







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
    };
    setInput(newInput);
    // console.log(newInput);
    const res = await fetch("/api/posts", {
      body: JSON.stringify(newInput),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
    // console.log(result);
  }
  return (
    <Form className="container">
      <Form.Group>
        <Form.Label>POST DATE</Form.Label>
        <Form.Control
          id="date"
          label="Post date"
          type="date"
          name="date"
          value={input.date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>TITLE</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter the title of the blog"
          value={input.title}
          onChange={handleChange}
        />
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>THUMBNAIL</Form.Label>
        <Form.File id="Thumbnail" onChange={uploadThunbnail} label="Upload File here" type="file" custom />
        
        {/* <Image 
          id='thumbnailimg'
          src={thumbnailsrc}
          width={thumbnailwidth}
          height={thumbnailheight}
          style={{display:'none'}}
        /> */}
      </Form.Group>
      <Form.Group>
        <Dropdown>
          <Dropdown.Toggle variant="success">Category</Dropdown.Toggle>

          <Dropdown.Menu>
            {availableCategory.map((item) => (
              <Dropdown.Item
                key={item.id}
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
        <div>
          {activeCategory.length > 0 &&
            activeCategory.map((element) => (
              <span key={element.id}>
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
        </div>
      </Form.Group>
      <Form.Group>
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
      </Form.Group>
      <Button type="submit" onClick={handleClick}>
        Submit form
      </Button>
    </Form>
  );
}

export default postform;
