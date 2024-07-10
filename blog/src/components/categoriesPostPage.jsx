import NavBar from "../components/navbar.jsx";
import Breadcrumps from "./breadcrumps";
import { Card, Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation, useParams } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

function App() {

    const { category } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const crump="Category / "+ category;

    console.log("Category ", category);

  
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/catposts/${category}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (category) {
            fetchPosts();
        }
    }, [category]);

      const handleCardClick = (post) => {
        navigate(`/post?p=${encodeURIComponent(JSON.stringify(post))}`);
      };


  return (
    <>
        <NavBar />
        <Breadcrumps crump={crump} /> 
        {<Container>
                <br/>
                <Row>
                {data.length > 0 && data.map((post, index) => (
                    <Col className='new-post-col' xs={6} key={index}>
                        <Row onClick={() => handleCardClick(post)} style={{ cursor: 'pointer' }}>
                        <Col md={6}>
                            <img className='new-post-img' src={post.featuredImg || 'default-image-url'} alt={post.title} />
                        </Col>
                        <Col md={6}>
                            <Row>
                            <h6 className='new-post-heading'>{post.title}</h6>
                            <br /><br />
                            <p className='new-post-p'>{post.metaDescription}</p>
                            </Row>
                            <Row className='poster-row new-poster-row' style={{ backgroundColor: "rgba(243, 243, 243)", borderRadius: "8px" }}>
                            <Col xs={3} style={{ padding: "10px" }}>
                                <img src={post.authorImg || 'default-author-img-url'} style={{ width: "50px", height: "50px", borderRadius: "4px", marginLeft: "2px" }} alt="Author" />
                            </Col>
                            <Col>
                                <Row>
                                <p className='poster-name' style={{ marginBottom: 10, marginTop: "7px" }}>{post.authorName || 'Unknown'}</p>
                                <p className='poster-date'>{new Date(post.createdAt).toLocaleDateString()}</p>
                                </Row>
                            </Col>
                            </Row>
                        </Col>
                        </Row>
                    </Col>
                ))}
                    

                </Row>
            </Container> }

    </>


  )
}

export default App
