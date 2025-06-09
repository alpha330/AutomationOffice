import actionTypse from "../config/actionTypes";

const authReducer = ( state = {
  loading:false,
  logged:false
} ,action) => {
  switch (action.type) {
    case actionTypse.LOGIN_STARTED:
      return{
        ...state,
        loading:action.loading,
        logged:action.logged
      }
    case actionTypse.LOGIN_SUCCESS:
      return{
        ...state,
        loading:action.loading,
        logged:action.logged,
        error:false,
        response:action.response
      }
    case actionTypse.LOGIN_FAILED:
      return{
        ...state,
        logged:action.logged,
        loading:action.loading,
        error:true,
        error_message:action.error_message,
      }
    case actionTypse.REGISTER_STARTED:
      return{
        ...state,
        loading:action.loading,
        logged:action.logged
      }
    case actionTypse.REGISTER_SUCCESS:
    return{
      ...state,
      loading:action.loading,
      logged:action.logged,
      response:action.response,
    }
    case actionTypse.REGISTER_FAILED:
      return{
        ...state,
        logged:action.logged,
        loading:action.loading,
        error:action.error,
        error_message:action.error_message,
      }
    case actionTypse.LOGOUT_STARTED:
      return {
        ...state,
        loading:action.loading,
        logged:action.logged,
      };
    case actionTypse.LOGOUT_SUCCESS:
      return {
        ...state,
        loading:action.loading,
        logged:action.logged,
        response: action.response,
      };
    case actionTypse.LOGOUT_FAILED:
      return {
        ...state,
        loading:action.loading,
        logged:action.logged,
        error: action.error,
        error_message: action.error_message,
      };
    default:
      return state;
  }
}

export default authReducer