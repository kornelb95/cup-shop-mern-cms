import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
export default combineReducers({
  menu: menuReducer,
  auth: authReducer,
  errors: errorsReducer
});
