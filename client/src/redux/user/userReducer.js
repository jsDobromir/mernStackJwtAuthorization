import UserActionTypes from './userTypes';

const INITIAL_STATE = {
    currentUser : null,
    errorMessage : null,
    isAuth : false,
    loggedInButNotVerified : false
};

const userReducer = (state = INITIAL_STATE,action) => {
    switch(action.type){
        //case UserActionTypes.LOGIN_START:
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedInButNotVerified : true
            }
        case UserActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                loggedInButNotVerified : false,
                errorMessage : action.payload
            }
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                currentUser : null,
                errorMessage : action.payload,
                isAuth : false
            }

        case UserActionTypes.VERIFY_TOKEN_SUCCESS:
            return{
                ...state,
                currentUser : action.payload,
                isAuth : true,
                errorMessage : null,
                loggedInButNotVerified : false
            }
        case UserActionTypes.VERiFY_TOKEN_ERROR:
            return {
                ...state,
                currentUser : null,
                isAuth : false,
                errorMessage : action.payload
            }
        case UserActionTypes.LOGOUT_START:
            return {
                ...state,
                currentUser : null,
                isAuth : false,
                loggedInButNotVerified : false
            }
        default :
            return state;
    }
};

export default userReducer;