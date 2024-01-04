import React from "react";
import Styles from "./Profile.module.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Profile = ({ userIdData }) => {
  console.log(`User Id : `, userIdData);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/users/${userIdData}`)
        .then((res) => setUser(res.data));
    } catch (err) {
      console.log(`Error while fetching the user Details : ${err}`);
    }
  }, []);
  return (
    <div className={Styles.profileContainer}>
      <h1 className={Styles.profileContainer_pageheading}>Profile Details</h1>
      <ul className={Styles.profileContainer_detailList}>
        <li>
          <span className={Styles.detailist_key}>Gender : </span>
          <span className={Styles.detailist_value}>{user?.gender}</span>
        </li>
        <li>
          <span className={Styles.detailist_key}>Location : </span>
          <span className={Styles.detailist_value}>{user?.location}</span>
        </li>
        <li>
          <span className={Styles.detailist_key}>Profession : </span>
          <span className={Styles.detailist_value}>{user?.profession}</span>
        </li>
        <li>
          <span className={Styles.detailist_key}>Birthdate : </span>
          <span className={Styles.detailist_value}>{user?.dob}</span>
        </li>
        <li>
          <span className={Styles.detailist_key}>Education : </span>
          <span className={Styles.detailist_value}>{user?.education}</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
