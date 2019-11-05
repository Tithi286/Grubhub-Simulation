import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
 import reducersignup from "./reducersignup"
import reducerlogin from "./reducerlogin";
import reducerprofile from "./reducerprofile";
import reducersearch from "./reducersearch";
import reducerupcomingorders from "./reducerupcomingorders";
import reducerpastorders from "./reducerpastorders";
import reducercart from "./reducercart";


const rootReducer = combineReducers({
     signup : reducersignup,
     login : reducerlogin,
     profile: reducerprofile,
     search: reducersearch,
     upcomingorders: reducerupcomingorders,
     pastorders: reducerpastorders,
     cart: reducercart,
    form: formReducer
});

export default rootReducer;