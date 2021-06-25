/* eslint-disable no-console */
import axios from "axios";

// eslint-disable-next-line prefer-destructuring
const API_URL = process.env.API_URL;

async function getSearchResults({ pageParam = 0, queryKey }) {
  const [, q] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/search?q=${q}&pageNumber=${pageParam}&resultsPerPage=10&type=both`
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export default getSearchResults;
