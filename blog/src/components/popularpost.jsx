import React, { useState, useEffect , useContext } from 'react';
import { Card, Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import carImg from '../assets/Images/xbox1.jpg';
import xboxImg from '../assets/Images/xbox2.jpg';
import xboxImg1 from '../assets/Images/xboxc2.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/featuresection.css';
import '../css/popularpost.css';
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const App = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/popularposts");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getData();
  }, []);

  
  const [cardsPerSlide, setCardsPerSlide] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(3);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  const renderCard = (post, index) => {

    const handleCardClick = () => {
      navigate(`/post?p=${encodeURIComponent(JSON.stringify(post))}`);
    };

    return (
      <Col xs={3} key={index} className='popular-post-section' onClick={() => handleCardClick(post)} style={{ cursor: 'pointer' }}>
        <Row>
          <img src={post.featuredImg || 'fallback-image-url'} className="pop-img" alt={post.title} />
        </Row>
        <Row>
          <h6 className='blog-heading'>{post.title || ""}</h6>
        </Row>
        <Row>
          <p className='blog-description-p'>{post.metaDescription || post.text}</p>
        </Row>
        <Row className='poster-row' style={{ backgroundColor: "rgba(243, 243, 243)", marginLeft: "20px", borderRadius: "8px" }}>
          <Col xs={3} style={{ padding: "10px" }}>
            <img src={post.authorImg || ""} style={{ width: "50px", height: "50px", borderRadius: "4px", marginLeft: "2px", marginRight: "5px" }} alt="Author" />
          </Col>
          <Col xs={9}>
            <Row>
              <p className='poster-name' style={{ marginBottom: 0, marginTop: "7px" }}>{post.authorName}</p>
              <p className='poster-date'>{new Date(post.createdAt).toLocaleDateString()}</p>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <Container>
      <h5> <GoDotFill style={{ color: "red" }} /> Popular Posts</h5>
      <Carousel indicators={false} interval={null} nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />} prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}>
        {Array.from({ length: Math.ceil(data.length / cardsPerSlide) }, (_, index) => (
          <Carousel.Item key={index}>
            <Row>
              {data.slice(index * cardsPerSlide, index * cardsPerSlide + cardsPerSlide).map((post, idx) => renderCard(post, idx))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default App;
