import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const CredentialContext = createContext();

export const CredentialProvider = ({ children }) => {
    const [credential, setCredential] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setCredential(decodedToken);
        }
    }, []);

    const handleLoginSuccess = (credentialResponse) => {
        const decodedCredential = jwtDecode(credentialResponse.credential);
        localStorage.setItem('token', credentialResponse.credential);
        setCredential(decodedCredential);
        console.log(decodedCredential)
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCredential(null);
        navigate('/auth'); 
    };

    return (
        <CredentialContext.Provider value={{ credential, handleLoginSuccess, handleLogout }}>
            {children}
        </CredentialContext.Provider>
    );
};
