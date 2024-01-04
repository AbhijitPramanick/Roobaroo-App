import React, { useState } from "react";
import styles from "./inputForm.module.css";

const InputForm = ({
  pageType,
  hasEmail,
  hasUserName,
  hasFullName,
  hasPassword,
  sendDataToParentfunc,
}) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const clearInputField = () => {
    setEmail("");
    setUserName("");
    setPassword("");
    setFullName("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pageType);
    if (pageType === "login") {
      sendDataToParentfunc(email, password);
    }
    if (pageType === "signUp") {
      sendDataToParentfunc(email, userName, password, fullName);
    }
    clearInputField();
  };

  return (
    <div className={styles.inputForm}>
      <div className={styles.logoImg}>
        <img src="/images/logo/logo1.png" alt="logoImage" />
      </div>
      <div className={styles.signUpInfo}>
        {pageType === "signUp" ? (
          <p>Sign up to see photos and videos from your friends.</p>
        ) : (
          ""
        )}
        {pageType === "login" ? (
          <p>Login to see photos and videos from your friends.</p>
        ) : (
          ""
        )}
      </div>

      <form className={styles.inputFieldBoxForm} onSubmit={handleSubmit}>
        <div className={styles.inputFieldBox}>
          <div>
            {hasEmail ? (
              <input
                type="email"
                placeholder="Enter email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              ""
            )}
            {hasFullName ? (
              <input
                type="text"
                placeholder="Enter full name"
                className={styles.inputField}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            ) : (
              ""
            )}
            {hasUserName ? (
              <input
                type="text"
                placeholder="Enter username"
                className={styles.inputField}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            ) : (
              ""
            )}
            {hasPassword ? (
              <input
                type="password"
                placeholder="Enter Password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
          {pageType === "signUp" ? (
            <div className={styles.moreInfo}>
              <p className={styles.moreInfoP1}>
                People who use our service may have uploaded your contact
                information to Instagram. <a href="#">Learn more</a>
              </p>
              <p className={styles.moreInfoP2}>
                By signing up, you agree to our Terms, Privacy Policy and
                Cookies Policy.
              </p>
            </div>
          ) : (
            ""
          )}
          {pageType === "login" ? (
            <div className={styles.moreInfo}>
              <p className={styles.moreInfoP1}>
                Forgotten your Password? <a href="#">Click here</a>
              </p>
            </div>
          ) : (
            ""
          )}
          {pageType === "signUp" ? (
            <button className={styles.signUpBtn} type="submit">
              Sign up
            </button>
          ) : (
            ""
          )}
          {pageType === "login" ? (
            <button className={styles.signUpBtn} type="submit">
              Login
            </button>
          ) : (
            ""
          )}
        </div>
      </form>

      {pageType === "signUp" ? (
        <div className={styles.askLogin}>
          <span>Have an account?</span>
          <a href="/">Log in</a>
        </div>
      ) : (
        ""
      )}
      {pageType === "login" ? (
        <div className={styles.askLogin}>
          <span>Don't have an account?</span>
          <a href="/signup">Sign up</a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputForm;
