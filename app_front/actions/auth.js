import reduxCall from "@/utils/reduxCall"
import { setToken,removeToken } from "@/utils/auth";
import { removeProfile } from "@/utils/profile";


const LOGIN_ACTION = (data = {}) => {
  
  return async dispatch => {
    try {
      const response = await reduxCall(dispatch, {
        url: `http://${process.env.NEXT_PUBLIC_API_URL}:8000/accounting/api/v1/login/`,
        method: "POST",
        name: 'LOGIN',
        data: data
      });

      // اگر login موفق بود، توکن رو ذخیره کن
      if (response && response.token) {
        setToken(response.token,response.user_id)
      }

      return response;

    } catch (err) {
      // کاری لازم نیست
      throw err;
    }
  }
}

const LOGOUT_ACTION = (headers = {}) => {
  return async dispatch => {
    try {
      const response = await reduxCall(dispatch, {
        url: `http://${process.env.NEXT_PUBLIC_API_URL}:8000/accounting/api/v1/logout/`,
        method: "POST",
        name: 'LOGOUT',
        headers: headers,
      });
      removeToken(); 
      removeProfile();      
      return response;

    } catch (err) {
      throw err;
    }
  }
}

const REGISTER_ACTION = (data={}) => {

  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http://${process.env.NEXT_PUBLIC_API_URL}:8000/accounting/api/v1/register/`,
      method:"POST",
      name:'REGISTER',
      data:data,
    })
  }
}

const VERIFICATION_CODE = (data={}) => {

  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http:/${process.env.NEXT_PUBLIC_API_URL}:8000/accounting/api/v1/tempcode/verify/`,
      method:"POST",
      name:'VERIFICATION',
      data:data,
    })
  }
}

const RETRY_VERIFICATION_CODE = (data={}) => {

  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http://127.0.0.1:8020/auth/api/v1/verification/code/sms/`,
      method:"POST",
      name:'RETRY_VERIFICATION',
      data:data,
    })
  }
}

const RESET_PASSWORD_CODE = (data={}) => {

  return async dispatch => {
    return reduxCall(dispatch,{
      url:'http://127.0.0.1:8020/auth/api/v1/reset-password/sms/tempcode/',
      method:"POST",
      name:'RESET_PASSWORD_CODE',
      data:data,
    })
  }
}

const RESET_PASSWORD = (data={}) => {
  return async dispatch => {
    return reduxCall(dispatch,{
      url:'http://127.0.0.1:8020/auth/api/v1/reset-password/temp-code/',
      method:"PUT",
      name:'RESET_PASSWORD',
      data:data,
    })
  }
}


export {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  VERIFICATION_CODE,
  RESET_PASSWORD_CODE,
  RESET_PASSWORD,
  RETRY_VERIFICATION_CODE
}