import { CategoryAPI } from "../../api";
import { GET_ALL_CATEGORIES, GET_CATEGORIES_FAILURE } from "../constants";

export const getListCategories = () => {
	return async (dispatch) => {
		try {
			const response = await CategoryAPI.getAllCategories();

			dispatch({
				type: GET_ALL_CATEGORIES,
				payload: response.metadata,
			});
		} catch (error) {
			dispatch({
				type: GET_CATEGORIES_FAILURE,
			});
		}
	};
};
