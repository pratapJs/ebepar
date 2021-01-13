import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { toast, ToastContainer } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useSelector } from "react-redux";

import Loader from "../../components/Loader";

const ForgotPassword = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	//logged in user should not access forgot password page so redirect the user to home page
	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user, history]);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};
		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail("");
				setLoading(false);
				toast.success("Password reset link has been sent to your email.");
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
			});
	};

	return (
		<FormContainer>
			{loading ? <Loader /> : <h4 className="py-5"> Forgot Password</h4>}

			<hr />
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder={email}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>

				<Button type="submit" onClick={submitHandler} block disabled={!email}>
					Submit
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ForgotPassword;
