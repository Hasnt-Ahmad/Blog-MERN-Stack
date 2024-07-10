import NavBar from "../components/navbar.jsx";
import Breadcrumps from "./breadcrumps";
import { Card, Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation, useSearchParams } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

function App() {

    const crump="search";
    const [data, setData] = useState([]);

    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchParamString = searchParams.get('s');
    const searchParam = searchParamString ? JSON.parse(searchParamString) : null;


  
    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/search", {
              params: searchParam ? { s: searchParam } : {},
            });
            console.log(response.data);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        if (searchParam) {
          getData();
        }
      }, [searchParam]);

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
