import Cookies from "js-cookie";

const FIRST_NAME = "first_name";
const LAST_NAME = "last_name";
const PROFILE_IMAGE = "image";
const USER_PHONENUMBER = "phone_number";
const USER_SIGNITURE = "signitures";
const BIRTH_DATE = "date_of_birth";
const CREATED_DATE = "created_date";
const UPDATED_DATE = "updated_date";

// Set Profiles in cookie (client side)
export const setProfile = (first_name,last_name,image,signitures,date_of_birth,created_date,updated_date,phone_number) => {
  Cookies.set(FIRST_NAME, first_name, { expires: 1 }); // 1 روز
  Cookies.set(LAST_NAME, last_name, { expires: 1 }); // 1 روز
  Cookies.set(PROFILE_IMAGE, image, { expires: 1 }); // 1 روز
  Cookies.set(USER_PHONENUMBER, phone_number, { expires: 1 }); // 1 روز
  Cookies.set(USER_SIGNITURE, signitures, { expires: 1 }); // 1 روز
  Cookies.set(BIRTH_DATE, date_of_birth, { expires: 1 }); // 1 روز
  Cookies.set(CREATED_DATE, created_date, { expires: 1 }); // 1 روز
  Cookies.set(UPDATED_DATE, updated_date, { expires: 1 }); // 1 روز
};


export const getFirstName = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("first_name")
  }
}

export const getLastName = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("last_name")
  }
}

export const getImage = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("image")
  }
}

export const getPhoneNumber = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("phone_number")
  }
}

export const getBirthDate = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("date_of_birth")
  }
}

export const getSigniture = () => {
  if (typeof window !== "undefined") {
      return Cookies.get("signitures")
  }
}

export const getCreatedDate= () => {
  if (typeof window !== "undefined") {
      return Cookies.get("created_date")
  }
}

export const getUpdatedDate= () => {
  if (typeof window !== "undefined") {
      return Cookies.get("updated_date")
  }
}

export const removeProfile = () => {
  if (typeof window !== "undefined") {
      Cookies.remove("first_name");
      Cookies.remove("last_name");
      Cookies.remove("image");
      Cookies.remove("signitures");
      Cookies.remove("phone_number");
      Cookies.remove("date_of_birth");
      Cookies.remove("created_date");
      Cookies.remove("updated_date");
  }
}