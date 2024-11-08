import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
	auth: authReducer,
	category: categoryReducer,
	cart: cartReducer,
});
