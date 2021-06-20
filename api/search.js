/* eslint-disable no-console */
import axios from "axios";

const API_URL = "http://localhost:4000/v1";

async function getSearchResults({ pageParam = 0, queryKey }) {
  const [key, q] = queryKey;
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
