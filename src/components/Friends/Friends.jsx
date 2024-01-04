import React, { useEffect, useState } from "react";
import Styles from "./Friends.module.css";
import axios from "axios";
const Friends = ({ userIdData }) => {
  const [isAddFriends, setIsAddFriends] = useState(1);
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [friendsArr, setFriendsArr] = useState([]);
  const [nonFriendsArr, setNonFriendsArr] = useState([]);

  useEffect(() => {
    setUserId(userIdData);
    axios
      .get(`http://localhost:3000/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(`Error while fetching users : ${err}`));
  }, []);

  useEffect(() => {
    if (users) {
      const userDetails = users?.find((user) => user.id === userId);
      setUser(userDetails);
    }
  }, [users]);

  useEffect(() => {
    if (users) {
      const friendsIdArr = user?.friends?.map((friend) => friend.id);
      setFriendsArr(users.filter((u) => friendsIdArr.includes(u.id)));
      setNonFriendsArr(
        users.filter((u) => u.id !== userId && !friendsIdArr.includes(u.id))
      );
    }
  }, [user]);

  const handleUnfriend = async (friendId) => {
    if (user) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          friends: user?.friends.filter((friend) => friend.id !== friendId),
        });
        const updatedUser = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(updatedUser.data);
      } catch (err) {
        console.log(`Error while unfriending friendId ${friendId} : ${err}`);
      }
    }
  };

  const handleBefriend = async (nonFriendId) => {
    if (user) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          friends: [...user?.friends, { id: nonFriendId }],
        });
        const updatedUser = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(updatedUser.data);
      } catch (err) {
        console.log(
          `Error while befriending nonFriendId ${nonFriendId}, ${err}`
        );
      }
    }
  };
  return (
    <div className={Styles.friendsContainer}>
      <div className={Styles.topBtnBox}>
        <button
          className={Styles.topBtnBox_btn}
          onClick={() => setIsAddFriends((p) => !p)}
        >
          {isAddFriends ? "Add Friends?" : "Show Friends?"}
        </button>
      </div>
      <h1 className={Styles.displayUser_opHeading}>
        {!isAddFriends ? "Other People" : "Your friends"}
      </h1>
      <div className={Styles.displayUsers_list}>
        {isAddFriends
          ? friendsArr.map((u) => (
              <div className={Styles.displayUser}>
                <img
                  className={Styles.displayUser_profilePic}
                  src={u?.profilePic}
                  alt={`${u?.fullname.split(" ")[0]}'s profile picture`}
                />
                <p className={Styles.displayUser_fullname}>{u?.fullname}</p>
                <button
                  className={Styles.displayUser_btn}
                  onClick={() => handleUnfriend(u.id)}
                >
                  Unfriend
                </button>
              </div>
            ))
          : nonFriendsArr.map((u) => (
              <div className={Styles.displayUser}>
                <img
                  className={Styles.displayUser_profilePic}
                  src={u?.profilePic}
                  alt={`${u?.fullname.split(" ")[0]}'s profile picture`}
                />
                <p className={Styles.displayUser_fullname}>{u?.fullname}</p>
                <button
                  className={Styles.displayUser_btn}
                  onClick={() => handleBefriend(u.id)}
                >
                  Befriend
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Friends;
