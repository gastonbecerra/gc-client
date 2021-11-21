const types = {
    login: 'LOGIN',
    register: "SIGNUP"
}

const initialStore = {
    user: false,
    indicator: false
}

const storeReducer = (state, action) => {
    switch(action.type){
        case types.login:
            return {
                ...state,
                user: null
            }
        default: 
            return state;
    }
}

export {initialStore, types};
export default storeReducer;