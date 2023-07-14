import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Container.module.css";

const Container: React.FC = () => {
  return (
    <section className={styles.container}>
      <Outlet />
    </section>
  );
};

export default Container;
