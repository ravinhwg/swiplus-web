/* eslint-disable no-console */
import axios from "axios";
import API_URL from "./API_URL";

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
    const response = await axios.post(
      `${API_URL}/auth/login/callback/google`,
      {
        token,
      },
      { withCredentials: true }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function refreshToken() {
  try {
    const response = await axios.get(`${API_URL}/auth/refresh`, {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
}

async function changeUsername({ active, username, token }) {
  try {
    const response = await axios.put(
      `${API_URL}/auth/username`,
      {
        change: active,
        username,
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
async function registerUser({ email, password, displayName }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        email,
        password,
        name: displayName,
        username: email.split("@")[0] + Math.round(Math.random() * 100),
      },
      { withCredentials: true }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function passwordResetInitiate({ email }) {
  try {
    const response = await axios.post(`${API_URL}/auth/resetpassword`, {
      email,
    });
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function passwordResetFinish({ password, token }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/resetpassword/${token}`,
      {
        password,
      }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
export {
  login,
  logout,
  googleLogin,
  passwordResetFinish,
  refreshToken,
  changeUsername,
  passwordResetInitiate,
  registerUser,
};
