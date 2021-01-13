import axios from "axios";
import { USER_LOGGEDIN, USER_LOGOUT } from "./actionTypes";

export const loggedInUser = (user) => async (dispatch) => {
	const idTokenResult = await user.getIdTokenResult();

	const { data } = await axios.post(
		`${process.env.REACT_APP_API}/current-user`,
		{},
		{
			headers: {
				authtoken: idTokenResult.token,
			},
		}
	);

	dispatch({
		type: USER_LOGGEDIN,
		payload: {
			name: data.name,
			email: data.email,
			token: idTokenResult.token,
			role: data.role,
			_id: data._id,
		},
	});
};

export const loggedInAdmin = async (authtoken) => {
	return await axios.post(
		`${process.env.REACT_APP_API}/current-admin`,
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const loggedout = () => async (dispatch) => {
	dispatch({
		type: USER_LOGOUT,
		payload: null,
	});
};

export const createOrUpdateUser = (user) => async (dispatch) => {
	const idTokenResult = await user.getIdTokenResult();
	const { data } = await axios.post(
		`${process.env.REACT_APP_API}/create-update-user`,
		{},
		{
			headers: {
				authtoken: idTokenResult.token,
			},
		}
	);

	dispatch({
		type: USER_LOGGEDIN,
		payload: {
			name: data.name,
			email: data.email,
			token: idTokenResult.token,
			role: data.role,
			_id: data._id,
		},
	});
};
