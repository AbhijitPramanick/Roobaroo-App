import React from "react";
import Styles from "./FriendDetailBox.module.css";
const FriendDetailBox = ({ userDetails, action, handleFrndAction }) => {
  return (
    <div className={Styles.displayUser} key={userDetails.id}>
      <img
        className={Styles.displayUser_profilePic}
        src={userDetails?.profilePic}
        alt={`${userDetails?.fullname?.split(" ")[0]}'s profile picture`}
      />
      <p className={Styles.displayUser_fullname}>{userDetails?.fullname}</p>
      <button
        className={Styles.displayUser_btn}
        onClick={() => handleFrndAction(userDetails.id)}
      >
        {action === "isFriend" && "UnFriend"}
        {action === "isNonFriend" && "Befriend"}
        {action === "doMessage" && "Message"}
      </button>
    </div>
  );
};

export default FriendDetailBox;
