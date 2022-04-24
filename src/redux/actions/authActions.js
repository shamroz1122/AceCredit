import axios from 'axios';
import setBasePath from "../../utils/setBasePath";
import setAuthToken from '../../utils/setAuthToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Login 
export const login = Data => dispatch => {

        setBasePath()
        axios.post("/login", Data)
                .then((res) => {
                        //console.log(res)
                        if (res.data.success == false) {
                                dispatch({ type: 'LOGIN_ERROR', msg: res.data.msg })
                        } else {
                                //Set data to localStorage
                                const token = res.data.token;
                                AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                                AsyncStorage.setItem("Token", token);
                                setAuthToken(token);
                                dispatch({ type: 'LOGIN_SUCCESS', user: res.data.user })
                        }

                })
                .catch((err) => {
                        console.log(err)
                        dispatch({ type: 'LOGIN_ERROR', msg: 'Something Went Wrong.' })
                }
                );
        // dispatch({ type: 'TEMP_LOGIN' })
};

export const setDeviceToken = Data => dispatch => {
        dispatch({ type: 'SET_DEVICE_TOKEN', deviceToken: Data.device_token })
};


// SignUp User
export const signUp = Data => dispatch => {

        //   console.log(Data)
        setBasePath()
        //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
        axios.post("/register", Data)
                .then((res) => {
                        console.log(res.data)
                        if (res.data.success == false) {
                                dispatch({ type: 'SIGN_UP_ERROR', msg: res.data.errors })
                        } else {

                                // Set token to localStorage
                                const token = res.data.token;
                                AsyncStorage.setItem("User", JSON.stringify(res.data.user));
                                AsyncStorage.setItem("Token", token);
                                setAuthToken(token);

                                dispatch({ type: 'LOGIN_SUCCESS', user: res.data.user })
                        }

                })
                .catch((err) => {
                        console.log(err)
                        dispatch({ type: 'SIGN_UP_ERROR', msg: 'Something Went Wrong.' })
                }
                )

}


// SignUp User
export const updateProfile = Data => dispatch => {

        //console.log(Data)
        setBasePath()
        //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
        axios.post("/mobile-profile", Data)
                .then((res) => {
                        // console.log(res.data)
                        if (res.data.success == false) {
                                dispatch({ type: 'PROFILE_UPDATE_ERROR', msg: res.data.errors })
                        } else {
                                AsyncStorage.setItem("Profile", JSON.stringify(res.data.profile));
                                dispatch({ type: 'PROFILE_UPDATE_SUCCESS', profile: res.data.profile })
                        }

                })
                .catch((err) => {
                        console.log(err)
                        dispatch({ type: 'PROFILE_UPDATE_ERROR', msg: 'Something Went Wrong.' })
                }
                )

}


//get location
export const getLocation = Data => dispatch => {
        //   console.log(Data)
        setBasePath()
        axios.post("/get-location", Data)
                .then((res) => {

                        if (res.data.success == false) {
                                console.log('location error')
                        }

                })
                .catch((err) => {
                        console.log(err)
                        //  dispatch({ type: 'LOCATION_ERROR', msg: 'Something Went Wrong.' })
                }
                )

}

// Reset Password by email
export const uploadAttachment = Data => dispatch => {

        setBasePath()
        //   console.log(Data)
        axios.post("/upload-attachment", Data)
                .then((res) => {
                        console.log(res.data)
                        if (res.data.success == false) {
                                dispatch({ type: 'UPLOAD_ATTACHMENT_ERROR', msg: res.data.msg })
                        } else {

                                dispatch({ type: 'UPLOAD_ATTACHMENT_SUCCESS', uploadedAttachment: res.data.result })
                        }

                })
                .catch((err) => {
                        console.log(err)
                        dispatch({ type: 'UPLOAD_ATTACHMENT_ERROR', msg: 'Error While Uploading.' })
                })


}

//get location
export const getContacts = Data => dispatch => {

        //   console.log(Data)
        setBasePath()
        axios.post("/save-contacts", Data)
                .then((res) => {

                        if (res.data.success == false) {
                                console.log('contacts error')
                        } else {
                                AsyncStorage.setItem("contacts_saved", 'yes');

                        }
                })
                .catch((err) => {
                        console.log(err)
                        //    dispatch({ type: 'LOCATION_ERROR', msg: 'Something Went Wrong.' })
                }
                )
}

//hide Login Popup
export const hideLoginPopup = Data => dispatch => {

        AsyncStorage.setItem("hideLoginPopup", 'yes');
}


// Set logged in user data
export const setCurrentUserData = Data => dispatch => {
        dispatch({ type: 'LOGIN_SUCCESS', data: Data.data })
};

// Log user out
export const logOutUser = Data => dispatch => {
        //   console.log(Data)
        setBasePath()
        // Remove token from local storage
        AsyncStorage.clear();
        dispatch({ type: 'LOGOUT_USER' })

        // axios.get("/logout", Data)
        //         .then((res) => {
        //                 //   console.log(res.data)
        //                 if (res.data.success == true) {
        //                         // Set isAuthenticated to false
        //                         AsyncStorage.clear();
        //                         dispatch({ type: 'LOGOUT_USER' })
        //                 }

        //         })
        //         .catch((err) => {
        //                 console.log(err)

        //         }
        //         )

};

export const clearMessage = Data => dispatch => {
        dispatch({ type: 'CLEAR_MESSAGES' })
}

