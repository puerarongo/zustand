import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { throttle } from "lodash";
import { Link } from "react-router-dom";
import {
  useBeerStore,
  useItemsStore,
  usePointStore,
} from "../../zustand/store";
import Item from "../../components/item/Item";
import styles from "./List.module.css";

const List: React.FC = () => {
  const count = useRef<number>(0);
  const removePoint = useRef<number>(0);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const { beers, fetchBeers, removeBeers, refreshBeersList } = useBeerStore(
    (state: any) => ({
      beers: state.beers,
      fetchBeers: state.fetchBeers,
      removeBeers: state.removeBeers,
      refreshBeersList: state.refreshBeersList,
    })
  );

  const { items, addItems, refreshItems } = useItemsStore((state: any) => ({
    items: state.items,
    addItems: state.addItems,
    refreshItems: state.refreshItems,
  }));

  const { point, pointOperation, refreshPoint } = usePointStore(
    (state: any) => ({
      point: state.point,
      pointOperation: state.pointOperation,
      refreshPoint: state.refreshPoint,
    })
  );

  // ! Life Cycle
  useEffect(() => {
    if (count.current === 0 && beers.length === 0) {
      fetchBeers("start");
      count.current = 1;
    }
  }, [fetchBeers, beers]);

  useEffect(() => {
    addItems(beers, point);
  }, [beers, point, addItems]);

  useEffect(() => {
    if (items.length < 15 && removePoint.current === 1) {
      fetchBeers("other");
      removePoint.current = 0;
    }
  }, [items, fetchBeers]);

  useEffect(() => {
    if (point >= 5) addItems(beers, point);
  }, [point, beers, addItems]);

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

  const refreshHandler = () => {
    console.log("REFRESH!");
    refreshBeersList();
    refreshItems();
    refreshPoint();
    window.location.reload();
  };

  const removeItems = () => {
    removeBeers(selectedItems);
    if (selectedItems.lenght <= point) {
      pointOperation(point - selectedItems.length);
    }
    setSelectedItems([]);
    addItems(beers, 0);
    removePoint.current = 1;
  };

  const handleScroll = (event: any) => {
    event.preventDefault();

    const { scrollTop, clientHeight, scrollHeight } = event.target;
    console.log("SCROLL", scrollTop, clientHeight, scrollHeight);
    if (scrollTop + clientHeight === 1304) {
      event.target.scrollTop = 430;
      removePoint.current = 1;
      pointOperation(point + 5);
    } else if (scrollTop + clientHeight === 428 && point > 0) {
      event.target.scrollTop = 430;
      removePoint.current = 1;
      pointOperation(point - 5);
    }
  };

  console.log("beers", beers.length, point);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Beers List</h1>
      {items.length > 0 ? (
        <ul
          className={styles.list}
          onScroll={throttle((event) => {
            handleScroll(event);
          }, 400)}
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
      <div className={styles.buttons__container}>
        <Button
          className={styles.button__refresh}
          variant="success"
          size="lg"
          onClick={refreshHandler}
        >
          Refresh list
        </Button>
        {selectedItems.length > 0 && (
          <Button
            className={styles.button__remove}
            variant="danger"
            size="lg"
            onClick={removeItems}
          >
            Remove items
          </Button>
        )}
      </div>
    </div>
  );
};

export default List;
