import Styles from "./HomePage.module.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const HomePage = ({ userIdData }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/users/${userIdData}`)
        .then((res) => setUser(res.data));
    } catch (err) {
      console.log(`Error while Fetching user Details : ${err}`);
    }
  }, []);

  return (
    <div className={Styles.homePageContainer}>
      <h1 className={Styles.homePageContainer_pageHeading}>Homepage</h1>
      {user?.posts?.map((p) => (
        <div className={Styles.homePageContainer_postBox} key={p.id}>
          <img
            className={Styles.homePageContainer_postBox_postImg}
            src={p?.postPic}
            alt={`${p?.id} profilepic`}
          />
          <p className={Styles.homePageContainer_postBox_postText}>{p?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
