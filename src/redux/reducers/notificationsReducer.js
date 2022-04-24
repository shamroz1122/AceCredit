const initState = {
    notificationsError: null,
    notifications: []
}

const notificationsReducer = (state = initState, action) => {
    switch (action.type) {

        case 'CLEAR_NOTIFICATIONS_MESSAGES':
            return {
                ...state,
                notificationsError: null,
            }
        case 'GET_NOTI_SUCCESS':
            return {
                ...state,
                notifications: action.data,
                notificationsError: null
            }
        case 'GET_NOTI_ERROR':
            return {
                ...state,
                loans: [],
                notificationsError: action.msg,
            }

        default:
            return state
    }

}

export default notificationsReducer 