import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import TooltipDisplay from "../../../components/TooltipDisplay";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import { RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";
import SearchForm from "../../../components/forms/SearchForm";
import { getCategories } from "../../../helperFunctions/categoryCRUD";
import {
	createSub,
	getSubs,
	removeSub,
} from "../../../helperFunctions/subCRUD";

const SubCreate = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");
	const [subs, setSubs] = useState([]);
	const [query, setQuery] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const loadSubs = () => {
		getSubs().then((s) => {
			//console.log(s);
			setSubs(s.data);
		});
	};

	useEffect(() => {
		loadCategories();
		loadSubs();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		createSub({ name, parent: category }, user.token)
			.then((res) => {
				setLoading(false);
				setName("");
				toast.success(`"${res.data.name}" is created`);
				//console.log(res);
				loadSubs();
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				if (err.response.status === 400) toast.error(err.response.data);
			});
	};

	const handleRemove = (slug) => {
		// let answer = window.confirm("Delete?");
		// console.log(answer, slug);
		if (window.confirm("Are You Sure To Delete?")) {
			setLoading(true);
			removeSub(slug, user.token)
				.then((res) => {
					setLoading(false);
					toast.error(`${res.data.name} deleted`);
					loadSubs();
				})
				.catch((err) => {
					if (err.response.status === 400) {
						setLoading(false);
						toast.error(err.response.data);
					}
				});
		}
	};
	const searched = (query) => (s) => s.name.toLowerCase().includes(query);
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
							<h4 className="mt-2">Create Sub Category</h4>
						)}
					</Row>
					<hr />
					<Form>
						<Form.Group as={Row}>
							<Form.Label column md="4" lg="3">
								{" "}
								Choose Category
							</Form.Label>
							<Col md="8" lg="9">
								<Form.Control
									as="select"
									custom
									className="border border-dark"
									onChange={(e) => setCategory(e.target.value)}
								>
									<option>Please Select Parent Category</option>
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
						buttonName="Save"
						label="Sub Category Name"
					/>
					<hr />
					<br />

					<SearchForm
						query={query}
						setQuery={setQuery}
						searchText="Search Sub Category"
					/>
					<br />
					{subs.filter(searched(query)).map((s) => (
						<Card key={s._id}>
							<Card.Body>
								{s.name}

								<Link to={`/admin/sub/${s.slug}`}>
									<span className="btn btn-sm float-right">
										<TooltipDisplay tooltipName="Edit sub category">
											<RiEdit2Fill size={18} />
										</TooltipDisplay>
									</span>
								</Link>
								<span
									className="btn btn-sm float-right"
									onClick={() => handleRemove(s.slug)}
								>
									<TooltipDisplay tooltipName="Delete sub category">
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

export default SubCreate;
