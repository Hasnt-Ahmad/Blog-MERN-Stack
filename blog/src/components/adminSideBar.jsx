import "../css/adminPanel.css";
import { RxDashboard } from "react-icons/rx";
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Outlet, Link } from "react-router-dom";
import  { createContext } from 'react';

const Index= ({handleLogout , credential}) =>{
    

    return(
        <>
            <ul className="dashboard-li" style={{height: "100vh"}}>
                <li className="li-active"><Link className="li-active" to="#"><RxDashboard style={{marginRight: "5px"}} /> Dashbaord</Link></li>
                <br/>
                <li> <Link to={{ pathname: "/adminpost" }}><BsFileEarmarkPost style={{marginRight: "5px"}} /> Posts</Link></li>
                <br/>
                <li><FaUser style={{marginRight: "5px"}} /> Users</li>
                <br/>
                <li><IoSettingsSharp style={{marginRight: "5px"}} /> Setting</li>
            </ul>
        </>
    );

}

export default Index;