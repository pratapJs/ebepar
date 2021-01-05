import React, { useState } from "react";

const SearchForm = () => {
	const [query, setQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		setQuery(e.target.value);
	};
	console.log(query);
	return (
		<div className="container pt-4 pb-4">
			<input
				type="search"
				placeholder="Search"
				value={query}
				onChange={handleSearch}
				className="form-control mb-4"
			/>
		</div>
	);
};

export default SearchForm;
