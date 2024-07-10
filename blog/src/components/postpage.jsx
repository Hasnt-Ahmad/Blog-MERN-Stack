import Navbar from "./navbar";
import Breadcrumps from "./breadcrumps";
import PostFeaturImage from "./postfeaturedimage"
import Footer from "./footer"
import ReactQuil from "./reactquilpage.jsx";
import {useState, useEffect,useContext} from "react";
import { useLocation, useSearchParams } from 'react-router-dom';



const Index= () =>{

    const location = useLocation();
    const [searchParams] = useSearchParams();

    const postParamString = searchParams.get('p');
    const postParam = postParamString ? JSON.parse(postParamString) : null;
    const title = postParam ? postParam.title : ""

    // const crump={title}
    return(
        <>
            <Navbar /> 
            <br />
            <Breadcrumps crump={title} />
            <br />
            <PostFeaturImage postParam={postParam} />
            <br /><br />
            {/* <ReactQuil /> */}
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;