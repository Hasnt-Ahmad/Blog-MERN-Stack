import Navbar from "./navbar";
import Breadcrumps from "./breadcrumps";
import Footer from "./footer";
import ProfilePagePost from "../components/profilePagePost";
import "../css/profilePage.css";

const Index= () =>{

    const crump="Profile";
    return(
        <>
            <Navbar /> 
            <br />
            <Breadcrumps crump={crump} />
            <br />
            <ProfilePagePost />
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;