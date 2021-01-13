import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { createOrUpdateUser } from "../../actions/userActions";
const RegisterComplete = ({ history }) => {
	//const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		setEmail(window.localStorage.getItem("registerEmail"));

		//setName(value[0].name);
		if (user && user.token) {
			history.push("/");
		}
	}, [history, user]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("All fields are required");
			return;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("password doesnt match");
			return;
		}
		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			);
			if (result.user.emailVerified) {
				//remove user
				window.localStorage.removeItem("registerEmail");
				const user = auth.currentUser;
				//await user.updatePassword(password);

				dispatch(createOrUpdateUser(user));
			}
			history.push("/");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};
	return (
		<FormContainer>
			<h4 className="py-5"> Complete Your Registration</h4>
			<hr />
			<Form onSubmit={submitHandler}>
				{/* <Form.Group controlId="name">
					<Form.Label>User Name</Form.Label>
					<Form.Control disabled type="name" placeholder={name} value={name} />
				</Form.Group> */}
				<Form.Group controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder={email}
						disabled
						value={email}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter new password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="confirm-password">
					<Form.Label>Confirm your password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					//disabled={password !== confirmPassword}
				>
					Complete Registration
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Already have an account ?<Link to="/login"> Login</Link>{" "}
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterComplete;
