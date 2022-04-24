import axios from 'axios';
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-async-storage/async-storage'
// get promotions
export const getNotifications = Data => dispatch => {

    //   console.log(Data)
    setBasePath()
    //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
    axios.get("/get-notifications", Data)
        .then((res) => {

            if (res.data.success == false) {
                dispatch({ type: 'GET_NOTI_ERROR', msg: res.data.msg })
            } else {

                dispatch({ type: 'GET_NOTI_SUCCESS', data: res.data.data })
            }

        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: 'GET_NOTI_ERROR', msg: 'Something Went Wrong.' })
        }
        )

}


export const clearNotificationsMessages = Data => dispatch => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS_MESSAGES' })
}

