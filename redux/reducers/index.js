import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bookingReducer from "./bookingReducer";
import cartReducer from "./cartReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
	auth: authReducer,
	category: categoryReducer,
	cart: cartReducer,
	booking: bookingReducer,
});
