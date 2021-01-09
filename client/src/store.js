import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reduxThunk from "redux-thunk";
import { searchReducer } from "./reducers/searchReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
	search: searchReducer,
	user: userReducer,
});

const middleware = [reduxThunk];
const store = createStore(
	rootReducer,

	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
