const initialState = {
    username: '',
    email: '',
    phone: '',
    imgUrl: '',
    loggedIn: false,
    loggingIn: false, //Used for login form loading state.
    registering: false //Used for registration form loading state.
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
        
    }
}

export default userReducer;