import { combineReducers } from 'redux'
import auth from './authReducer'
import promotions from './promotionsReducer'
import packages from './packagesReducer'
import notifications from './notificationsReducer'
export default combineReducers({
    auth,
    promotions,
    packages,
    notifications

}) 