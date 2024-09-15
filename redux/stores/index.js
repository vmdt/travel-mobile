import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers";

let middleware = [thunk];

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export { persistor, store };
