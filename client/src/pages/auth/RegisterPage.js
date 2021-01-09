import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/forms/FormContainer";

const RegisterPage = ({ location, history }) => {
	//const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const { user } = useSelector((state) => ({ ...state }));

	//logged in user should not access forgot password page so redirect the user to home page
	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user, history]);

	const submitHandler = async (e) => {
		e.preventDefault();

		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Please check your email: ${email} and click the link provided to complete your registration`
		);
		//save in local storage
		/* const value = [
			{
				name: name,
				email: email,
			},
		]; */
		window.localStorage.setItem("registerEmail", email);
		//clear state
		setEmail("");
		//setName("");
	};
	return (
		<FormContainer>
			<h4 className="py-5"> Sign up</h4>
			<hr />
			<Form onSubmit={submitHandler}>
				{/* <Form.Group controlId="name">
					<Form.Label>User Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Enter user name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group> */}
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Button type="submit" block>
					Submit
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Have an Account ?<Link to="/login">Login</Link>{" "}
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterPage;
