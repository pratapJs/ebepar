import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
	getProductsByCount,
	removeProduct,
} from "../../../helperFunctions/productCRUD";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../../../components/Loader";

import AdminProductCard from "../../../components/cards/AdminProductCard";

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(100)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	const handleRemove = (slug) => {
		// let answer = window.confirm("Delete?");
		if (window.confirm("Delete?")) {
			// console.log("send delete request", slug);
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.error(`${res.data.title} is deleted`);
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data);
					console.log(err);
				});
		}
	};
	return (
		<Container fluid>
			<Row>
				<Col lg={2} className="mb-3 ">
					<AdminNav />
				</Col>

				<Col className="mb-3">
					<Row className="justify-content-md-center ">
						{" "}
						{loading ? (
							<h4>
								{" "}
								<Loader />
							</h4>
						) : (
							<h4 className="mt-2">All Products</h4>
						)}
					</Row>
					<hr />
					<Row>
						{products.map((p) => (
							<div key={p._id} className="col-md-4 pb-3">
								<AdminProductCard product={p} handleRemove={handleRemove} />
							</div>
						))}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default AllProducts;
