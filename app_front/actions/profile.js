import reduxCall from "@/utils/reduxCall"

const PROFILE_ACTION = (headers = {},method) => {

  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http://${process.env.NEXT_PUBLIC_API_URL}:8000/accounting/api/v1/my-profile/`,
      method:method,
      name:'PROFILE',
      headers:headers
    })
  }
}

const PROFILE_IMAGE = (headers = {},data,method,userId) => {
  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http://${process.env.NEXT_PUBLIC_API_URL}:8000//accounting/api/v1/my-profile/update/${userId}/`,
      method:method,
      name:'PROFILE',
      headers:headers,
      data:data,
    })
  }
}

const PROFILE_INFO = (headers = {},data,method,userId) => {
  return async dispatch => {
    return reduxCall(dispatch,{
      url:`http://${process.env.NEXT_PUBLIC_API_URL}:8000//accounting/api/v1/my-profile/update/${userId}/`,
      method:method,
      name:'PROFILE',
      headers:headers,
      data:data,
    })
  }
}


export {
  PROFILE_ACTION,
  PROFILE_IMAGE,
  PROFILE_INFO
}