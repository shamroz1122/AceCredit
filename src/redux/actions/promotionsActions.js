import axios from 'axios';
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-async-storage/async-storage';






// get promotions
export const getPromotions = Data => dispatch => {

    //   console.log(Data)
    setBasePath()
    //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
    axios.get("/get-promotions", Data)
        .then((res) => {
            //  console.log(res.data)
            if (res.data.success == false) {
                dispatch({ type: 'GET_PROMOTIONS_ERROR', msg: res.data.msg })
            } else {

                dispatch({ type: 'GET_PROMOTIONS_SUCCESS', data: res.data.promotions })
            }

        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: 'GET_PROMOTIONS_ERROR', msg: 'Something Went Wrong.' })
        }
        )

}





export const clearPromotionsMessages = Data => dispatch => {
    dispatch({ type: 'CLEAR_PROMOTIONS_MESSAGES' })
}

