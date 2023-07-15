import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import { useBeerStore } from "../../zustand/store";
import Item from "../../components/item/Item";
import takeData from "../../helpers/takeData";
import styles from "./List.module.css";

const List: React.FC = () => {
  const count = useRef<number>(0);
  const removePoint = useRef<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [items, setItems] = useState<{}[] | []>([]);

  const { beers, fetchBeers, removeBeers } = useBeerStore((state: any) => ({
    beers: state.beers,
    fetchBeers: state.fetchBeers,
    removeBeers: state.removeBeers,
  }));

  // ! Life Cycle
  useEffect(() => {
    if (count.current === 0) {
      fetchBeers("start");
      count.current = 1;
    }
  }, [fetchBeers]);

  useEffect(() => {
    setItems(takeData(beers, point, 15));
  }, [beers, point]);

  useEffect(() => {
    if (items.length < 15 && removePoint.current === 1) {
      fetchBeers("other");
      removePoint.current = 0;
    }
  }, [items, fetchBeers]);

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
    removeBeers(selectedItems);
    if (selectedItems.lenght <= point) {
      setPoint((prevState) => prevState - selectedItems.length);
    }
    setSelectedItems([]);
    setItems(takeData(beers, 0, 15));
    removePoint.current = 1;
  };

  const handleScroll = (event: any) => {
    event.preventDefault();
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    console.log("SCROLL", scrollTop, clientHeight, scrollHeight);
    if (scrollTop + clientHeight === 1304) {
      console.log("scroll", point);
      removePoint.current = 1;
      setPoint((prevState) => prevState + 15);
    }
  };

  useEffect(() => {
    if (point >= 15) {
      console.log("POINT");
      setItems(takeData(beers, point, 15));
      //setPoint(10);
    }
  }, [point, beers, setPoint]);

  //console.log("beers", beers, items);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Beers List</h1>
      {items.length > 0 ? (
        <ul
          className={styles.list}
          onScroll={throttle((event) => {
            handleScroll(event);
          }, 300)}
        >
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
                    style={
                      selectedItems.includes(el.id) ? "included" : "excluded"
                    }
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
        <Button
          className={styles.button}
          variant="danger"
          size="lg"
          onClick={removeItems}
        >
          Remove items
        </Button>
      )}
    </div>
  );
};

export default List;
