import React, { useState, useEffect } from 'react';
import { Card, Container, Carousel, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/featuresection.css";
import axios from "axios";

const Index = () => {
  const [data, setData] = useState([]);
  const [cardsPerSlide, setCardsPerSlide] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/posts");
        setData(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getData();
  }, []);



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
    const handleClick = () => {
      navigate(`/post?p=${encodeURIComponent(JSON.stringify(post))}`);
    };
    return (
      <Col key={index} className="d-flex justify-content-center mb-4">
        <Card onClick={handleClick} className="text-white" style={{ height: '100%', width: '100%' , cursor : "pointer" }}>
          <Card.Img
            src={post.featuredImg || 'fallback-image-url'} // Add a fallback image URL if needed
            alt="Card image"
            style={{ height: '350px', width: '100%', objectFit: 'cover', borderRadius: "20px" }}
          />
          <Card.ImgOverlay className="d-flex flex-column justify-content-end p-2">
            <div className='card-text-body'>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text style={{ fontSize: "14px" }}>{post.metaDescription }</Card.Text>
            </div>
          </Card.ImgOverlay>
        </Card>
      </Col>
    );
  };

  return (
    <Container>
      <Carousel>
        {Array.from({ length: Math.ceil(data.length / cardsPerSlide) }).map((_, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <Row>
              {data
                .slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide)
                .map((post, index) => renderCard(post, index))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default Index;
