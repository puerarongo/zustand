import React from "react";
import { ProgressBar } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Container: React.FC = () => {
  return (
    <div className={styles.container}>
      <ProgressBar
        height="200"
        width="200"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="#615C5C"
        barColor="#E90B0B"
      />
    </div>
  );
};

export default Container;
