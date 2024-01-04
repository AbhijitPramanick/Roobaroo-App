import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserProfile from "./components/UserProfile/UserProfile";
import AddProfilePic from "./components/AddProfilePic/AddProfilePic";
import AddGenderDob from "./components/AddGenderDob/AddGenderDob";
import AddBio from "./components/AddBio/AddBio";
import CreatePost from "./components/CreatePost/CreatePost";
const App = () => {
  return (
    <>
      <div className="appContainer">
        <div className="hero">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/addprofilepic" element={<AddProfilePic />} />
              <Route path="/addgenderdob" element={<AddGenderDob />} />
              <Route path="/addbio" element={<AddBio />} />
              <Route path="/createpost" element={<CreatePost />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
};
export default App;
