import React, { useEffect, useState } from "react";
import Styles from "./Chatbox.module.css";
import { IoSend } from "react-icons/io5";
import axios from "axios";
const ChatBox = ({ selfUser, friendUser }) => {
  const [chatId, setChatId] = useState("");
  const [userTotalChats, setUserTotalChats] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [inputChatText, setInputChatText] = useState("");

  // Setting the ChatId from the selfUser object coresponding to the friendUser ID listed in the friends array
  useEffect(() => {
    console.log(
      "*********",
      (selfUser?.friends?.find((f) => f.id === friendUser.id)).chatId
    );
    setChatId((selfUser?.friends?.find((f) => f.id === friendUser.id)).chatId);
  }, []);

  //Setting the total user chats from the UserChats database
  useEffect(() => {
    console.log(`ChatId : `, chatId);

    axios
      .get(`http://localhost:3001/userchats`)
      .then((res) => setUserTotalChats(res.data))
      .catch((err) => console.log(`Error while fetching user chats : ${err}`));
  }, [chatId]);

  //Setting the userChats state from the userChats database using the chatId
  useEffect(() => {
    {
      setUserChats(userTotalChats?.find((c) => c.id === chatId));
    }
  }, [userTotalChats]);

  //following function saves the chats sent by the user in the chats database.
  const handleSendChat = () => {
    setUserChats((prevUserChats) => {
      const updatedChats = [
        ...prevUserChats?.chats,
        {
          sender: selfUser.id,
          msg: inputChatText,
        },
      ];

      // Update the userChats state
      return {
        ...prevUserChats,
        chats: updatedChats,
      };
    });

    // Now, make the axios patch request
    axios.patch(`http://localhost:3001/userChats/${chatId}`, {
      id: chatId,
      chats: [
        ...userChats?.chats,
        {
          sender: selfUser.id,
          msg: inputChatText,
        },
      ],
    });

    setInputChatText("");
  };

  return (
    <div className={Styles.chatBoxContainer}>
      <div className={Styles.chatBoxContainer_box}>
        {userChats?.chats?.map((c) => {
          return c.sender === selfUser.id ? (
            <div className={Styles.chatRight} key={c.id}>
              <span className={Styles.chatbox_userName}>You</span>
              <p className={Styles.chatText}>{c.msg}</p>
            </div>
          ) : (
            <div className={Styles.chatLeft} key={c.id}>
              <span className={Styles.chatbox_userName}>
                {friendUser.fullname.split(" ")[0]}
              </span>
              <p className={Styles.chatText}>{c.msg}</p>
            </div>
          );
        })}
      </div>

      <div className={Styles.chatEnterbox}>
        <textarea
          className={Styles.chatEnterbox_dialougeBox}
          name="dialougeBox"
          id="dialougeBox"
          cols="30"
          rows="2"
          placeholder="Enter message"
          value={inputChatText}
          onChange={(e) => setInputChatText(e.target.value)}
        />
        <button
          className={Styles.chatEnterbox_sendBtn}
          onClick={handleSendChat}
        >
          <IoSend className={Styles.chatEnterbox_sendBtn_icon} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
