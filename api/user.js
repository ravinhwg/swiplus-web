import axios from "axios";

const API_URL = "http://localhost:4000/v1";
async function getUser({ queryKey }) {
  const [, username, token] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/user/${username}`,
      token !== undefined
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function getUserDecks({ pageParam = 0, queryKey }) {
  const [, userId] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/user/${userId}/decks?pageNumber=${pageParam}&resultsPerPage=10`
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function placeFollow({ id, active, token }) {
  try {
    const response = await axios.post(
      `${API_URL}/user/follow`,
      {
        id,
        active,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function editUser({ name, bio, link, token }) {
  try {
    const response = await axios.put(
      `${API_URL}/user`,
      {
        name,
        bio: bio.length === 0 ? undefined : bio,
        link: link.length === 0 ? undefined : link,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function uploadProfilePicture({ token, formData, userId }) {
  try {
    const response = await axios.post(
      `${API_URL}/user/${userId}/pic`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function grabNotifications({ pageParam = 0, queryKey }) {
  const [, token] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/users/notifs?pageNumber=${pageParam}&resultsPerPage=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
export {
  getUser,
  getUserDecks,
  placeFollow,
  editUser,
  uploadProfilePicture,
  grabNotifications,
};
