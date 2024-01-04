import React, { useEffect, useState } from "react";
import styles from "./inputFormFlower.module.css";
const InputFormFlower = () => {
  const images = [
    "/images/flowers/flower1.png",
    "/images/flowers/flower2.png",
    "/images/flowers/flower3.png",
    "/images/flowers/flower4.png",
    "/images/flowers/flower5.png",
  ];
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImgIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={styles.inputFormFlower}>
      <img
        src={images[imgIndex]}
        alt="flower image"
        className={styles.flower}
      />
    </div>
  );
};

export default InputFormFlower;
