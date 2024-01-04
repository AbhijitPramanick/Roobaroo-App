import React from "react";
import Styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={Styles.footer}>
      <div className={Styles.footerLinks}>
        <ul className={Styles.footerLinksList}>
          <li>
            <a href="https://twitter.com/codebucketsIN">Twitter</a>
          </li>
          <li>
            <a href="https://www.instagram.com/codebucket_lab/">Instagram</a>
          </li>
          <li>
            <a href="https://www.facebook.com/codebuckets/">Facebook</a>
          </li>
          <li>
            <a href="https://www.youtube.com/@codebucketsolutions4862">
              Youtube
            </a>
          </li>
        </ul>
        <span>© 2024 Roobaroo from Codebucket Solutions Pvt Ltd.</span>
      </div>
    </div>
  );
};

export default Footer;
