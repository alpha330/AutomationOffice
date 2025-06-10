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


export {
  PROFILE_ACTION,
}