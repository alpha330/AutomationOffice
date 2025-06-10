import Cookies from "js-cookie";
import cookie, { parse } from "cookie";

const TOKEN_KEY = "token";
const USER_ID = "user_id";
const USER_EMAIL = "email";
const USER_TYPE = "type";
const PROFILE_STORE = "profile";

// Set token in cookie (client side)
export const setToken = (token,user_id,email,type) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 روز
  Cookies.set(USER_ID, user_id, { expires: 1 }); // 1 روز
  Cookies.set(USER_EMAIL, email, { expires: 1 }); // 1 روز
  Cookies.set(USER_TYPE, type, { expires: 1 }); // 1 روز
};

export const setProfile = (profile = {}) => {
  Cookies.set(PROFILE_STORE, JSON.stringify(profile), { expires: 1 }); // 1 روز
};



// Get token from cookie (client or server)
export const getToken = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[TOKEN_KEY] || null;
  } else {
    return Cookies.get(TOKEN_KEY) || null;
  }
};

// Get Profile from cookie (client or server)
export const getProfile = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[PROFILE_STORE] || null;
  } else {
    return Cookies.get(PROFILE_STORE) || null;
  }
};

// Get Mobile from cookie (client or server)
export const getEmail = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[USER_EMAIL] || null;
  } else {
    return Cookies.get(USER_EMAIL) || null;
  }
};

export const getUserId = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[USER_ID] || null;
  } else {
    return Cookies.get(USER_ID) || null;
  }
};

export const getUserType = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[USER_TYPE] || null;
  } else {
    return Cookies.get(USER_TYPE) || null;
  }
};

// Remove token from cookie
export const removeTokenAndMobile = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_EMAIL);
  Cookies.remove(USER_ID);
  Cookies.remove(USER_TYPE);
  Cookies.remove(PROFILE_STORE);
};
