/* eslint-disable no-console */
import axios from "axios";

// eslint-disable-next-line prefer-destructuring
const API_URL = process.env.API_URL;

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
async function registerUser({ email, password, displayName, recaptcha }) {
  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        email,
        password,
        name: displayName,
        username:
          email.split("@")[0].replace(/-/g, "_") +
          Math.round(Math.random() * 100),
        recaptcha,
      },
      { withCredentials: true }
    );
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
async function passwordResetInitiate({ email, recaptcha }) {
  try {
    const response = await axios.post(`${API_URL}/auth/resetpassword`, {
      email,
      recaptcha,
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
async function confirmAccount({ token }) {
  try {
    const response = await axios.get(`${API_URL}/user/activate/${token}`);
    return response;
  } catch (e) {
    throw new Error(e);
  }
}
export {
  login,
  logout,
  googleLogin,
  confirmAccount,
  passwordResetFinish,
  refreshToken,
  changeUsername,
  passwordResetInitiate,
  registerUser,
};
