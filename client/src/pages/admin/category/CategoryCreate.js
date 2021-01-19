import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import {
	createCategory,
	getCategories,
	removeCategory,
} from "../../../helperFunctions/categoryCRUD";
import TooltipDisplay from "../../../components/TooltipDisplay";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";
import SearchForm from "../../../components/forms/SearchForm";

const CategoryCreate = () => {
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = () => {
		getCategories().then((c) => {
			setCategories(c.data);
		});
	};

	useEffect(() => {
		loadCategories();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createCategory({ name }, user.token)
			.then((res) => {
				setLoading(false);
				loadCategories();
				setName("");
				toast.success(`${res.data.name} is succesfully created`);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.response.status === 400) toast.error(error.response.data);
			});
	};

	const handleRemove = async (slug) => {
		let confirmation = window.confirm("Are you sure to delete?");
		if (confirmation) {
			removeCategory(slug, user.token)
				.then((res) => {
					setLoading(false);
					loadCategories();
					toast.error(`${res.data.name} deleted succesfully`);
				})
				.catch((error) => {
					setLoading(false);
					if (error.response.status === 400) toast.error(error.response.data);
				});
		}
	};

	const searched = (query) => (c) => c.name.toLowerCase().includes(query);

	return (
		<Container fluid>
			<Row>
				<Col lg={3} md={4} className="mb-3">
					<AdminNav />
				</Col>

				<Col className="mb-3 ml-3">
					<Row className="justify-content-md-center ">
						{" "}
						{loading ? (
							<h4>
								{" "}
								<Loader />
							</h4>
						) : (
							<h4 className="mt-2">Create Category</h4>
						)}
					</Row>
					<hr />
					<br />

					<CategoryForm
						name={name}
						setName={setName}
						handleSubmit={handleSubmit}
						buttonName="Save"
						label="Category Name"
					/>
					<br />
					<SearchForm
						query={query}
						setQuery={setQuery}
						searchText="Search Category"
					/>
					<br />
					{categories.filter(searched(query)).map((c) => (
						<Card key={c._id}>
							<Card.Body>
								{c.name}
								<Link to={`/admin/category/${c.slug}`}>
									<span className="btn btn-sm float-right">
										<TooltipDisplay tooltipName="Edit Category">
											<RiEdit2Fill size={18} />
										</TooltipDisplay>
									</span>
								</Link>
								<span
									className="btn btn-sm float-right"
									onClick={() => handleRemove(c.slug)}
								>
									<TooltipDisplay tooltipName="Delete Category">
										<RiDeleteBin2Line size={18} />
									</TooltipDisplay>
								</span>
							</Card.Body>
						</Card>
					))}
				</Col>
			</Row>
		</Container>
	);
};

export default CategoryCreate;
