import axios from 'axios';
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Login 
export const login = Data => dispatch => {

        // setBasePath()
        // axios.get(" ", Data)
        //         .then((res) => {

        //                 if (res.data.success == false) {
        //                         dispatch({ type: 'LOGIN_ERROR', msg: res.data.message })
        //                 } else {
        //                         //Set data to localStorage
        //                         AsyncStorage.setItem("Data", JSON.stringify(res.data.data));


        //                         dispatch({ type: 'LOGIN_SUCCESS', data: res.data.data })
        //                 }

        //         })
        //         .catch((err) => {
        //                 console.log(err)
        //                 dispatch({ type: 'LOGIN_ERROR', msg: 'Invalid GUID' })
        //         }
        //         );
        dispatch({ type: 'TEMP_LOGIN' })
};



// Set logged in user data
export const setCurrentUserData = Data => dispatch => {
        dispatch({ type: 'LOGIN_SUCCESS', data: Data.data })
};

// Log user out
export const logOutUser = Data => dispatch => {
        // Remove token from local storage
        AsyncStorage.clear();
        // Set isAuthenticated to false
        dispatch({ type: 'LOGOUT_USER' })
};

export const clearMessage = Data => dispatch => {
        dispatch({ type: 'CLEAR_MESSAGES' })
}

