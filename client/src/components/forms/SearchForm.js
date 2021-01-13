import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SearchForm = ({ query, setQuery }) => {
	const handleSearch = (e) => {
		e.preventDefault();
		setQuery(e.target.value.toLowerCase());
	};
	return (
		<Form>
			<Form.Group as={Row} controlId="name">
				<Form.Label column md="4" lg="3">
					Search Category:
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						placeholder="Search Category"
						value={query}
						onChange={handleSearch}
						className="border border-dark"
					/>{" "}
				</Col>
			</Form.Group>
		</Form>
	);
};

export default SearchForm;
