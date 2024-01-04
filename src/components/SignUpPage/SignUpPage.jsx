import styles from "./signUpPage.module.css";
import InputForm from "../InputForm/InputForm";
import InputFormFlower from "../InputFormFlower/InputFormFlower";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

//SignUpPage component function
const SignUpPage = () => {
  //consts and states
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [userNameState, setUserNameState] = useState("");
  const [fullNameState, setFullNameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [userId, setUserId] = useState("");

  //useEffect 1 : Fetching all usersData
  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsersData(res.data))
      .catch((err) =>
        console.log(`Error while fetching the users data : ${err}`)
      );
    setUserId(uuidv4());
  }, []);

  //Setting up the required states
  const setSignUpData = (email, userName, password, fullName) => {
    setEmailState(email);
    setUserNameState(userName);
    setFullNameState(fullName);
    setPasswordState(password);
  };

  //Function to save the data entered by user in the db.json
  const createAccount = async () => {
    try {
      const newAcc = {
        id: userId,
        email: emailState,
        username: userNameState,
        fullname: fullNameState,
        password: passwordState,
        profilePic: "",
        dob: "",
        gender: "",
        location: "",
        education: "",
        profession: "",
        bio: "",
        posts:[],
        friends:[]
      };
      const res = await axios.post("http://localhost:3000/users", newAcc);
      console.log(`Response after axios.post : `, res);
      console.log(`SignUpPage : New Account created, db.json updated.`);
      navigate("/addProfilePic", {
        state: {
          userIdData: userId,
        },
      });
    } catch (err) {
      console.log(
        `In the signupPage component : Error while applying PUT method to axios : ${err}`
      );
    }
  };

  //Function to check whether user Details enetered already exists, if exists, redirect to login page
  const validateUser = () => {
    if (usersData.length) {
      try {
        const u = usersData?.find((user) => user.email === emailState);
        if (u) {
          console.log(`Email has been registered. Account already exists.`);
          navigate("/");
        } else {
          createAccount();
        }
      } catch (err) {
        console.log(`in the signupPage component : Error : ${err}`);
      }
    }
  };

  //useEffect 2 : to call validateUser function.
  useEffect(() => {
    validateUser();
  }, [emailState, userNameState, fullNameState, passwordState]);

  //Consoling to check and debug
  console.log(`In SignUpPage UsersData : `, usersData);
  console.log(`In SignUpPage UsersIdData : `, userId);

  //JSX
  return (
    <div className={styles.signUpPageContainer}>
      <InputFormFlower />
      <InputForm
        pageType={"signUp"}
        hasEmail={true}
        hasUserName={true}
        hasFullName={true}
        hasPassword={true}
        sendDataToParentfunc={setSignUpData}
      />
    </div>
  );
};
export default SignUpPage;
