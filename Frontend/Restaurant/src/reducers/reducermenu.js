const initialStore = {
   
    section:{},
    menusection:[]


}
 
const reducermenu = (state = initialStore,action) => {
     if(action.type === "MENU"){
        return {
            ...state,
            section : action.payload,
            menusection: Object.keys(action.payload),
        }
     }
    
    return state;
}

export default reducermenu;