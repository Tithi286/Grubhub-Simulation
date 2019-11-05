const initialStore = {
   
    orders:[]
     
 }
 
 const reducerupcomingorders = (state = initialStore,action) => {
     if(action.type === "UPCOMINGOREDERS" && action.statusCode == 200){
         console.log(action.payload)
         return {
             
             ...state,
             orders : action.payload.data
 
             
         }
     }
     if(action.type === "UPCOMINGOREDERS" && action.statusCode == 400){
         return {
             ...state,
           
         }
      }
     return state;
 }
 
 export default reducerupcomingorders;