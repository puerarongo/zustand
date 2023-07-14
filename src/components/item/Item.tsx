import React from "react";
import IItem from "../../helpers/interfaces/Item.interface";
import styles from "./Item.module.css";

const Item: React.FC<IItem> = ({ name, tagline, date, style }) => {
  return (
    <div
      className={
        style === "included" ? styles.container__include : styles.container
      }
    >
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default Item;
