/* eslint-disable no-console */
import axios from "axios";

const API_URL = "http://api.swiplus.com/v1";
async function uploadDeck({ formdata, token }) {
  try {
    const response = await axios.post(`${API_URL}/decks`, formdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function getDeck({ queryKey }) {
  const [, deckId, token] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/decks/${deckId}`,
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
async function getExplorerFeed({ pageParam = 0 }) {
  try {
    const response = await axios.get(
      `${API_URL}/feed/explorer?pageNumber=${pageParam}&resultsPerPage=10`
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function placeComment({ comment, token, deckId }) {
  try {
    const response = await axios.post(
      `${API_URL}/decks/${deckId}/comments`,
      {
        commentText: comment,
        isReply: false,
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
async function placeLike({ token, deckId, active }) {
  try {
    const response = await axios.post(
      `${API_URL}/decks/${deckId}/like`,
      {
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

async function getComments({ pageParam = 0, queryKey }) {
  const [, deckId, token] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/decks/${deckId}/comments?pageNumber=${pageParam}&resultsPerPage=10`,
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
async function deleteComments({ commentId, token }) {
  try {
    const response = await axios.delete(
      `${API_URL}/decks/comments/${commentId}`,
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

async function placeCommentLike({ commentId, active, token }) {
  try {
    const response = await axios.post(
      `${API_URL}/decks/comments/${commentId}/like`,
      {
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

async function replyComment({ commentId, replyText, token, deckId }) {
  try {
    const response = await axios.post(
      `${API_URL}/decks/${deckId}/comments`,
      {
        commentText: replyText,
        isReply: true,
        replyingTo: +commentId,
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
async function getReply({ pageParam = 0, queryKey }) {
  const [, commentId, token] = queryKey;
  try {
    const response = await axios.get(
      `${API_URL}/decks/comments/${commentId}/replies?pageNumber=${pageParam}&resultsPerPage=10`,
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

export {
  uploadDeck,
  getReply,
  getExplorerFeed,
  deleteComments,
  replyComment,
  getDeck,
  placeCommentLike,
  placeComment,
  getComments,
  placeLike,
};
