const initState = {
    promotionsError: null,
    data: []
}

const promotionsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_PROMOTIONS_SUCCESS':
            return {
                ...state,
                data: action.data,
            }
        case 'GET_PROMOTIONS_ERROR':
            return {
                ...state,
                promotionsError: action.msg
            }
        case 'CLEAR_PROMOTIONS_MESSAGES':
            return {
                ...state,
                promotionsError: null,
            }

        default:
            return state
    }

}

export default promotionsReducer 