import Navbar from "./navbar";
import Footer from "./footer"
import { Container, Row, Col } from 'react-bootstrap';
const Index= () =>{

    return(    
        <>

            <Navbar /> 
            <br />
            <Container>
                <Row>
                    <Col>
                       <h1 style={{textAlign:"center" , marginTop: "50px" , color: "red" , fontSize : "80px"}}>404</h1>
                       <p style={{textAlign:"center" , marginTop: "20px" , color: "grey" }}>OOPS! Page you're looking for doesn't exist.</p>
                    </Col>
                </Row>
            </Container>
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;