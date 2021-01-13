import AppHeader from "./components/common/AppHeader";
import AppFooter from "./components/common/AppFooter";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { loggedInUser } from "./actions/userActions";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

//using lazy
const Login = lazy(() => import("./pages/auth/LoginPage"));
const Register = lazy(() => import("./pages/auth/RegisterPage"));
const Products = lazy(() => import("./pages/ProductsPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Error = lazy(() => import("./pages/ErrorPage"));
const Checkout = lazy(() => import("./pages/CheckoutPage"));
const Cart = lazy(() => import("./pages/CartPage"));
const Home = lazy(() => import("./pages/HomePage"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SingleProduct = lazy(() => import("./pages/SingleProductPage"));

const Payment = lazy(() => import("./pages/PaymentPage"));
const Shop = lazy(() => import("./pages/ShopPage"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete.js"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const CategoryUpdate = lazy(() =>
	import("./pages/admin/category/CategoryUpdate")
);
const CategoryCreate = lazy(() =>
	import("./pages/admin/category/CategoryCreate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate.js"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate.js"));
const Account = lazy(() => import("./pages/user/Account.js"));

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				dispatch(loggedInUser(user));
			}
		});

		return () => unsubscribe;
	}, [dispatch]);
	return (
		<>
			<AppHeader />
			<ToastContainer />
			<main className="py-3">
				<Container fluid>
					<Suspense
						fallback={
							<div className="col text-center p-5 h6">
								__EBEPAAR ONE_STOP_SHOP__
							</div>
						}
					>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route exact path="/contact" component={Contact} />
							<Route
								exact
								path="/register/complete"
								component={RegisterComplete}
							/>
							<Route exact path="/forgot/password" component={ForgotPassword} />

							<UserRoute exact path="/user/account" component={Account} />

							<AdminRoute
								exact
								path="/admin/dashboard"
								component={AdminDashboard}
							/>
							<AdminRoute
								exact
								path="/admin/category"
								component={CategoryCreate}
							/>
							<AdminRoute
								exact
								path="/admin/category/:slug"
								component={CategoryUpdate}
							/>
							<Route exact path="/admin/sub" component={SubCreate} />
							<Route exact path="/admin/sub/:slug" component={SubUpdate} />
							<Route exact path="/admin/product" component={ProductCreate} />
							<Route exact path="/admin/products" component={Products} />
							<Route exact path="/category/:slug" component={CategoryHome} />
							<Route
								exact
								path="/admin/product/:slug"
								component={ProductUpdate}
							/>

							<Route exact path="/product/:slug" component={SingleProduct} />

							<Route exact path="/shop" component={Shop} />
							<Route exact path="/cart" component={Cart} />
							<UserRoute exact path="/checkout" component={Checkout} />
							<UserRoute exact path="/payment" component={Payment} />
							<Route path="*" component={Error} />
						</Switch>
					</Suspense>
				</Container>
			</main>
			<AppFooter />
		</>
	);
};

export default App;
