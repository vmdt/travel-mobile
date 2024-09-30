import { GET_ALL_CATEGORIES, GET_CATEGORIES_FAILURE } from "../constants";

const initialState = {
	categories: [],
	total: 0,
	result: 0,
};

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_CATEGORIES:
			return {
				...state,
				categories: action.payload.categories,
				total: action.payload.total,
				result: action.payload.result,
			};
		case GET_CATEGORIES_FAILURE:
			return {
				...state,
				categories: [],
				total: 0,
				result: 0,
			};
		default:
			return state;
	}
};

export default categoryReducer;
