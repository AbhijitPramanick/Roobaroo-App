import React, { useEffect, useState } from "react";
import Styles from "./UserProfile.module.css";
import SideBar from "../SideBar/SideBar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost";
import Friends from "../Friends/Friends";
import Profile from "../Profile/Profile";
import HomePage from "../HomePage/HomePage";
const UserProfile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const location = useLocation();
  const [sideBarAction, setSideBarAction] = useState("homepage");
  useEffect(() => {
    const fetchUser = () => {
      setUserId(location?.state);
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      console.log(`USER PROFILE PAGE : userId = ${userId}`);
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) =>
          console.log(`Error while fetching user in userprofile page : ${err}`)
        );
    }
  }, [userId]);
  useEffect(() => {
    console.log(`User : `, user);
  }, [user]);
  return (
    <div className={Styles.userProfileMainContainer}>
      <div className={Styles.userProfileContainer}>
        <SideBar sideBarActionFunc={setSideBarAction} />
        <div className={Styles.userProfileSection}>
          <div className={Styles.topSection}>
            <div className={Styles.topSecImgDiv}>
              <img src={user.profilePic} alt="UserImage" />
            </div>
            <div className={Styles.userInfo}>
              <div className={Styles.userInfo_topSection}>
                <span className={Styles.userInfo_userNameText}>
                  {user?.username}
                </span>
                <button className={Styles.userInfo_topSection_btn}>
                  Edit Profile
                </button>
                <button className={Styles.userInfo_topSection_btn}>
                  Logout
                </button>
              </div>
              <div className={Styles.midSecInfoDiv}>
                <div className={Styles.midSecInfoDiv_userDetail}>
                  <span className={Styles.midSecInfoDiv_userDetail_num}>
                    {user?.posts?.length}
                  </span>
                  <span className={Styles.midSecInfoDiv_userDetail_text}>
                    posts
                  </span>
                </div>
                <div className={Styles.midSecInfoDiv_userDetail}>
                  <span className={Styles.midSecInfoDiv_userDetail_num}>
                    {user?.friends?.length}
                  </span>
                  <span className={Styles.midSecInfoDiv_userDetail_text}>
                    friends
                  </span>
                </div>
              </div>
              <div className={Styles.buttomSecInfoDiv}>
                <span className={Styles.bottomSecInfoDiv_nameText}>
                  {user?.fullname}
                </span>
              </div>
              <div className={Styles.bottomSecInfoDiv_bioText}>
                <p className={Styles.bottomSecInfoDiv_bioText_text}>
                  <span className={Styles.bottomSecInfoDiv_bioText_heading}>
                    About :{" "}
                  </span>
                  {user.bio}
                </p>
              </div>
            </div>
          </div>
          {sideBarAction === "create" && <CreatePost userIdData={userId} />}
          {sideBarAction === "friends" && <Friends userIdData={userId} />}
          {sideBarAction === "profile" && <Profile userIdData={userId} />}
          {sideBarAction === "homepage" && <HomePage userIdData={userId} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
