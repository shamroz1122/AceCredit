import axios from 'axios';
import setBasePath from "../../utils/setBasePath";
import AsyncStorage from '@react-native-async-storage/async-storage';






// get promotions
export const getPackages = Data => dispatch => {

    //   console.log(Data)
    setBasePath()
    //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
    axios.get("/get-packages", Data)
        .then((res) => {
            //   console.log(res.data)
            if (res.data.success == false) {
                dispatch({ type: 'GET_PACKAGES_ERROR', msg: res.data.msg })
            } else {

                dispatch({ type: 'GET_PACKAGES_SUCCESS', data: res.data.packages })
            }

        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: 'GET_PACKAGES_ERROR', msg: 'Something Went Wrong.' })
        }
        )

}


// Apply Loan
export const appLyLoanPlan = Data => dispatch => {

    //   console.log(Data)
    setBasePath()
    //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
    axios.post("/apply-loan", Data)
        .then((res) => {
            console.log(res.data)
            if (res.data.success == false) {
                dispatch({ type: 'APPLY_LOAN_ERROR', msg: res.data.msg })
            } else {

                dispatch({ type: 'APPLY_LOAN_SUCCESS', data: res.data.msg })
            }

        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: 'APPLY_LOAN_ERROR', msg: 'Something Went Wrong.' })
        }
        )

}


// get promotions
export const getLoans = Data => dispatch => {

    //   console.log(Data)
    setBasePath()
    //      dispatch({type: 'SIGN_UP_ERROR',msg:'Rigestration API Is Not Ready Yet'})
    axios.get("/get-loans", Data)
        .then((res) => {

            if (res.data.success == false) {
                dispatch({ type: 'GET_LOANS_ERROR', msg: res.data.msg })
            } else {

                dispatch({ type: 'GET_LOANS_SUCCESS', data: res.data.data })
            }

        })
        .catch((err) => {
            console.log(err)
            dispatch({ type: 'GET_LOANS_ERROR', msg: 'Something Went Wrong.' })
        }
        )

}





export const clearPackagesMessages = Data => dispatch => {
    dispatch({ type: 'CLEAR_PACKAGES_MESSAGES' })
}

