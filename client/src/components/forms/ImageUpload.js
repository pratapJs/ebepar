import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Badge, Form, Image, Row, Col, Figure } from "react-bootstrap";

const ImageUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const fileUploadAndResize = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.images;

		if (files) {
			setLoading(true);
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						axios
							.post(
								`${process.env.REACT_APP_API}/uploadimages`,
								{ image: uri },
								{
									headers: {
										authtoken: user ? user.token : "",
									},
								}
							)
							.then((res) => {
								setLoading(false);
								allUploadedFiles.push(res.data);
								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => {
								setLoading(false);
								console.log("CLOUDINARY UPLOAD ERR", err);
							});
					},
					"base64"
				);
			}
		}
	};

	const handleImageRemove = (public_id) => {
		setLoading(true);
		axios
			.post(
				`${process.env.REACT_APP_API}/removeimages`,
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : "",
					},
				}
			)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				let filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<Form.Group as={Row}>
			<Form.Label column md="4" lg="3">
				Image
			</Form.Label>
			<Col md="8" lg="9">
				<input
					type="file"
					multiple
					accept="images/*"
					onChange={fileUploadAndResize}
				/>
				{values.images &&
					values.images.map((image) => (
						<Figure
							key={image.public_id}
							className="mr-2 "
							style={{ cursor: "pointer" }}
						>
							<Figure.Image src={image.url} thumbnail height={80} width={100} />
							<Badge
								variant="danger"
								onClick={() => handleImageRemove(image.public_id)}
							>
								X
							</Badge>
						</Figure>
					))}
			</Col>
		</Form.Group>
	);
};

export default ImageUpload;
