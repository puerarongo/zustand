import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useBearStore } from "../../zustand/store";
import Item from "../../components/item/Item";
import takeData from "../../helpers/takeData";
import styles from "./List.module.css";

const List: React.FC = () => {
  const [items, setItems] = useState<{}[] | []>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const { bears, fetchBears, removeBears } = useBearStore((state: any) => ({
    bears: state.bears,
    fetchBears: state.fetchBears,
    removeBears: state.removeBears,
  }));

  // ! Life Cycle
  useEffect(() => {
    fetchBears("start");
  }, [fetchBears]);

  useEffect(() => {
    console.log("!!!");
    setItems(takeData(bears, 0, 15));
  }, [bears]);

  useEffect(() => {
    console.log(333);
    if (items.length < 15) fetchBears("other");
  }, [items, fetchBears]);

  //useEffect(() => {
  //  console.log(999, selectedItems);
  //}, [selectedItems]);

  // ! Func
  const handleRightClick = (event: any, id: number) => {
    event.preventDefault();
    if (selectedItems.includes(id)) {
      const newSelect = selectedItems.filter((el: number) => el !== id);
      setSelectedItems([...newSelect]);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const removeItems = () => {
    removeBears(selectedItems);
    setSelectedItems([]);
    setItems(takeData(bears, 0, 15));
    console.log("REMOVE", items);
  };
  console.log("bears", bears);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bears List</h1>
      {items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((el: any) => {
            return (
              <Link className={styles.link} to={`${el.id}`} key={el.id}>
                <li
                  className={styles.item}
                  onContextMenu={(event) => handleRightClick(event, el.id)}
                >
                  <Item
                    name={el.name}
                    tagline={el.tagline}
                    date={el.first_brewed}
                  />
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <h2>No one item</h2>
      )}
      {selectedItems.length > 0 && (
        <Button variant="danger" onClick={removeItems}>
          Remove items
        </Button>
      )}
    </div>
  );
};

export default List;
