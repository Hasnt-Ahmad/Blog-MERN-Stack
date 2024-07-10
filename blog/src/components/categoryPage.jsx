import Navbar from "./navbar";
import Breadcrumps from "./breadcrumps";
import Footer from "./footer";
import CategorySection from "./categorySection"
import "../css/profilePage.css";

const Index= () =>{

    const crump="Category";
    return(
        <>
            <Navbar /> 
            <br />
            <Breadcrumps crump={crump} />
            <br />
            <CategorySection />
            <br /><br />
            <Footer />
        </>
    );

}

export default Index;