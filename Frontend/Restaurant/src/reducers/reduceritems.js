const initialStore = {
    authFlag : "",
    message : "",
    msg:""
   
}

const reduceritems = (state = initialStore,action) => {
    if(action.type === "ADDITEM" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            message: "Item added successfully",
            
        }
    }
    if(action.type === "ADDITEM" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false",
            message: "Item already exists."
        }
     }
    if(action.type === "DELETEITEM" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            msg: "Item deleted successfully",
            
        }
    }
    if(action.type === "DELETEITEM" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false",
            msg: "Item doesnot exists."
        }
    }

    if(action.type === "DELETESEC" && action.statusCode == 200){
        return {
            ...state,
            authFlag: "true",
            error: "Section deleted successfully",
            
        }
    }
    if(action.type === "DELETESEC" && action.statusCode == 201){
        return {
            ...state,
            authFlag : "false",
            error: "Section doesnot exists."
        }
     }

    
    return state;
}

export default reduceritems;