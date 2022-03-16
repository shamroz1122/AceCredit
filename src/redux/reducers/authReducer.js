const initState = {
  authError: null,
  data: {},
  isAuthenticated: false,
  isLoadingApp: true,

}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.msg,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        data: action.data,
        isAuthenticated: true,
        isLoadingApp: false
      }
    case 'TEMP_LOGIN':
      return {
        ...state,
        isAuthenticated: true
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        authError: null,
        data: {},
        isAuthenticated: false,
        isLoadingApp: false
      }
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        authError: null,
      }
    default:
      return state
  }

}

export default authReducer 