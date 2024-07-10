import Navbar from "./navbar";
import FeatureSection from "./featuresection";
import PopularPost from "./popularpost";
import NewPost from "./newpost";
import "../App.css";
import Footer from "./footer"

const Index= () =>{

    return(
        <>
            <Navbar /> 
            <br />
            <br />
            <FeatureSection />
            <br /><br />
            <PopularPost />
            <br /><br />
            <NewPost />
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;