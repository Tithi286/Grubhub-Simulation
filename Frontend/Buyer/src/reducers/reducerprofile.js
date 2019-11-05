const initialStore = {
    authFlag : "",
    message : "",
    fname: "",
    lname: "",
    email:""
}

const reducerprofile = (state = initialStore,action) => {
    if(action.type === "PROFILE"){
        return {
            ...state,
            authFlag : action.payload.status,
            message : action.payload.message,
            fname: action.payload.data.fname,
            lname: action.payload.data.lname,
            email: action.payload.data.email,
            phone: action.payload.data.phone
        }
    }
    if(action.type === "UPDATENAME" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            fname: action.payload.firstname,
            lname: action.payload.lastname,

            
        }
    }
    if(action.type === "UPDATENAME" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false"
        }
     }

    if(action.type === "UPDATEEMAIL" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            email: action.payload.email,
            email2: action.payload.email2,
            

            
        }
    }
    if(action.type === "UPDATEEMAIL" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false"
        }
     }

     if(action.type === "UPDATEPHONE" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            email: action.payload.email,
            phone: action.payload.phone,
            

            
        }
    }
    if(action.type === "UPDATEPHONE" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false"
        }
     }
    return state;
}

export default reducerprofile;