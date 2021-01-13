import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { AiOutlineMail, AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { createOrUpdateUser } from "../../actions/userActions";

import Loader from "../../components/Loader";

const LoginPage = ({ history }) => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	/* if (user.role === "admin") {
		history.push("/admin/dashboard");
	} */
	useEffect(() => {
		if (user && user.token) {
			history.push("/");
			if (user.role === "admin") {
				history.push("/admin/dashboard");
			} else {
				history.push("/user/account");
			}
		}
	}, [user, history]);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { user } = await auth.signInWithEmailAndPassword(email, password);

			dispatch(createOrUpdateUser(user));

			console.log(user);
			//history.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const result = await auth.signInWithPopup(googleAuthProvider);

			dispatch(createOrUpdateUser(result.user));
		} catch (error) {
			console.log(error);
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<FormContainer>
			{loading ? <Loader /> : <h4 className="py-5"> Login</h4>}

			<hr />
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<div>
					<Button
						type="submit"
						onClick={submitHandler}
						block
						disabled={!email || password.length < 6}
					>
						<AiOutlineMail size={16} /> Sign in with email/password
					</Button>
				</div>
			</Form>
			<br />
			<div>
				<Button type="submit" block onClick={handleGoogleLogin}>
					<AiFillGoogleCircle size={16} /> Sign in with Google
				</Button>
			</div>
			<Row className="py-3">
				<Col>
					Don't have an account?<Link to="/register"> Sign up here</Link>{" "}
				</Col>
			</Row>
			<Row className="py-3">
				<Col>
					Forgot Password ? <Link to="/forgot/password">Click here</Link>{" "}
				</Col>
			</Row>
		</FormContainer>
	);
};

export default LoginPage;
