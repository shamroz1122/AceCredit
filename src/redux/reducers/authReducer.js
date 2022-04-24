const initState = {
  authError: null,
  isAuthenticated: false,
  isLoadingApp: true,
  signUpError: null,
  user: {},
  profile: {},
  profileUpdateError: null,
  uploadedAttachment: {},
  uploadedAttachmentError: null,
  deviceToken: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.msg,
      }
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        signUpError: action.msg
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null,
        user: action.data,
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
        user: {},
        isAuthenticated: false,
        isLoadingApp: false
      }
    case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        profile: action.profile
      }
    case 'PROFILE_UPDATE_ERROR':
      return {
        ...state,
        profileUpdateError: action.msg,

      }
    case 'UPLOAD_ATTACHMENT_SUCCESS':
      return {
        ...state,
        uploadedAttachment: action.uploadedAttachment,
        uploadedAttachmentError: null,

      }
    case 'UPLOAD_ATTACHMENT_ERROR':
      return {
        ...state,
        uploadedAttachment: {},
        uploadedAttachmentError: action.msg,
      }
    case 'SET_DEVICE_TOKEN':
      return {
        ...state,
        deviceToken: action.deviceToken,

      }

    case 'CLEAR_MESSAGES':
      return {
        ...state,
        authError: null,
        uploadedAttachment: {},
        uploadedAttachmentError: null,
        profileUpdateError: null
      }
    default:
      return state
  }

}

export default authReducer 