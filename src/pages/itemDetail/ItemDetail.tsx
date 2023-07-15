import React, { useState, useEffect } from "react";
import { useBeerStore } from "../../zustand/store";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import findItem from "../../helpers/findItem";
import Loader from "../../components/loader/Loader";
import styles from "./ItemDetail.module.css";

const ItemDetail: React.FC = () => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const { beers } = useBeerStore((state: any) => ({
    beers: state.beers,
  }));

  const navigate = useNavigate();
  const id: string | undefined = useParams().beerId;

  useEffect(() => {
    setLoading(true);
    if (typeof id === "string") {
      setData(findItem(beers, id));
    }
    setLoading(false);
  }, [id, beers]);

  useEffect(() => {
    if (data === undefined) navigate("/");
  }, [data, navigate]);

  return (
    <section>
      {loading || !data ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.container__image}>
            <img
              className={styles.image}
              loading="lazy"
              src={data.image_url}
              alt={`${data.name} beer`}
            />
          </div>
          <div className={styles.container__description}>
            <Button
              className={styles.button}
              variant="primary"
              size="lg"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <h2 className={styles.title}>{data.name}</h2>
            <p className={styles.subtitle}>{data.tagline}</p>
            <div className={styles.detail}>
              <p className={styles.abv}>abv: {data.abv}</p>
              <p className={styles.target}>target: {data.target_og}</p>
            </div>
            <h3 className={styles.description__title}>Description:</h3>
            <p className={styles.description}>{data.description}</p>
            <p className={styles.tips__subtitle}>Brewers tips:</p>
            <p className={styles.tips}>{data.brewers_tips}</p>
            <p className={styles.contributor}>
              Contributor: {data.contributed_by}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ItemDetail;
