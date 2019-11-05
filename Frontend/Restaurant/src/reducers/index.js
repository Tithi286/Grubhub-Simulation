import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
 import reducersignup from "./reducersignup";
 import reducerlogin from "./reducerlogin";
 import reducerprofile from "./reducerprofile";
 import reduceritems from "./reduceritems";
import reducerhome from "./reducerhome";
import reducercompletedorder from "./reducercompletedorder";
import reducerupdateitem from "./reducerupdateitem";
import reducermenu from "./reducermenu";

const rootReducer = combineReducers({
    signup : reducersignup,
    login : reducerlogin,
    profile : reducerprofile,
    items : reduceritems,
    home: reducerhome,
    completedorder: reducercompletedorder,
    updateitem: reducerupdateitem,
    menu: reducermenu,
    form: formReducer
});

export default rootReducer;