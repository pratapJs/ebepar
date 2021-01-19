import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col, Form } from "react-bootstrap";

import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

import {
	getCategories,
	getCategorySubs,
} from "../../../helperFunctions/categoryCRUD";

import { createProduct } from "../../../helperFunctions/productCRUD";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import ImageUpload from "../../../components/forms/ImageUpload";
const initialState = {
	title: "Iphone 11 pro Max",
	description: "Latest Apple product",
	price: "1500",
	categories: [],
	category: "",
	subs: [],
	shipping: "No",
	quantity: "50",
	images: [],
	color: "Red",
	brand: "Apple",
};

const ProductCreate = () => {
	const [values, setValues] = useState(initialState);
	const [subOptions, setSubOptions] = useState([]);
	const [showSub, setShowSub] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	const loadCategories = () =>
		getCategories().then((c) => setValues({ ...values, categories: c.data }));

	useEffect(() => {
		loadCategories();
	}, []);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });

		// console.log(e.target.name, " ----- ", e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				window.alert(`"${res.data.title}" is created`);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);

				toast.error(err.response.data.err);
			});
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log("CLICKED CATEGORY", e.target.value);
		setValues({ ...values, subs: [], category: e.target.value });

		getCategorySubs(e.target.value).then((res) => {
			console.log("SUB OPTIONS ON CATGORY CLICK", res);
			setSubOptions(res.data);
		});
		setShowSub(true);
	};

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
							<h4 className="mt-2">Create Product</h4>
						)}
					</Row>
					<hr />

					<ImageUpload
						values={values}
						setValues={setValues}
						setLoading={setLoading}
					/>

					<ProductCreateForm
						setValues={setValues}
						values={values}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						handleCategoryChange={handleCategoryChange}
						subOptions={subOptions}
						showSub={showSub}
						selected={selected}
						setSelected={setSelected}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default ProductCreate;
