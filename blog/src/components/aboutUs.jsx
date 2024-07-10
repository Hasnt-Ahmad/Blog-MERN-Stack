import Navbar from "./navbar";
import Footer from "./footer"
import Breadcrumps  from "./breadcrumps";
import OurInfo from "./ourInfo"

const Index= () =>{

    const crump="About Us";

    return(    
        <>
            <Navbar /> 
            <br />
            <Breadcrumps crump={crump} />
            <br /><br />
            <OurInfo/>
            <br /><br />
           
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;