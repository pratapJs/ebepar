import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import { SearchForm } from "../components";

const Navbar = () => {
	return (
		<div className="container-fluid">
			<SearchForm />
		</div>
	);
};

export default Navbar;
