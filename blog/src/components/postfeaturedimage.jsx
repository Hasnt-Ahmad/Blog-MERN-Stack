import { Container, Row, Col ,Stack } from 'react-bootstrap';
import "../css/postpage.css";
import { Outlet, Link } from "react-router-dom";
import Xboximg from "../assets/Images/xboxc2.jpg";
import ProfileImg from "../assets/Images/Hasnat_img.jpg";
import { FaRegCalendarAlt } from "react-icons/fa";
import {useState, useEffect,useContext} from "react";
import { CredentialContext } from './CredentialContext';



const Index= ({postParam}) =>{

    const { credential } = useContext(CredentialContext);

    let monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const [featuredImg, setFeaturedImg] = useState("");  
    const [title, setTitle] = useState("");  
    const [category, setCategory] = useState("");  
    const [content, setContent] = useState("");  
    const [PostId, setPostId] = useState("");  
    const [authorName, setAuthorName] = useState("");
    const [authorImg, setAuthorImg] = useState("");    
    const [modifiedDate, setModifiedDate] = useState("");  
    const [credentials,setCredentials]=useState([]);

    useEffect(() => {
        if (postParam) {
          setTitle(postParam.title || "No Title");
          setCategory(postParam.category || "No Category");
          setContent(postParam.content || "No Content");
          setFeaturedImg(postParam.featuredImg || Xboximg);
          setPostId(postParam._id || "");
          setAuthorName(postParam.authorName);
          setAuthorImg(postParam.authorImg);
          let modifiedDateObj = new Date(postParam.modifiedAt);

            // Format the modified date
            let monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            let formattedDate = `${monthNames[modifiedDateObj.getMonth()]} ${modifiedDateObj.getDate()}, ${modifiedDateObj.getFullYear()}`;
            setModifiedDate(formattedDate);

            // Set credentials
            setCredentials(credential);
        }
      }, [credential]);

    return(
        <>
            <Container>
                <Row>
                    <Col >
                        <main className='featured-post-header'>
                            <h3>{title}</h3>
                            <br/>
                            <img src={featuredImg}></img>
                        </main>
                    </Col>
                </Row>
                <br/>
                <Row >
                    <Stack  className='post-details d-flex justify-content-center align-items-center ' direction="horizontal" gap={3}>
                            
                            <Link to="/profile"><img src={authorImg ||credentials.picture}></img></Link>
                            <Link to="/profile"><p>{authorName || credentials.name}</p></Link>
                            <p className='post-date'><FaRegCalendarAlt/>{modifiedDate}</p>
                            <p>{category}</p>
                    </Stack>
                </Row>
                <Row>
                    <Col>
                        <div className='content-div' dangerouslySetInnerHTML={{ __html: content }} />
                    </Col>
                </Row>
            </Container>
        </>
    );

}

export default Index;