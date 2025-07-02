import Cookies from "js-cookie";

const TOKEN_KEY = "token";
const USER_ID = "user_id";
const USER_EMAIL = "email";
const USER_TYPE = "type";
const LOGGED = "logged";

// Set token in cookie (client side)
export const setToken = (token,user_id,email,type,logged) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 }); // 1 روز
  Cookies.set(USER_ID, user_id, { expires: 1 }); // 1 روز
  Cookies.set(USER_EMAIL, email, { expires: 1 }); // 1 روز
  Cookies.set(USER_TYPE, type, { expires: 1 }); // 1 روز
  Cookies.set(LOGGED, logged, { expires: 1 }); // 1 روز
};

export const getToken = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("token")
  }
}

export const getUserId = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("user_id")
  }
}

export const getEmail = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("email")
  }
}

export const getType = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("type")
  }
}

export const getLogged = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("logged")
  }
}


export const removeToken = () => {
  if (typeof window !== "undefined") {
      Cookies.remove("token");
      Cookies.remove("user_id");
      Cookies.remove("email");
      Cookies.remove("type");
      Cookies.set(LOGGED, false); 
  }
}