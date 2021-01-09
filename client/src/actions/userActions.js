import { USER_LOGGEDIN, USER_LOGOUT } from "./actionTypes";

export const loggedInUser = (user) => async (dispatch) => {
	const idTokenResult = await user.getIdTokenResult();
	console.log(idTokenResult.token);
	dispatch({
		type: USER_LOGGEDIN,
		payload: {
			email: user.email,
			token: idTokenResult.token,
		},
	});
};

export const loggedout = () => async (dispatch) => {
	dispatch({
		type: USER_LOGOUT,
		payload: null,
	});
};
