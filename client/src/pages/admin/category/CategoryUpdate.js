import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col } from "react-bootstrap";
import {
	getCategory,
	updateCategory,
} from "../../../helperFunctions/categoryCRUD";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(" ");

	const loadCategory = () => {
		getCategory(match.params.slug).then((c) => setName(c.data.name));
	};
	useEffect(() => {
		loadCategory();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success(`"${res.data.name}" is updated`);
				history.push("/admin/category");
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
				<Col lg={2} className="mb-3 ">
					<AdminNav />
				</Col>

				<Col className="mb-3">
					{loading ? (
						<h4>
							<Loader />
						</h4>
					) : (
						<h4>Update Category</h4>
					)}
					<CategoryForm
						name={name}
						setName={setName}
						handleSubmit={handleSubmit}
						buttonName="Update"
					/>
					<hr />
				</Col>
			</Row>
		</Container>
	);
};

export default CategoryUpdate;
