import React, { useState } from "react";
import Wishlist from "../../components/user/Wishlist";
import ShopHistory from "../../components/user/ShopHistory";
import Profile from "../../components/user/Profile";
import { Row, Col, Container } from "react-bootstrap";

const Account = () => {
	return (
		<Container fluid>
			<Row>
				<Col xs={12} md={8} lg={5} className="mb-3 ">
					<ShopHistory />
				</Col>
				<Col xs={12} md={4} lg={3} className="mb-3 ">
					<Wishlist />
				</Col>
				<Col xs={12} md={12} lg={4} className="mb-3">
					<Profile />
				</Col>
			</Row>
		</Container>
	);
};

export default Account;
