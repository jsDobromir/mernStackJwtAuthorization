import UserActionTypes from './userTypes';


//Login

export function loginStart(user){
    return {
        type : UserActionTypes.LOGIN_START,
        payload : user
    }
}

export function loginSuccess(){
    return {
        type : UserActionTypes.LOGIN_SUCCESS
    }
}

export function loginFail(error){
    return {
        type : UserActionTypes.LOGIN_FAILURE,
        payload : error
    }
}

//verify token

export function verifyTokenStart(token) {
    return {
        type : UserActionTypes.VERIFY_TOKEN_START,
        payload : token
    }
}

export function verifyTokenSuccess(user){
    return {
        type : UserActionTypes.VERIFY_TOKEN_SUCCESS,
        payload : user
    }
}

export function verifyTokenError(error){
    return {
        type : UserActionTypes.VERiFY_TOKEN_ERROR,
        payload : error
    }
}


//Logout

export function logoutStart(){
    localStorage.removeItem('token');
    return {
        type : UserActionTypes.LOGOUT_START
    }
}

//Signup actions
// export function signUpStart(user){
//     return {
//         type : UserActionTypes.SIGN_UP_START,
//         payload : user
//     };
// };

// export function signUpSuccess(user){
//     return {
//         type : UserActionTypes.SIGN_UP_SUCCESS,
//         payload : user
//     };
// };

// export function signUpFailure(error){
//     return {
//         type : UserActionTypes.SIGN_UP_FAILURE,
//         payload : error
//     };
// }