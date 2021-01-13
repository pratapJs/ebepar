import React from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col } from "react-bootstrap";

const SubCreate = () => {
	return (
		<Container fluid>
			<Row>
				<Col lg={2} className="mb-3 ">
					<AdminNav />
				</Col>

				<Col className="mb-3">Sub Create</Col>
			</Row>
		</Container>
	);
};

export default SubCreate;
