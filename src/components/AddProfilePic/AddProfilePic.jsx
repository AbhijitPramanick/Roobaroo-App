import React, { useEffect, useState } from "react";
import Styles from "./AddProfilePic.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

//AddProfilePic component function
const AddProfilePic = () => {
  // Const and states
  const location = useLocation();
  const [img, setImg] = useState();
  const [imgDisplay, setImgDisplay] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  //Consoling to debug
  console.log(img);
  console.log(`imgUrl : `, imgUrl);

  //useEffect 1 :
  useEffect(() => {
    console.log(`AddProfielPic - Location : `, location.state);
    setUserId(location?.state.userIdData);

    //Fetching the usersData from db.json (pending)
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(`Error while fetching users data : ${err}`));
  }, []);

  //Function to upload image to cloudinary and saving the url to the db.json
  const uploadImg = async () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "myCloud");
    formData.append("cloud_name", "duidqdysu");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/duidqdysu/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data)
      .then((data) => setImgUrl(data.url));
  };

  //function to fetch user details using user ID
  const updateUser = async () => {
    if (userId) {
      try {
        const userUpdated = users?.find((u) => u.id === userId);
        console.log(`Addprofilepic component - Updated User : `, userUpdated);

        await axios.put(`http://localhost:3000/users/${userId}`, {
          ...userUpdated,
          profilePic: imgUrl,
        });
        console.log(`Users profile pic uploaded`);
      } catch (err) {
        console.log(`Error while updating the profilePic in database : `, err);
      }
    }
  };
  const nextPage = () => {
    navigate("/addgenderdob", { state: userId });
  };

  //UseEffect : to call updateUser function and consoling to debug
  useEffect(() => {
    console.log(`AddprofilePic Component - userId : `, userId);
    console.log(`users state : `, users);
  }, [userId, users]);

  useEffect(() => {
    imgUrl && updateUser();
  }, [imgUrl]);

  useEffect(() => {
    if (img) setImgDisplay(URL.createObjectURL(img));
  }, [img]);
  //consoling to debug
  console.log(`Image url : `, imgUrl);
  //returning JSX
  return (
    <div className={Styles.addProfilePicContainer}>
      <h1 className={Styles.addProfilePicHeading}>Add a profile picture</h1>
      <label htmlFor="profilePicImg" className={Styles.addProfilePicLabelBox}>
        {img ? (
          <img
            src={imgDisplay}
            alt="Add profile Pic thumbnail"
            className={Styles.addProfilePicLabelBoxImg}
          />
        ) : (
          <img
            src="\images\addProfilePic\addProfilePic1.png"
            alt="Add profile Pic thumbnail"
            className={Styles.addProfilePicLabelBoxImg}
          />
        )}
        <p className={Styles.addProfilePicLabelBox_text}>
          Click icon to upload Img
        </p>
      </label>
      <input
        type="file"
        name="profilePicImg"
        id="profilePicImg"
        className={Styles.addProfilePicInput}
        onChange={(e) => {
          setImg(e.target.files[0]);
        }}
      />
      <button className={Styles.addProfilePicInput_btn} onClick={uploadImg}>
        Upload
      </button>
      {imgUrl && (
        <button className={Styles.addProfilePicInput_btn} onClick={nextPage}>
          {imgUrl === null ? "Skip" : "Next"}
        </button>
      )}
    </div>
  );
};
export default AddProfilePic;
