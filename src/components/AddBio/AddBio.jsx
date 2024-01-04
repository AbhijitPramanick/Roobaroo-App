import React, { useEffect, useState } from "react";
import Styles from "./AddBio.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const AddBio = () => {
  const [locationState, setLocationState] = useState("");
  const [educationState, setEducationState] = useState("");
  const [professionState, setProfessionState] = useState("");
  const [bioState, setBioState] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setUserId(location?.state);
    axios
      .get(`http://localhost:3000/users/${location?.state}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(`Error while fetching user : ${err}`));
  }, []);
  const saveDetails = () => {
    axios.put(`http://localhost:3000/users/${userId}`, {
      ...userData,
      location: locationState,
      education: educationState,
      profession: professionState,
      bio: bioState,
    });
    navigate("/userprofile", { state: userId });
  };
  return (
    <div className={Styles.addBioContainer}>
      <div className={Styles.addBioBox}>
        <h1 className={Styles.addBioContainerHeading}>Add Further details</h1>
        <div className={Styles.inputBox}>
          <label htmlFor="location" className={Styles.inputBox_label}>
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className={Styles.inputBox_input}
            onChange={(e) => setLocationState(e.target.value)}
            placeholder="Enter Location"
          />
        </div>
        <div className={Styles.inputBox}>
          <label htmlFor="education" className={Styles.inputBox_label}>
            Education
          </label>
          <input
            type="text"
            id="education"
            name="education"
            className={Styles.inputBox_input}
            onChange={(e) => setEducationState(e.target.value)}
            placeholder="Enter Education"
          />
        </div>
        <div className={Styles.inputBox}>
          <label htmlFor="profession" className={Styles.inputBox_label}>
            Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            className={Styles.inputBox_input}
            onChange={(e) => setProfessionState(e.target.value)}
            placeholder="Enter Profession"
          />
        </div>
        <div className={Styles.inputBox}>
          <label htmlFor="bio" className={Styles.inputBox_label}>
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            className={Styles.inputBox_textarea}
            rows={10}
            columns={80}
            onChange={(e) => setBioState(e.target.value)}
            placeholder="Enter Bio"
          />
        </div>
        <div className={Styles.navigationBox}>
          <button className={Styles.navigationBoxBtn}>Previous</button>
          <button className={Styles.navigationBoxBtn} onClick={saveDetails}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBio;
