import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const Wishlist = () => {
	return (
		<Card border="primary">
			<Card.Header>
				{" "}
				<h4> Wishlist</h4>
			</Card.Header>
			<Card.Body text="white">
				<h6> iphone 11 pro</h6>
				<hr />
				<NavLink to="/shop"> Continue Shopping</NavLink>
			</Card.Body>
		</Card>
	);
};

export default Wishlist;
