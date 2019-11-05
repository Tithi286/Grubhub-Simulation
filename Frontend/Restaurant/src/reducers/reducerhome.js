const initialStore = {
   
    orders:[],
    authFlag: ""

}
 
const reducerhome = (state = initialStore,action) => {
     if(action.type === "HOME" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            orders : action.payload.data
        }
     }
     if(action.type === "HOME" && action.statusCode == 400){
         return {
             ...state,
           
        }
      }
    if(action.type === "CANCELORDER" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            authFlag : true
        }
     }
    if(action.type === "CANCELORDER" && action.statusCode == 201){
         return {
             ...state,
             authFlag : false
        }
      }
      if(action.type === "FOODSTATUS" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            authFlag : true
        }
     }
    if(action.type === "FOODSTATUS" && action.statusCode == 201){
         return {
             ...state,
             authFlag : false
        }
      }
    return state;
}

export default reducerhome;