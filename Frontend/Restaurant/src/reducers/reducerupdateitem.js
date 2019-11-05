const initialStore = {
    authFlag : "",
    message : "",
    
}

const reducerupdateitem = (state = initialStore,action) => {
    
    if(action.type === "UPDATEITEMNAME" && action.statusCode == 200){
        return {
            ...state,
            authFlag : "true",
            message: "Item Name Updated Successfully"
        }
     }

    if(action.type === "UPDATEITEMNAME" && action.statusCode == 201){
        return {
            ...state,
            authFlag: "false",
            message: "Something went wrong"
        }
    }
    if(action.type === "UPDATEDESC" && action.statusCode == 200){
        return {
            ...state,
            authFlag : "true",
            message: "Item Description Updated Successfully"
        }
     }

    if(action.type === "UPDATEDESC" && action.statusCode == 201){
        return {
            ...state,
            authFlag: "false",
            message: "Something went wrong"
        }
    }
    if(action.type === "UPDATEMENUSEC" && action.statusCode == 200){
        return {
            ...state,
            authFlag : "true",
            message: "Item Menu Section Updated Successfully"
        }
     }

    if(action.type === "UPDATEMENUSEC" && action.statusCode == 201){
        return {
            ...state,
            authFlag: "false",
            message: "Something went wrong"
        }
    }
    if(action.type === "UPDATEPRICE" && action.statusCode == 200){
        return {
            ...state,
            authFlag : "true",
            message: "Item Menu Section Updated Successfully"
        }
     }

    if(action.type === "UPDATEPRICE" && action.statusCode == 201){
        return {
            ...state,
            authFlag: "false",
            message: "Something went wrong"
        }
    }
    
    return state;
}

export default reducerupdateitem;