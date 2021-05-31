import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

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
        xhr.open('POST', '/api/images');
        xhr.setRequestHeader('Content-type','application/json')

        // xhr.upload.onprogress = function (e) {
        //     progress(e.loaded / e.total * 100);
        // };

        xhr.onload = function () {
            var json;

            if (xhr.status === 403) {
                failure('HTTP Error: ' + xhr.status, { remove: true });
                return;
            }

            if (xhr.status < 200 || xhr.status >= 300) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }

            success(json.location);
        };

        xhr.onerror = function () {
            failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        // formData = new FormData();
        // formData.append('file', blobInfo.blob(), blobInfo.filename());
        // console.log(blobInfo.base64())
        const data = { data: blobInfo.base64(), filename: blobInfo.filename() };
        xhr.send(JSON.stringify(data));
    };
    return (
        <Form className="container">
            <Form.Group >
                <Form.Label>TITLE</Form.Label>
                <Form.Control  type="text" placeholder="Enter the title of the blog" />
                
            </Form.Group>
          
           

                <Editor
                apiKey='tfdzlyaoyss9o0y1lrzoheoxrhpz8l7rfe0myrgrqra266fq'
                id='postcontent'
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor image| alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        image_advtab: true,
                        // image_title: true,
                        automatic_uploads: true,
                        file_picker_types: 'image',
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
            <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control className="mb-2" type="text" placeholder="Password" />
            </Form.Group>
          
        </Form>
    )
}

export default postform
