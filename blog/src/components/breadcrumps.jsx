import Breadcrumb from 'react-bootstrap/Breadcrumb';
import "../App.css";
import { Container } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";

const Index= (props) =>{

    return(
        <>
            <Container> 
                <Breadcrumb>
                    <Breadcrumb.Item href="#" style={{fontSize: "11px"}}><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item style={{fontSize: "11px"}} active>{props.crump}</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
        </>
    );

}

export default Index;