import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col, Form } from "react-bootstrap";

import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getCategories } from "../../../helperFunctions/categoryCRUD";
import { getSub, updateSub } from "../../../helperFunctions/subCRUD";

const SubUpdate = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(" ");
	const [parent, setParent] = useState("");
	const [categories, setCategories] = useState([]);

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const loadSub = () =>
		getSub(match.params.slug).then((s) => {
			//console.log("slug", match.params.slug);
			//console.log("s", s);
			setName(s.data.name);
			setParent(s.data.parent);
		});

	useEffect(() => {
		loadCategories();
		loadSub();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateSub(match.params.slug, { name, parent }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success(`"${res.data.name}" is updated`);
				history.push("/admin/sub");
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	return (
		<Container fluid>
			<Row>
				<Col lg={3} md={4} className="mb-3 ">
					<AdminNav />
				</Col>

				<Col className="mb-3 ml-3">
					<Row className="justify-content-md-center ">
						{loading ? (
							<h4>
								<Loader />
							</h4>
						) : (
							<h4 className="mt-2">Update Sub Category</h4>
						)}
					</Row>
					<hr />
					<Form>
						<Form.Group as={Row}>
							<Form.Label column md="4" lg="3">
								Parent Category
							</Form.Label>
							<Col md="8" lg="9">
								<Form.Control
									as="select"
									custom
									className="border border-dark"
									onChange={(e) => setParent(e.target.value)}
									value={parent}
								>
									{categories.length > 0 &&
										categories.map((c) => (
											<option key={c._id} value={c._id}>
												{c.name}
											</option>
										))}
								</Form.Control>
							</Col>
						</Form.Group>
					</Form>
					<CategoryForm
						name={name}
						setName={setName}
						handleSubmit={handleSubmit}
						label="Sub Category Name"
						buttonName="Update"
					/>
					<hr />
				</Col>
			</Row>
		</Container>
	);
};

export default SubUpdate;
