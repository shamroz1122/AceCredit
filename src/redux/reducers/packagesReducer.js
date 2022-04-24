const initState = {
    packagesError: null,
    data: [],
    applyLoanError: null,
    applyLoanSuccess: false,
    loans: [],
    loansError: null
}

const packagesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_PACKAGES_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
        case 'GET_PACKAGES_ERROR':
            return {
                ...state,
                packagesError: action.msg
            }
        case 'CLEAR_PACKAGES_MESSAGES':
            return {
                ...state,
                packagesError: null,
                loansError: null

            }
        case 'APPLY_LOAN_SUCCESS':
            return {
                ...state,
                applyLoanSuccess: true
            }
        case 'APPLY_LOAN_ERROR':
            return {
                ...state,
                applyLoanError: action.msg,
                applyLoanSuccess: false
            }
        case 'GET_LOANS_SUCCESS':
            return {
                ...state,
                loans: action.data,
                loansError: null
            }
        case 'GET_LOANS_ERROR':
            return {
                ...state,
                loans: [],
                loansError: action.msg,
            }

        default:
            return state
    }

}

export default packagesReducer 