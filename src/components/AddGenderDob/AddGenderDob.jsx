import React, { useEffect, useState } from "react";
import Styles from "./AddGenderDob.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const AddGenderDob = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState();
  const [ageVal, setAgeVal] = useState(null);
  const [genImg, setGenImg] = useState(null);
  const [userId, setUserId] = useState("");
  const calculateAge = () => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    console.log(`Birthdate : ${birthDate}`);
    console.log(`Current date : ${currentDate}`);
    if (isNaN(birthDate)) {
      // Handle invalid date format
      console.error("Invalid date of birth format");
      return;
    }

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    setAgeVal(age);
  };
  const saveDetails = () => {
    axios.put(`http://localhost:3000/users/${userId}`, {
      ...userData,
      gender: gender,
      dob: dob,
    });
    console.log(`User gender and dob updated : ${userId}`);
    navigate("/addbio", { state: userId });
  };
  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setUserData(res.data))
        .catch((err) =>
          console.log(`Error while getting details of users: ${err}`)
        );
    }
  }, [userId]);

  useEffect(() => {
    console.log("Gender:", gender);
    calculateAge();
    setUserId(location?.state);
  }, [gender, ageVal, userId]);
  console.log(`UserId received : ${userId}`);
  console.log(`UserData : `, userData);
  return (
    <div className={Styles.addGenderDobContainer}>
      <div className={Styles.addGenderDobBox}>
        <h1 className={Styles.addGenderDobheading}>
          Enter your Age and Gender
        </h1>
        <div className={Styles.inputBox_gender}>
          <div className={Styles.inputBox_gender_left}>
            <label className={Styles.inputBox_label} htmlFor="gender">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              onChange={(e) => {
                setGender(e.target.value);
                setGenImg(`/images/genderPic/${e.target.value}.png`);
              }}
              className={Styles.inputBox_select}
            >
              <option value="other">Other</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-Binary</option>
              <option value="transgender">Transgender</option>
              <option value="genderqueer">Genderqueer</option>
              <option value="agender">Agender</option>
              <option value="bigender">Bigender</option>
              <option value="two_spirit">Two-Spirit</option>
            </select>
          </div>
          <div className={Styles.inputBox_gender_right}>
            {gender !== "other" && genImg && (
              <img
                src={genImg}
                alt={`${gender} image`}
                className={Styles.genderImg}
              />
            )}
          </div>
        </div>
        <div className={Styles.inputBox_dob}>
          <label className={Styles.inputBox_label} htmlFor="userDob">
            Date of Birth:
          </label>
          <input
            type="date"
            placeholder="Enter Dob"
            id="userDob"
            name="userDob"
            className={Styles.inputBox_input}
            onChange={(e) => {
              setDob(e.target.value);
              calculateAge();
            }}
          />
          {ageVal !== null && (
            <p className={Styles.ageDisplay}>Age: {ageVal}</p>
          )}
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
export default AddGenderDob;
