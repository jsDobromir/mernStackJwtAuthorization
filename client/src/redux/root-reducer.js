import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import alertReducer from './alerts/alertReducer';

const rootReducer = combineReducers({
    user : userReducer,
    alerts : alertReducer
});

export default rootReducer;