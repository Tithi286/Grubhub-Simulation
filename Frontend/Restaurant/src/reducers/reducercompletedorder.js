const initialStore = {
   
    orders:[],


}
 
const reducercompletedorder = (state = initialStore,action) => {
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
 
    return state;
}

export default reducercompletedorder;