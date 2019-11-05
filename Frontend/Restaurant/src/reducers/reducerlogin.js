const initialStore = {
    authFlag : "",
    message : "",
    fname: "",
    lname: "",
    email:"",
    resname:"",
    zipcode:"",
    cuisine:""
}

const reducerlogin = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        return {
            ...state,
            authFlag : action.payload.status,
            message : action.payload.message,
            name: action.payload.data.name,
            email: action.payload.data.email,
            phone: action.payload.data.phone,
            resname: action.payload.data.resname,
            zipcode: action.payload.data.zipcode,
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