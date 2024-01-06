import React, { useEffect, useState } from "react";
import Styles from "./Friends.module.css";
import axios from "axios";
import FriendDetailBox from "../FriendDetailBox/FriendDetailBox";
import { v4 as uuidv4 } from "uuid";

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

  // ---------------------------------------------------------------
  const handleUnfriend = async (friendId) => {
    console.log(friendId);
    if (user) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          friends: user?.friends.filter((friend) => friend.id !== friendId),
        });
        const updatedUser = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(updatedUser.data);

        // Fetch and update toBeFriend user
        const response = await axios.get(
          `http://localhost:3000/users/${friendId}`
        );
        console.log(response);
        console.log(`response.data : `, response.data);
        const toBeUnfriendUserData = response.data;
        console.log(`toBeUnfriendUserData: `, toBeUnfriendUserData);
        await axios.patch(
          `http://localhost:3000/users/${toBeUnfriendUserData.id}`,
          {
            friends: toBeUnfriendUserData?.friends.filter(
              (friend) => friend.id !== user.id
            ),
          }
        );
      } catch (err) {
        console.log(`Error while unFriending friendId ${friendId}, ${err}`);
      }
    }
  };

  // ---------------------------------------------------------------
  const handleBefriend = async (nonFriendId) => {
    const chatId = uuidv4();
    if (user) {
      console.log(nonFriendId);
      try {
        // Update user
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          friends: [...user?.friends, { id: nonFriendId, chatId: chatId }],
        });

        // Fetch updated user data
        const updatedUser = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(updatedUser.data);

        // Fetch and update toBeFriend user
        const response = await axios.get(
          `http://localhost:3000/users/${nonFriendId}`
        );
        const toBeFriendUserData = response.data;
        console.log(`toBeFriendUserData: `, toBeFriendUserData);

        await axios.patch(
          `http://localhost:3000/users/${toBeFriendUserData.id}`,
          {
            friends: [
              ...toBeFriendUserData?.friends,
              { id: user.id, chatId: chatId },
            ],
          }
        );
        const chatsResponse = await axios.get(
          `http://localhost:3001/userchats`
        );
        const totalUserChats = chatsResponse.data;

        await axios.post(`http://localhost:3001/userchats`, {
          id: chatId,
          chats: [],
        });
      } catch (err) {
        console.log(
          `Error while befriending nonFriendId ${nonFriendId}, ${err}`
        );
      }
    }
  };
  // ---------------------------------------------------------------

  //Returning the JSX
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
              <FriendDetailBox
                key={u.id}
                userDetails={u}
                action={"isFriend"}
                handleFrndAction={handleUnfriend}
              />
            ))
          : nonFriendsArr.map((u) => (
              <FriendDetailBox
                key={u.id}
                userDetails={u}
                action={"isNonFriend"}
                handleFrndAction={handleBefriend}
              />
            ))}
      </div>
    </div>
  );
};

export default Friends;
