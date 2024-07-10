import React, { useState, useRef , useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../css/addPost.css";
import { LuPlus } from "react-icons/lu";
import IconImg from "../assets/Images/icon.jpg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDropzone } from 'react-dropzone';
import { CredentialContext } from './CredentialContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
  </div>
);

const Index = () => {
  const { credential } = useContext(CredentialContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const quillRef = useRef(null);

  const [featuredImg, setFeaturedImg] = useState("");  
  const [title, setTitle] = useState("");   
  const [metaDescription,setMetaDescription] = useState("");  
  const [category, setCategory] = useState("");  
  const [views, setViews] = useState(0);  
  const [content, setContent] = useState("");  

  const navigate = useNavigate();

  const handleImageClick = () => {
    // Trigger file input click
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    // Handle file selection logic here
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFeaturedImg(reader.result);
    };
    reader.readAsDataURL(file);
    console.log("Selected file:", file);
  }
    // You can add further logic here to handle the selected file  

  const handleImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.onload = () => {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', reader.result);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => handleImage(acceptedFiles),
  });

  const fileInputRef = useRef(null);

  const handleData = async () =>{

    const postData = {
      title,
      category,
      content,
      featuredImg,
      metaDescription,
      views,
      credential
    };

    try {
      const response = await axios.post('http://localhost:3000/addpost', postData);
      console.log('Post created successfully:', response.data);
      // Redirect or show success message
      alert('Post created successfully');
      navigate('/adminpost'); // Redirect to admin dashboard or another page after success
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#" style={{ color: "red", fontWeight: 600 }}>
            <Link to="/" style={{ textDecoration: "none", color: "red" }}>Pak Blog</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <button onClick={handleData} style={{ padding: "10px", width: "120px", border: "none", backgroundColor: "rgb(27, 95, 214)", color: "white", borderRadius: "10px" }}>
                  <Link to="#" style={{ textDecoration: "none", color: "white" }}>Publish</Link>
                </button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /><br />
      <Container>
        <Row className='input-row'>
          <Col>
            <input type="text" onChange={(e)=>{setTitle(e.target.value); }} placeholder='Title'></input>
          </Col>
          <Col>
            <select onChange={(e)=>{setCategory(e.target.value);}} name="categories" id="cat">
              <option value="" disabled defaultValue>Select a category</option>
              <option value="Gaming">Gaming</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Cars">Cars</option>
            </select>
            <Button style={{ marginLeft: "20px", padding: "10px" }} variant="primary" onClick={handleShow}>
              <LuPlus /> Category
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={6} className='input-row'>
              <textarea  onChange={(e)=>{setMetaDescription(e.target.value); }} placeholder='Meta description'></textarea>
          </Col>
        </Row>
        <br /><br />
        <Row className='featured-img-row'>
          <Col>
            <p>Featured Image</p>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <img
              src={featuredImg ? featuredImg : IconImg}
              alt="no image"
              style={{ cursor: 'pointer', width: "200px", height : "200px" }}
              onClick={handleImageClick}
            />
          </Col>
        </Row>
        <br /><br />
        <Row>
          <Col>
            <div className='rich-text-editor'>
              <CustomToolbar />
              <ReactQuill
                ref={quillRef}
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Compose something amazing..."
              />
            </div>
          </Col>
        </Row>
        
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body><input type="text" placeholder='Title'></input></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// Quill Modules
const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      image: function () {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = () => {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            const quill = this.quill;
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', e.target.result);
          };
          reader.readAsDataURL(file);
        };
      },
    },
  },
};

// Quill Formats
const formats = [
  'header', 'bold', 'italic', 'underline', 'link', 'image',
];

export default Index;
