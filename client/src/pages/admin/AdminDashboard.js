import React from "react";
import AdminNav from "../../components/nav/AdminNav";
import { Container, Row, Col } from "react-bootstrap";

const AdminDashboard = () => {
	return (
		<Container fluid>
			<Row>
				<Col lg={3} md={4} className="mb-3 ">
					<AdminNav />
				</Col>

				<Col className="mb-3">Admin Dashboard</Col>
			</Row>
		</Container>
	);
};

export default AdminDashboard;
