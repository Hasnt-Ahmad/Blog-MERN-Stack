import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Outlet, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import { CiSearch } from "react-icons/ci";
import ProfileImg from "../assets/Images/Hasnat_img.jpg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState,useContext ,useEffect  } from 'react';
import { CredentialContext } from './CredentialContext';
import { useNavigate } from "react-router-dom";
import "../css/navBar.css";

const App = ({ sidebarVisible, setSidebarVisible }) => {
    const sideBar = () => {
        setSidebarVisible(!sidebarVisible);
    }
    const { handleLogout, credential } = useContext(CredentialContext);
    const[credentials,setCredentials]=useState([]);
     
    useEffect(() => {

        setCredentials(credential);

      }, [credentials]);
   

    return (
        <>
            <Navbar bg="light" expand="lg" data-bs-theme="light">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" style={{ textDecoration: "none", color: "red", marginRight: "30px" }}>Pak Blog</Link>
                        <GiHamburgerMenu className='menu-btn' onClick={sideBar} style={{ color: "grey" }} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Container>
                                    <Row>
                                        <Col lg={4} xs={1}>
                                            <img style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "2px" }} src={credentials && credentials.picture ? credentials.picture : ""} alt="image"></img>
                                        </Col>
                                        <Col lg={4} xs={1}>
                                            <p style={{ marginTop: "10px" }}>{credentials && credentials.name ? credentials.name : ""}</p>
                                        </Col>
                                        <Col lg={4} xs={1}>
                                            <NavDropdown title="" id="collasible-nav-dropdown" className='profile-dot' >
                                                <div id="dropdown-menu">
                                                    <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                                </div>
                                            </NavDropdown>
                                        </Col>
                                    </Row>
                                </Container>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default App;
