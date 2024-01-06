import React, { useEffect, useState } from "react";
import Styles from "./SideBar.module.css";
import { GoHome } from "react-icons/go";
import { TbFriends } from "react-icons/tb";
import { SlPaperPlane } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
const SideBar = ({ sideBarActionFunc }) => {
  // const navigate = useNavigate();

  return (
    <div className={Styles.sideBarContainer}>
      <div className={Styles.logoBox}>
        <img src="/images/logo/logo1.png" alt="Logo Image" />
      </div>
      <div className={Styles.navListBox}>
        <ul className={Styles.navList}>
          <li>
            <GoHome />
            <a onClick={() => sideBarActionFunc("homepage")}>Home</a>
          </li>
          <li>
            <TbFriends />
            <a onClick={() => sideBarActionFunc("friends")}>Friends</a>
          </li>

          <li>
            <SlPaperPlane />
            <a onClick={() => sideBarActionFunc("messages")}>Messages</a>
          </li>
          <li>
            <CgProfile />
            <a onClick={() => sideBarActionFunc("profile")}>Profile</a>
          </li>
          <li>
            <IoCreateOutline />
            <a onClick={() => sideBarActionFunc("create")}>Create</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
