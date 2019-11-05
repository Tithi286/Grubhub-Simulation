const initialStore = {
    authFlag : "",
    message : "",
    name: "",
    email:"",
    resname:""
}

const reducerprofile = (state = initialStore,action) => {
    if(action.type === "PROFILE"){
        return {
            ...state,
            authFlag : action.payload.status,
            message : action.payload.message,
            name: action.payload.data.name,
            resname: action.payload.data.res_name,
            email: action.payload.data.email,
            phone: action.payload.data.phone,
            r_id: action.payload.data._id,
            cuisine: action.payload.data.cuisine
        }
    }
    if(action.type === "UPDATENAME" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            name: action.payload.name,
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

     if(action.type === "UPDATERESNAME" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            email: action.payload.email,
            resname: action.payload.res_name,
            

            
        }
    }
    if(action.type === "UPDATERESNAME" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false"
        }
     }
    return state;
}

export default reducerprofile;