import { GoDotFill } from "react-icons/go";
import { Container, Row, Col } from 'react-bootstrap';
import GoogleLocation from "./ourLocation"
const Index= () =>{

    return(    
        <>
            <Container>
                <Row>
                    <Col>
                        <h5> <GoDotFill style={{color: "red"}} /> About Us</h5>
                    </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                    <Col>
                        <GoogleLocation />
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default Index;