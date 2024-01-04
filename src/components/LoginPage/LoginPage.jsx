import React, { useEffect, useState } from "react";
import InputForm from "../InputForm/InputForm";
import Styles from "./loginPage.module.css";
import InputFormFlower from "../InputFormFlower/InputFormFlower";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsersData] = useState();
  //Following useEffect gets the userData from the server.
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsersData(res.data))
      .catch((err) =>
        console.log(`Error while fetching the users data : ${err}`)
      );
  }, []);
  //validating the user and invoking the userprofile component
  const validateUser = () => {
    if (usersData) {
      try {
        const u = usersData?.find((user) => user.email === email);
        console.log(`User`, u);
        if (u && u.password === password) {
          console.log(`Login successful`);
          navigate("/userProfile", { state: u.id });
        } else {
          console.log(`Invalid credentials`);
        }
      } catch (err) {
        console.log(`Error in Login: ${err}`);
      }
    }
  };

  //Fetching the login data and setting the login States
  const setLoginData = (emailData, passwordData) => {
    setEmail(emailData ? emailData : "");
    setPassword(passwordData ? passwordData : "");
  };
  //Ensuring the states are set and callilng validate user function
  useEffect(() => {
    validateUser();
  }, [email, password]);
  console.log(`UsersData : `, usersData);
  return (
    <div className={Styles.loginPage}>
      <InputFormFlower />
      <InputForm
        pageType={"login"}
        hasEmail={true}
        hasUserName={false}
        hasFullName={false}
        hasPassword={true}
        sendDataToParentfunc={setLoginData}
      />
    </div>
  );
};

export default LoginPage;
