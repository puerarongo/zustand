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
import Loader from "../../components/loader/Loader";
import IBeer from "../../helpers/interfaces/beer.interface";
import styles from "./List.module.css";

const List: React.FC = () => {
  const count = useRef<number>(0);
  const removePoint = useRef<number>(0);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
  const handleRightClick = <T extends HTMLElement>(
    event: React.MouseEvent<T>,
    id: number
  ) => {
    event.preventDefault();
    if (selectedItems.includes(id)) {
      const newSelect = selectedItems.filter((el: number) => el !== id);
      setSelectedItems([...newSelect]);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const refreshHandler = () => {
    refreshBeersList();
    refreshItems();
    refreshPoint();
    window.location.reload();
  };

  const removeItems = () => {
    removeBeers(selectedItems);
    if (selectedItems.length <= point) {
      pointOperation(point - selectedItems.length);
    }
    setSelectedItems([]);
    addItems(beers, 0);
    removePoint.current = 1;
  };

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    event.preventDefault();
    let { scrollTop, clientHeight } = event.target as HTMLElement;

    if (scrollTop + clientHeight === 1304) {
      (event.target as HTMLElement).scrollTop = 430;
      removePoint.current = 1;
      pointOperation(point + 5);
    } else if (scrollTop + clientHeight === 428 && point > 0) {
      (event.target as HTMLElement).scrollTop = 430;
      removePoint.current = 1;
      pointOperation(point - 5);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Beers List</h1>
      {beers.length === 0 ? (
        <Loader />
      ) : (
        <>
          {items.length > 0 ? (
            <ul className={styles.list} onScroll={throttle(handleScroll, 400)}>
              {items.map(({ id, name, tagline, first_brewed }: IBeer) => {
                return (
                  <Link className={styles.link} to={`${id}`} key={id}>
                    <li
                      className={styles.item}
                      onContextMenu={(event) =>
                        handleRightClick<HTMLLIElement>(event, id)
                      }
                    >
                      <Item
                        name={name}
                        tagline={tagline}
                        date={first_brewed}
                        style={
                          selectedItems.includes(id) ? "included" : "excluded"
                        }
                      />
                    </li>
                  </Link>
                );
              })}
            </ul>
          ) : (
            <div className={styles.contaner__notitem}>
              <h2 className={styles.title__notitem}>No one item</h2>
            </div>
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
        </>
      )}
    </div>
  );
};

export default List;
