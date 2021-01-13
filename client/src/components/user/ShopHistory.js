import React from "react";

import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const ShopHistory = () => {
	return (
		<Card border="primary">
			<Card.Header>
				<h4> Shop history</h4>
			</Card.Header>
			<Card.Body>
				<h6> iMac Pro</h6>
				<hr />
				<NavLink to="/shop"> Continue Shopping</NavLink>
			</Card.Body>
		</Card>
	);
};

export default ShopHistory;
