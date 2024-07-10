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
import { CiSearch } from "react-icons/ci";
import ProfileImg from "../assets/Images/Hasnat_img.jpg";
import { useState,useContext ,useEffect  } from 'react';
import { CredentialContext } from './CredentialContext';
import "../css/navBar.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {

    const { handleLogout, credential } = useContext(CredentialContext);
    const [credentials, setCredentials] = useState(null);
    const [search, setSearch] = useState(null);
    const [categories, setCategories] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        setCredentials(credential);

        const handleCategories= async ()=>{
            try {
                const response= await axios.get("http://localhost:3000/categories");
                console.log("Cat : ",response.data);
                setCategories(response.data);
              } catch (error) {
                console.error('Error fetching posts:', error);
              }
        } 

        handleCategories();

    }, [credential]);

    const handleSubmit = () => {
        navigate(`/search?s=${encodeURIComponent(JSON.stringify(search))}`);
      };  

    return (
        <>
            <Navbar bg="light" expand="lg" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#" style={{color: "red", fontWeight: 600}}>
                        <Link to="/" style={{textDecoration: "none", color: "red"}}>Pak Blog</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" style={{marginLeft: 60}}>
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                            {categories ? categories.map((category, index) => (
                                    <NavDropdown.Item key={index}>
                                        <Link to={`/categorypost/${category}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            {category}
                                        </Link>
                                    </NavDropdown.Item>
                                )) : ""}
                            </NavDropdown>
                            <Nav.Link href="#features">Contact Us</Nav.Link>
                            <Link to="/aboutus" style={{textDecoration: "none"}}>
                                <Nav.Link href="#pricing">About Us</Nav.Link>
                            </Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Container>
                                    <Row>
                                        <Col lg={6}>
                                            <InputGroup  className='input-search'>
                                                <Form.Control onChange={(e)=>{ setSearch(e.target.value)}}
                                                    placeholder="Search"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                />
                                                <InputGroup.Text onClick={handleSubmit} id="basic-addon1"><CiSearch /></InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col lg={6}>
                                            { credentials &&
                                                <Row className='profile-sec-row g-1'>
                                                    <Col lg={4} xs={1}>
                                                        <img className='profile-img' src={credentials && credentials.picture ? credentials.picture : ""} alt="image"></img>
                                                    </Col>
                                                    <Col lg={4} xs={1}>
                                                        <p style={{marginTop:"10px"}}>{credentials && credentials.name ? credentials.name : ""}</p>
                                                    </Col>
                                                    <Col lg={4} xs={1}>
                                                        <NavDropdown title="" id="collasible-nav-dropdown" className='profile-dot' >
                                                            <div id="dropdown-menu">
                                                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                                            </div>
                                                            
                                                        </NavDropdown>
                                                    </Col>
                                                </Row>
                                            }
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
