import actionTypes from "@/config/actionTypes";
import fetchUrl from "./fetchUrl";
import { getToken } from "./auth";

const reduxCall = async (
  dispatch,
  {
    url,
    method = "GET",
    name,
    data = null,
    headers = {},
    auth = false,
    customPayload = {},
    mediaType = "application/json", // ← اضافه شده
    onSuccess = null, // ← اضافه شده
    onError = null,   // ← اگه خواستی به صورت سفارشی هندل کنی
  }
) => {
  try {
    // آماده‌سازی هدر
    const authHeaders = { ...headers };
    if (auth) {
      const token = getToken(); // ← از کوکی بگیر
      if (token) {
        authHeaders["Authorization"] = `Token ${token}`;
      }
    }

    // dispatch STARTED
    dispatch({
      type: actionTypes[`${name}_STARTED`],
      loading: true,
      logged:false, // ← اگر نیاز به تغییر وضعیت لاگین دارید
      ...customPayload,
    });

    // درخواست به سرور
    const response = await fetchUrl({
      url,
      method,
      data,
      headers: authHeaders,
      mediaType, // ← ارسال نوع مدیا
    });

    // dispatch SUCCESS
    dispatch({
      type: actionTypes[`${name}_SUCCESS`],
      loading: false,
      response:response,
      error: false,
      logged:true,
      ...customPayload,
    });

    // اجرای onSuccess در صورت وجود
    if (typeof onSuccess === "function") {
      onSuccess(response);
    }

    return response;
  } catch (error) {
    // dispatch FAILED
    dispatch({
      type: actionTypes[`${name}_FAILED`],
      loading: false,
      logged: false,
      error: true,
      error_message:
        error?.detail ||
        error?.message ||
        (typeof error === "string" ? error : "خطایی رخ داده است."),
      ...customPayload,
    });

    // اجرای onError در صورت وجود
    if (typeof onError === "function") {
      onError(error);
    }

    return error;
  }
};

export default reduxCall;
