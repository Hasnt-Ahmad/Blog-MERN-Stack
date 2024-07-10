import "../css/adminPanel.css";
import { RxDashboard } from "react-icons/rx";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";
import SideBar from "./adminSideBar";
import { Container, Row, Col } from 'react-bootstrap';
import AdminNavBar from "./adminNavBar.jsx";
import { useState,useContext ,useEffect } from 'react';
import { CredentialContext } from './CredentialContext';
import { useLocation } from "react-router-dom";
import "../css/adminPanel.css";
import axios from "axios";
import React from 'react';
import imageProcessing from "../assets/Images/image_processing.png";


const Index= () =>{

    const { handleLogout, credential } = useContext(CredentialContext);

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const todayDate=new Date()
    const date = todayDate.getDate();
    const month = todayDate.getMonth() + 1;
    const year = todayDate.getFullYear();

    const [reqPostData, setReqPostData] = useState([]);
    const [credentials, setCredentials] = useState([]);

    
    useEffect(() => {
        const handleSubmit = async () => {
            if (credential) {
                try {
                    const response = await axios.get('http://localhost:3000/post', {
                        params: { 
                            iss: credential.iss,
                            sub: credential.sub,
                            email: credential.email
                        }
                    });
                    setReqPostData(response.data);
                } catch (error) {
                    console.error('Error fetching posts:', error.response ? error.response.data : error.message);
                }
            } else {
                console.error('No credentials available to fetch posts.');
            }
        };

        handleSubmit();
    }, [credential]);

      const deletePost = async (postId) => {
        try {
            if (confirm("Are you sure you want to delete!") == true){
                const response = await axios.delete(`http://localhost:3000/post/${postId}`);
                alert("Post Deleted");
                setReqPostData(prevData => prevData.filter(post => post._id !== postId)); 
            }
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
    

    
    return(
        <>

            <Container fluid >
                <Row>
                    <AdminNavBar  sidebarVisible={sidebarVisible}  setSidebarVisible={setSidebarVisible} /> 
                </Row>
                <Row>
                    <Col xs={2}  className={sidebarVisible ? "dashboard-ul visible" : "dashboard-ul"}>
                        <ul className="dashboard-li" style={{height: "100vh"}}>
                            <li ><Link to="/admin"><RxDashboard style={{marginRight: "5px"}} /> Dashbaord</Link></li>
                            <br/>
                            <li className="li-active" ><Link className="li-active" to="/adminpost"><BsFileEarmarkPost style={{marginRight: "5px"}} /> Posts</Link></li>
                            <br/>
                            <li><FaUser style={{marginRight: "5px"}} /> Users</li>
                            <br/>
                            <li><IoSettingsSharp style={{marginRight: "5px"}} /> Setting</li>
                        </ul>
                        </Col>
                    <Col className={`main-bar ${sidebarVisible ? "sidebar-visible" : ""}`} xs={10}>
                        <Container fluid style={{height: "100vh",marginBottom:"30px"}}>
                            <Row className="user-post-row">
                                <Row > 
                                    <button><Link to="/addpost">Add Post</Link></button>
                                </Row>
                                {Array.isArray(reqPostData) && reqPostData.map((post) => (
                                    <React.Fragment key={post._id}>
                                        <Col md={5} >
                                            <h5>{post.title}</h5>
                                            <p ><Link to={`/editpost?edit=${encodeURIComponent(JSON.stringify(post))}`}>Edit</Link> | <Link to={`/post?p=${encodeURIComponent(JSON.stringify(post))}`} >View</Link> | <Link to="#" onClick={() => deletePost(post._id)}>Delete</Link></p>
                                        </Col>
                                        <Col xs={1}></Col>
                                    </React.Fragment>
                                ))}
                                {reqPostData.length==0  && <p style={{textAlign:"Center",marginTop:"10px" ,color:"Red" , height:"100vh" , fontSize:"25px"}}>No Post Yet</p>}

                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container> 
        </>

            
    );

}

export default Index;