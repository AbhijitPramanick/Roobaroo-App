import React from "react";
import Styles from "./MessagesPage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import FriendDetailBox from "../FriendDetailBox/FriendDetailBox";
import ChatBox from "../ChatBox/ChatBox";

const MessagesPage = ({ userIdData }) => {
  const [user, setUser] = useState({});
  const [friendsArr, setFriendsArr] = useState([]);
  const [users, setUsers] = useState([]);
  const [enableDialougeBox, setEnableDialouge] = useState(false);
  const [friendUser, setFriendUser] = useState({});
  useEffect(() => {
    //Fetching the whole users Database
    axios
      .get(`http://localhost:3000/users`)
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.log(`Error while fetching users database : ${err}`)
      );

    //Fetching the whole user details using userId props
    axios
      .get(`http://localhost:3000/users/${userIdData}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(`Error fetching user details : ${err}`));
  }, []);

  useEffect(() => {
    if (users) {
      const friendsIdArr = user?.friends?.map((friend) => friend.id);
      setFriendsArr(users.filter((u) => friendsIdArr.includes(u.id)));
    }
  }, [user]);

  const handleMessage = (friendUserId) => {
    setFriendUser(users.find((u) => u.id === friendUserId));
    setEnableDialouge(true);
  };

  return (
    <div className={Styles.messagesPageContainer}>
      <div className={Styles.messagesPageContainer_topSection}>
        <h1 className={Styles.messagesPageContainer_heading}>Chats</h1>
        {enableDialougeBox && (
          <button
            className={Styles.messagesPageContainer_crossBtn}
            onClick={() => setEnableDialouge(false)}
          >
            <IoMdCloseCircleOutline className={Styles.crosscirle} />
          </button>
        )}
      </div>
      {!enableDialougeBox ? (
        <div className={Styles.displayUsers_list}>
          {friendsArr.length &&
            friendsArr.map((u) => (
              <FriendDetailBox
                key={u.id}
                userDetails={u}
                action={"doMessage"}
                handleFrndAction={handleMessage}
              />
            ))}
        </div>
      ) : (
        <ChatBox selfUser={user} friendUser={friendUser} />
      )}
    </div>
  );
};

export default MessagesPage;
