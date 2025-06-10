import Cookies from "js-cookie";
import cookie, { parse } from "cookie";

const TOKEN_KEY = "token";
const MOBILE_STORE = "mobile";
const PROFILE_STORE = "profile";

// Set token in cookie (client side)
export const setToken = (token,mobile) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 روز
  Cookies.set(MOBILE_STORE, mobile, { expires: 7 }); // 7 روز
};

export const setProfile = (profile = {}) => {
  Cookies.set(PROFILE_STORE, JSON.stringify(profile), { expires: 7 }); // 7 روز
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
export const getMobile = (req = null) => {
  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies[MOBILE_STORE] || null;
  } else {
    return Cookies.get(MOBILE_STORE) || null;
  }
};

// Remove token from cookie
export const removeTokenAndMobile = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(MOBILE_STORE);
  Cookies.remove(PROFILE_STORE);
};
