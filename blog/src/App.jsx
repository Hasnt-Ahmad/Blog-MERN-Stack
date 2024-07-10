
import Index from "./components/index.jsx";
import Postpage from "./components/postpage.jsx"
import ReactDOM from "react-dom/client";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/profilePage.jsx"
import CategoryPage from "./components/categoryPage.jsx";
import AboutUs from "./components/aboutUs.jsx";
import NoPage from "./components/noPage.jsx";
import AdminPanel from "./components/adminPanel.jsx";
import AdminPost from "./components/adminPost.jsx";
import AddPost from "./components/addPost.jsx";
import Auth from  "./components/auth.jsx";
import EditPost from "./components/editPost.jsx";
import SearchPage from "./components/search.Page.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CredentialProvider } from './components/CredentialContext.jsx';
import CategoriesPostPage from "./components/categoriesPostPage.jsx";
import{ useContext } from 'react';
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>

function App() {


  return (
    <>
      <CredentialProvider >
          <BrowserRouter>
          <Routes>
              <Route path="/"  index element={<Index />} />
              <Route path="/post" element={<Postpage />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/adminpost" element={<AdminPost />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/categorypost/:category" element={<CategoriesPostPage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/editpost" element={<EditPost />} />
              <Route path="*" element={<NoPage />} /> 
              <Route path="/admin" element={<Auth />} /> 
          </Routes>
          </BrowserRouter>
      </CredentialProvider>

    </>


  )
}

export default App
