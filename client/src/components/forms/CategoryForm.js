import React from "react";

import { Form, Button, Row, Col } from "react-bootstrap";

const CategoryForm = ({ name, setName, handleSubmit, buttonName }) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group as={Row} controlId="name">
				<Form.Label column md="4" lg="3">
					Category Name:
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="name"
						placeholder="Enter category name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
						required
						className="border border-dark"
					/>{" "}
				</Col>
			</Form.Group>

			<Button type="submit" block>
				{buttonName}
			</Button>
		</Form>
	);
};

export default CategoryForm;
