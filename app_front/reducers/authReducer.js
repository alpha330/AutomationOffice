import actionTypse from "../config/actionTypes";

const authReducer = ( state = {
  loading:false,
  logged:false,
  token: 'action.response.token',
  user_id: 0,
  email: '',
  type: 0,
} ,action) => {
  switch (action.type) {
    case actionTypse.LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        logged: false
      }
    case actionTypse.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        logged: true,
        error: false,
        token: action.response.token,
        user_id: action.response.user_id,
        email: action.response.email,
        type: action.response.type,
      }
    case actionTypse.LOGIN_FAILED:
      return {
        ...state,
        logged: false,
        loading: false,
        error: true,
        error_message: action.error_message,
      }
    case actionTypse.REGISTER_STARTED:
      return{
        ...state,
        loading:true,
      }
    case actionTypse.REGISTER_SUCCESS:
    return{
      ...state,
      loading:false,
      response:action.response,
    }
    case actionTypse.REGISTER_FAILED:
      return{
        ...state,
        loading:false,
        error:action.error,
        error_message:action.error_message,
      }
    case actionTypse.LOGOUT_STARTED:
      return {
        ...state,
        loading:true,
        logged:false,
      };
    case actionTypse.LOGOUT_SUCCESS:
      return {
        loading: false,
        logged: false,
      };
    case actionTypse.LOGOUT_FAILED:
      return {
        ...state,
        loading:false,
        logged:true,
        error: action.error,
        error_message: action.error_message,
      };
    default:
      return state;
  }
}

export default authReducer