const initialStore = {
    authFlag : "",
    message : "",
    fname: "",
    lname: "",
    email:"",
    cuisine:""
}

const reducerlogin = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        return {
            ...state,
            authFlag : action.payload.status,
            message : action.payload.message,
            fname: action.payload.data.fname,
            lname: action.payload.data.lname,
            email: action.payload.data.email,
            phone: action.payload.data.phone,
            cuisine: action.payload.data.cuisine
            
        }
    }
    if(action.type === "LOGIN" && action.statusCode == 403){
        return {
            ...state,
            authFlag : action.payload.success,
            message : action.payload.message 
        }
     }
    return state;
}

export default reducerlogin;