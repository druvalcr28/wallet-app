export default (state={userID:''},action) => {
    switch (action.type) {
        case 'LOGIN':
            return { userID:action.userID }
        case 'LOGOUT':
            return { userID:'' }
        default:
            return state
    }
};