import React, { useEffect, useState } from "react";
import Styles from "./CreatePost.module.css";
import { GoPlusCircle } from "react-icons/go";
import { IoMdImages } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const CreatePost = ({ userIdData }) => {
  const [isAddEnable, setIsAddEnable] = useState(0);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [postText, setPostText] = useState("");
  const [postImgFile, setPostImgFile] = useState(null);
  const [postImgUrl, setPostImgUrl] = useState("");
  useEffect(() => {
    setUserId(userIdData);
  }, []);
  useEffect(() => {
    if (userId !== "") {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) =>
          console.log(`Error while fetchind useDetails using userId ; ${err}`)
        );
    }
  }, [userId]);

  useEffect(() => {
    saveInDatabase();
  }, [postImgUrl]);
  const clearInputStates = () => {
    setPostText("");
    setPostImgFile(null);
    setPostImgUrl("");
    setTimeout(() => {
      setMesgText("Click icon to upload");
    }, 3000);
  };
  const abortAddpost = () => {
    clearInputStates();
    setIsAddEnable(0);
  };
  const handleAddIconClick = () => {
    setIsAddEnable(1);
  };
  const handleUpload = () => {
    postText === "" &&
      postImgFile === null &&
      alert("Please enter Some fields to post.");
    const formData = new FormData();
    formData.append("file", postImgFile);
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
      .then((data) => setPostImgUrl(data.url));
  };
  const saveInDatabase = async () => {
    if (postImgUrl) {
      try {
        const userPosts = user.posts;
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          posts: [
            ...userPosts,
            { id: uuidv4(), text: postText, postPic: postImgUrl },
          ],
        });
        console.log(`Your post uploaded successfully.`);
        setIsAddEnable(0);
      } catch (err) {
        console.log(`Error while saving data in the database : ${err}`);
      }
    }
  };
  return (
    <div className={Styles.createPostContainer}>
      {isAddEnable ? (
        <div className={Styles.addPostBox}>
          <div className={Styles.addPostBoxtopSection}>
            <p className={Styles.addPostBox_heading}> Create post</p>
            <IoMdCloseCircleOutline
              className={Styles.addPostBox_heading_closeBtn}
              onClick={abortAddpost}
            />
          </div>
          <div className={Styles.addPostBox_userDetail}>
            <img
              src={user?.profilePic}
              alt="profilepic"
              className={Styles.addPostBox_userDetail_pic}
            />
            <span className={Styles.addPostBox_userDetail_name}>
              {user?.fullname}
            </span>
          </div>
          <textarea
            type="text"
            name="postText"
            id="postText"
            className={Styles.addPostBoxText}
            placeholder={`What's on your mind? ${
              user?.fullname?.split(" ")[0]
            }.`}
            rows={4}
            columns={10}
            onChange={(e) => setPostText(e.target.value)}
          />
          <div className={Styles.addPostBox_imgDisplay}>
            {postImgFile && (
              <img src={URL.createObjectURL(postImgFile)} alt="uploaded img" />
            )}
          </div>
          <div className={Styles.addPostBoxImg}>
            <label htmlFor="postImg" className={Styles.addPostBoxImgLabel}>
              <IoMdImages /> Add Photos
            </label>
            <input
              type="file"
              name="postImg"
              id="postImg"
              className={Styles.addPostBoxImgFile}
              onChange={(e) => setPostImgFile(e.target.files[0])}
            />
          </div>
          <button onClick={handleUpload} className={Styles.addPostBox_btn}>
            Post
          </button>
        </div>
      ) : (
        <>
          <GoPlusCircle
            className={Styles.addPostIcon}
            onClick={handleAddIconClick}
          />
          <p className={Styles.mesgTextBox}>Click icon to upload</p>
        </>
      )}
    </div>
  );
};

export default CreatePost;
