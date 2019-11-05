const initialStore = {
   
    authFlag: false,
    orders:[]
     
 }
 
 const reducercart = (state = initialStore,action) => {
     if(action.type === "PLACEORDER" && action.statusCode == 200){
         console.log(action.payload)
         return {
             
             ...state,
             authFlag: true,
             orders: action.payload.data
             
         }
     }
     if(action.type === "PLACEORDER" && action.statusCode == 400){
         return {
             ...state,
             authFlag: true
           
         }
      }
     return state;
 }
 
 export default reducercart;