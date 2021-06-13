/* eslint-disable no-console */
import axios from "axios";

const API_URL = "http://localhost:4000/v1";
async function login({ email, password }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function logout() {
  try {
    const response = await axios.get(`${API_URL}/auth/logout`, {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function googleLogin({ token }) {
  try {
    const response = await axios.post(`${API_URL}/auth/login/callback/google`, {
      token,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export { login, logout, googleLogin };
