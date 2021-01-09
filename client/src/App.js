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
//using lazy
const Login = lazy(() => import("./pages/auth/LoginPage"));
const Register = lazy(() => import("./pages/auth/RegisterPage"));
const Products = lazy(() => import("./pages/ProductsPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Error = lazy(() => import("./pages/ErrorPage"));
const Checkout = lazy(() => import("./pages/CheckoutPage"));
const Cart = lazy(() => import("./pages/CartPage"));
const Home = lazy(() => import("./pages/HomePage"));

const SingleProduct = lazy(() => import("./pages/SingleProductPage"));
const Category = lazy(() => import("./pages/Category"));
const SubCategory = lazy(() => import("./pages/Subcategory"));
const Payment = lazy(() => import("./pages/PaymentPage"));
const Shop = lazy(() => import("./pages/ShopPage"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete.js"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/user/UserDashboard"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const CategoryUpdate = lazy(() =>
	import("./pages/admin/category/CategoryUpdate")
);
const CategoryCreate = lazy(() =>
	import("./pages/admin/category/CategoryCreate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate.js"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate.js"));
const Password = lazy(() => import("./pages/user/Password.js"));

const ShopHistory = lazy(() => import("./pages/user/ShopHistory.js"));
const Wishlist = lazy(() => import("./pages/user/Wishlist.js"));

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
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

							<Route exact path="/user/shophistory" component={ShopHistory} />
							<Route exact path="/user/password" component={Password} />
							<Route exact path="/user/wishlist" component={Wishlist} />
							<Route exact path="/admin/dashboard" component={AdminDashboard} />
							<Route exact path="/admin/category" component={CategoryCreate} />
							<Route
								exact
								path="/admin/category/:slug"
								component={CategoryUpdate}
							/>
							<Route exact path="/admin/sub" component={SubCreate} />
							<Route exact path="/admin/sub/:slug" component={SubUpdate} />
							<Route exact path="/admin/product" component={ProductCreate} />
							<Route exact path="/admin/products" component={Products} />
							<Route exact path="/admin/dashboard" component={AdminDashboard} />
							<Route exact path="/user/dashboard" component={UserDashboard} />
							<Route
								exact
								path="/admin/product/:slug"
								component={ProductUpdate}
							/>

							<Route exact path="/product/:slug" component={SingleProduct} />
							<Route exact path="/category/:slug" component={Category} />
							<Route exact path="/sub/:slug" component={SubCategory} />
							<Route exact path="/shop" component={Shop} />
							<Route exact path="/cart" component={Cart} />
							<Route exact path="/checkout" component={Checkout} />
							<Route exact path="/payment" component={Payment} />
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
