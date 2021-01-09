import { USER_LOGGEDIN, USER_LOGOUT } from "../actions/actionTypes";

export const userReducer = (state = null, action) => {
	switch (action.type) {
		case USER_LOGGEDIN:
			return action.payload;
		case USER_LOGOUT:
			return action.payload;
		default:
			return state;
	}
};
