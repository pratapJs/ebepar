import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
	Home,
	Cart,
	Checkout,
	Error,
	Products,
	SingleProduct,
	Register,
	Login,
} from "./pages";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Sidebar />
			<Switch>
				<Route exact path="/" component={Home} />

				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/cart" component={Cart} />
				<Route exact path="/products" component={Products} />
				<Route exact path="/products/:id" children={SingleProduct} />
				<Route exact path="/checkout" component={Checkout} />
				<Route exact path="*" component={Error} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
