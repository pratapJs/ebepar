import React, { useState } from "react";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";

import { auth } from "../../firebase";

const Profile = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!confirmPassword || !password) {
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

		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				setLoading(false);
				setPassword("");
				setConfirmPassword(" ");
				toast.success("Password updated successfully");
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.message);
			});
	};

	return (
		<Card border="primary">
			<Card.Body>
				<h4>Profile</h4>
				<hr />
				<p> User Name: {user.name}</p>
				<p>Email id: {user.email}</p>

				<p>Address: </p>
				<p>Contact Number: </p>
				<hr />
				<h5>Update Password</h5>
				<hr />
				<Form onSubmit={submitHandler}>
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
						onSubmit={submitHandler}
						//disabled={password !== confirmPassword}
					>
						Update Password
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default Profile;
