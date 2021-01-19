import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

const ProductCreateForm = ({
	handleSubmit,
	handleChange,
	setValues,
	values,
	handleCategoryChange,
	subOptions,
	showSub,
	selected,
	setSelected,
}) => {
	const {
		title,
		description,
		price,
		categories,
		subs,
		quantity,

		color,
		brand,
	} = values;

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Title
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						name="title"
						placeholder="Enter title"
						value={title}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Description
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						name="description"
						placeholder="Enter description"
						value={description}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Price
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="number"
						name="price"
						placeholder="Enter Price"
						value={price}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Shipping
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						as="select"
						name="shipping"
						custom
						className="border border-dark"
						onChange={handleChange}
					>
						<option> Please select</option>
						<option value="No">No</option>
						<option value="Yes">Yes</option>
					</Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Quantity
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="number"
						name="quantity"
						placeholder="Enter quantity"
						value={quantity}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Color
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						name="color"
						placeholder="Enter color"
						value={color}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Brand
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						type="text"
						name="brand"
						placeholder="Enter brand"
						value={brand}
						className="border border-dark"
						onChange={handleChange}
					></Form.Control>
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column md="4" lg="3">
					{" "}
					Category
				</Form.Label>
				<Col md="8" lg="9">
					<Form.Control
						as="select"
						name="category"
						custom
						className="border border-dark"
						onChange={handleCategoryChange}
					>
						<option>Please Select</option>
						{categories.length > 0 &&
							categories.map((c) => (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							))}
					</Form.Control>
				</Col>
			</Form.Group>

			{showSub && (
				<Form.Group as={Row}>
					<Form.Label column md="4" lg="3">
						{" "}
						Sub Category
					</Form.Label>
					<Col md="8" lg="9">
						<Form.Control
							as="select"
							value={subs}
							className="border border-dark"
							onChange={(e) => setValues({ ...values, subs: e.target.value })}
						>
							{subOptions.length &&
								subOptions.map((s) => (
									<option key={s._id} value={s._id}>
										{s.name}
									</option>
								))}
						</Form.Control>
					</Col>
				</Form.Group>
			)}

			<br />
			<Button type="submit" block>
				Save
			</Button>
		</Form>
	);
};

export default ProductCreateForm;
