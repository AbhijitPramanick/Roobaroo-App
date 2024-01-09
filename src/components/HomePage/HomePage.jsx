import Styles from "./HomePage.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const HomePage = ({ userIdData }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${userIdData}`);
      console.log(res);
      setUser(res.data);
      setUserPosts(res.data.posts);
    } catch (err) {
      console.log(`Error while Fetching user Details : ${err}`);
    }
  };
  useEffect(() => {
    if (userIdData) fetchData();
  }, [userIdData]);
  const handleDeletePost = async (post) => {
    console.log(`PostId of the post to be deleted : `, post.id);
    console.log(`public_id of the post to be deleted : `, post);
    const updatedPosts = userPosts.filter((p) => p.id !== post.id);
    await axios.patch(`http://localhost:3000/users/${userIdData}`, {
      posts: [...updatedPosts],
    });
    fetchData();
    console.log(`Post with postId ${post.id} deleted.`);
  };
  return (
    <div className={Styles.homePageContainer}>
      <h1 className={Styles.homePageContainer_pageHeading}>Homepage</h1>
      {userPosts &&
        userPosts.map((p) => (
          <div className={Styles.homePageContainer_postBox} key={p?.id}>
            {!isEditing &&
              p?.postPic
                .match(/\/duidqdysu\/(\w+)\/upload/i)[1]
                .toLowerCase() === "image" && (
                <img
                  className={Styles.homePageContainer_postBox_postImg}
                  src={p?.postPic}
                  alt={`${p?.id} profilepic`}
                />
              )}
            {!isEditing &&
              p?.postPic
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
            {isEditing && (
              <p className={Styles.homePageContainer_postBox_postText}>
                {p?.text}
              </p>
            )}
            {!isEditing && (
              <>
                <button
                  onClick={() => handleDeletePost(p)}
                  className={Styles.deletePostBtn}
                >
                  Delete post
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default HomePage;
