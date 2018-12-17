import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import errorsReducer from "./errorsReducer";
export default combineReducers({
  menu: menuReducer,
  auth: authReducer,
  admin: adminReducer,
  errors: errorsReducer
});
