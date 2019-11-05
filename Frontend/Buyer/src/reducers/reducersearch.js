const initialStore = {
   items:[]
}

const reducersearch = (state = initialStore,action) => {
    if(action.type === "SEARCH" && action.statusCode == 200){
        console.log(action.payload)
        return {
            
            ...state,
           items : action.payload.data
            
        }
    }
    if(action.type === "SEARCH" && action.statusCode == 400){
        return {
            ...state,
        }
     }

     if(action.type === "FILTER" && action.statusCode == 200){
        console.log(action.payload)
        return {
            
            ...state,
           items : action.payload.data
            
        }
    }
    if(action.type === "FILTER" && action.statusCode == 400){
        return {
            ...state,
        }
     }
    return state;
}

export default reducersearch;