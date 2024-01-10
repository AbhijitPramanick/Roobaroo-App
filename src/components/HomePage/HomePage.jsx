import Styles from "./HomePage.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const HomePage = ({ userIdData }) => {
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [postIdSelected, setPostIdSelected] = useState(null);
  const [editText, setEditText] = useState("");
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
  const handleUpdatePost = async (post) => {
    const updatedPosts = userPosts.filter((p) => p.id !== post.id);
    const editedPost = {
      id: post.id,
      text: editText || post.text,
      postPic: post.postPic,
    };
    console.log(`postId : `, post.id);
    console.log(`UpdatedPosts : `, updatedPosts);
    console.log(`Edited posts : `, editedPost);
    updatedPosts.push(editedPost);
    axios
      .patch(`http://localhost:3000/users/${userIdData}`, {
        posts: updatedPosts,
      })
      .then((response) => {
        console.log("Update successful:", response.data);
        setIsEditing(false);
        setEditText("");
        fetchData();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Handle error if needed
      });
  };

  const handleEditPost = (post) => {
    setIsEditing((p) => !p);
    setPostIdSelected(post.id);
  };

  return (
    <div className={Styles.homePageContainer}>
      <h1 className={Styles.homePageContainer_pageHeading}>Homepage</h1>
      <div className={Styles.homePageContainer_postLists}>
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

              <div className={Styles.postActionBtnDiv}>
                <button
                  onClick={() => handleEditPost(p)}
                  className={Styles.postActionBtn}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(p)}
                  className={Styles.postActionBtn}
                >
                  Delete post
                </button>
              </div>

              {isEditing && p.id === postIdSelected && (
                <div className={Styles.postEditBox}>
                  <textarea
                    value={editText}
                    className={Styles.editTextDisplay}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdatePost(p)}
                    className={Styles.postActionBtn}
                  >
                    update
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
