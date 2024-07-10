import { Container, Row, Col } from 'react-bootstrap';
import LoginImg from "../assets/Images/login_pic-.png";
import { FcGoogle } from "react-icons/fc";
import "../css/auth.css";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode"; 
import { useState, useEffect } from 'react';
import AdminPanel from "./adminPanel.jsx";
import React, { useContext } from 'react';
import { CredentialContext } from './CredentialContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
    const { credential, handleLoginSuccess, handleLogout } = useContext(CredentialContext);

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await axios.post('http://localhost:3000/user', {
                    credential
                });
                console.log(response);
            } catch (error) {
                console.log("Error creating user:", error);
            }
        };

        if (credential) {
            handleSubmit();
        }
    }, [credential]);

    

    return (
        <>
            {credential ? <AdminPanel handleLogout={handleLogout} credential={credential} /> :
                <Container fluid>
                    <Row className='auth-row'>
                        <Col className='bg-img'>
                            <img src={LoginImg} alt="Login" />
                        </Col>
                        <Col className='auth-side'>
                            <h5>Login to Your Account</h5>
                            <br /><br />
                            <div className="d-flex flex-column align-items-center">
                                
                                <br />
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    );
}

export default App;
