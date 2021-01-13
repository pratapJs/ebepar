import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const Search = () => {
	return (
		<InputGroup className="mb-3" size="sm" style={{ width: "20rem" }}>
			<FormControl
				placeholder="Search"
				aria-label="Search"
				aria-describedby="Search"
			/>
			<InputGroup.Append>
				<InputGroup.Text id="inputGroup-sizing-sm">
					<BsSearch />
				</InputGroup.Text>
			</InputGroup.Append>
		</InputGroup>
	);
};

export default Search;
