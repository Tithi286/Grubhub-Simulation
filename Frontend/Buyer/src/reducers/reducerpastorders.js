const initialStore = {
   
    orders:[]
     
 }
 
const reducerpastorders = (state = initialStore,action) => {
     if(action.type === "PASTOREDERS" && action.statusCode == 200){
        console.log(action.payload)
        return {
            ...state,
            orders : action.payload.data
        }
     }
     if(action.type === "PASTOREDERS" && action.statusCode == 400){
         return {
             ...state,
           
        }
      }
    return state;
}

export default reducerpastorders;