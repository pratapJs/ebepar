import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const SearchForm = ({ query, setQuery, searchText }) => {
	const handleSearch = (e) => {
		e.preventDefault();
		setQuery(e.target.value.toLowerCase());
	};
	return (
		<Form>
			<Form.Group as={Row} controlId="search">
				<Form.Label column md="4" lg="3">
					{searchText}
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						placeholder={searchText}
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
