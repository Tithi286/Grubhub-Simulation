const initialStore = {
    authFlag : "",
    message : "",
}

const reducersignup = (state = initialStore,action) => {
    if(action.type === "SIGNUP" && action.statusCode == 200){
        return {
            ...state,
            authFlag : action.payload.status,
            message : action.payload.message
            
        }
    }
    if(action.type === "SIGNUP" && action.statusCode == 403){
        return {
            ...state,
            authFlag : action.payload.success,
            message : action.payload.message 
        }
     }
    return state;
}

export default reducersignup;