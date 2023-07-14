import axios from "axios";

const BASE_URL = "https://api.punkapi.com/v2/beers";

const getData = async (page: number) => {
  try {
    const req = await axios.get(`${BASE_URL}?page=${page}`);
    return req.data;
  } catch (err) {
    return err;
  }
};

export default getData;
