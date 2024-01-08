import Styles from "./HomePage.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const HomePage = ({ userIdData }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/${userIdData}`
        );
        console.log(res);
        setUser(res.data);
        setUserPosts(res.data.posts);
      } catch (err) {
        console.log(`Error while Fetching user Details : ${err}`);
      }
    };
    if (userIdData) fetchData();
  }, [userIdData]);
  const handleDeletePost = (post) => {
    console.log(`PostId of the post to be deleted : `, post.id);
    console.log(`public_id of the post to be deleted : `, post);
  };
  return (
    <div className={Styles.homePageContainer}>
      <h1 className={Styles.homePageContainer_pageHeading}>Homepage</h1>
      {userPosts &&
        userPosts.map((p) => (
          <div className={Styles.homePageContainer_postBox} key={p?.id}>
            {p?.postPic
              .match(/\/duidqdysu\/(\w+)\/upload/i)[1]
              .toLowerCase() === "image" && (
              <img
                className={Styles.homePageContainer_postBox_postImg}
                src={p?.postPic}
                alt={`${p?.id} profilepic`}
              />
            )}
            {p?.postPic
              .match(/\/duidqdysu\/(\w+)\/upload/i)[1]
              .toLowerCase() === "video" && (
              <video
                className={Styles.homePageContainer_postBox_postImg}
                src={p?.postPic}
                alt={`${p?.id} profilepic`}
                autoPlay
                muted
                controls
              />
            )}
            <p className={Styles.homePageContainer_postBox_postText}>
              {p?.text}
            </p>
            <button>Edit post</button>
            <button onClick={() => handleDeletePost(p)}>Delete post</button>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
