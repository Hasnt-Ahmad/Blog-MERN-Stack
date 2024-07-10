import { GoDotFill } from "react-icons/go";
import { Container, Row, Col } from 'react-bootstrap';
import ProfileImg from "../assets/Images/Hasnat_img.jpg";
import carImg from '../assets/Images/xbox1.jpg';
import xboxImg from '../assets/Images/xbox2.jpg';
import xboxImg1 from '../assets/Images/xboxc2.jpg';
import "../css/profilePage.css";

const Index= () =>{

    return(
        <>
            <Container>
                <Row>
                    <Col className="profile-section">
                        <img src={ProfileImg}></img>
                        <p>Hasnat Ahmad</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5> <GoDotFill style={{color: "red"}} /> New Posts</h5>
                    </Col>
                </Row>
                <br/><br/>
                <Row>
                    <Col xs={3} className='popular-post-section'>
                        <Row>
                        <img src={xboxImg} className="profile-post-img" alt={"xbox"} />
                        </Row>
                        <Row>
                        <h6 className='blog-heading'>Swimming</h6>
                        </Row>
                        <Row>
                        <p className='blog-description-p'>{"Hello How are you"}</p>
                        </Row>
                        <Row className='poster-row' style={{ backgroundColor: "rgba(243, 243, 243)", marginLeft: "20px", borderRadius: "8px" }}>
                        <Col xs={3} style={{ padding: "10px" }}>
                            <img src={carImg} style={{ width: "50px", height: "50px", borderRadius: "4px", marginLeft: "2px", marginRight: "5px" }} alt="Author" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                            <p className='poster-name' style={{ marginBottom: 0, marginTop: "7px" }}>Hasnat</p>
                            <p className='poster-date'>Aug 25, 24</p>
                            </Row>
                        </Col>
                        </Row>
                    </Col>

                    <Col xs={3} className='popular-post-section'>
                        <Row>
                        <img src={xboxImg} className="profile-post-img" alt={"xbox"} />
                        </Row>
                        <Row>
                        <h6 className='blog-heading'>Swimming</h6>
                        </Row>
                        <Row>
                        <p className='blog-description-p'>{"Hello How are you"}</p>
                        </Row>
                        <Row className='poster-row' style={{ backgroundColor: "rgba(243, 243, 243)", marginLeft: "20px", borderRadius: "8px" }}>
                        <Col xs={3} style={{ padding: "10px" }}>
                            <img src={carImg} style={{ width: "50px", height: "50px", borderRadius: "4px", marginLeft: "2px", marginRight: "5px" }} alt="Author" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                            <p className='poster-name' style={{ marginBottom: 0, marginTop: "7px" }}>Hasnat</p>
                            <p className='poster-date'>Aug 25, 24</p>
                            </Row>
                        </Col>
                        </Row>
                    </Col>


                    <Col xs={3} className='popular-post-section'>
                        <Row>
                        <img src={xboxImg} className="profile-post-img" alt={"xbox"} />
                        </Row>
                        <Row>
                        <h6 className='blog-heading'>Swimming</h6>
                        </Row>
                        <Row>
                        <p className='blog-description-p'>{"Hello How are you"}</p>
                        </Row>
                        <Row className='poster-row' style={{ backgroundColor: "rgba(243, 243, 243)", marginLeft: "20px", borderRadius: "8px" }}>
                        <Col xs={3} style={{ padding: "10px" }}>
                            <img src={carImg} style={{ width: "50px", height: "50px", borderRadius: "4px", marginLeft: "2px", marginRight: "5px" }} alt="Author" />
                        </Col>
                        <Col xs={9}>
                            <Row>
                            <p className='poster-name' style={{ marginBottom: 0, marginTop: "7px" }}>Hasnat</p>
                            <p className='poster-date'>Aug 25, 24</p>
                            </Row>
                        </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>
        </>
    );

}

export default Index;