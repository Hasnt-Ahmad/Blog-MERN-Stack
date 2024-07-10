import SideBar from "./adminSideBar";
import { Container, Row, Col } from 'react-bootstrap';
import AdminNavBar from "./adminNavBar.jsx";
import { useState, useEffect, useContext } from 'react';
import "../css/adminPanel.css";
import imageProcessing from "../assets/Images/image_processing.png";
import { CredentialContext } from './CredentialContext';


const Index= () =>{

const { credential, handleLogout } = useContext(CredentialContext);

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const todayDate=new Date()
  const date = todayDate.getDate();
  const month = todayDate.getMonth() + 1;
  const year = todayDate.getFullYear();
  const [flag, setFlag] = useState(false);


    return(
        <>
        <Container fluid >
                <Row>
                    <AdminNavBar handleLogout={handleLogout} credential={credential} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} /> 
                </Row>
                <Row>
                    <Col xs={2}  className={sidebarVisible ? "dashboard-ul visible" : "dashboard-ul"}>
                        <SideBar handleLogout={handleLogout} credential={credential} />
                    </Col>
                    <Col className={`main-bar ${sidebarVisible ? "sidebar-visible" : ""}`} xs={10}>
                        <Container fluid>
                            <Row className="main-bar-row">
                                <Col xs={10}>
                                  <h3>Welcome {credential.name} </h3>
                                </Col>
                                <Col xs={2} style={{padding:"20px"}}>
                                    {date}-{month}-{year}
                                </Col>
                            </Row>
                            <br/><br/>
                            <Row className="main-bar-cards">
                                <Col md={3} sm={5}>
                                    <p>Total Post</p>
                                    <h3>20</h3>
                                </Col>

                                <Col md={1} sm={1} ></Col>

                                <Col md={3} sm={5}>
                                    <p>Total Views</p>
                                    <h3>50K</h3>
                                </Col>

                                <Col md={1} sm={1}></Col>

                                <Col md={3} sm={5}>
                                    <p>Total Post</p>
                                    <h3>50</h3>
                                </Col>
                            </Row>
                            <Row >
                                <img src={imageProcessing} style={{width:"700px", height : "450px", marginLeft:"10%"}}></img>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container> 
        </>
    );

}

export default Index;