import React from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";
import TooltipDisplay from "../TooltipDisplay";
import { Card } from "react-bootstrap";
import logo from "../../assets/logo.svg";

const AdminProductCard = ({ product, handleRemove }) => {
	const { title, images, description, slug } = product;
	return (
		<Card>
			<Card.Img
				src={images && images.length ? images[0].url : logo}
				className="p1"
				style={{ width: "10rem", height: "10rem", objectFit: "fill" }}
			/>

			<Card.Body>
				<Card.Title> {title} </Card.Title>

				<Card.Text>{`${description.substring(0, 50)}....`}</Card.Text>

				<Link to={`/admin/product/${slug}`}>
					<span className="btn btn-sm float-right">
						<TooltipDisplay tooltipName="Edit Product">
							<RiEdit2Fill size={18} />
						</TooltipDisplay>
					</span>
				</Link>
				<span
					className="btn btn-sm float-right"
					onClick={() => handleRemove(slug)}
				>
					<TooltipDisplay tooltipName="Delete Product">
						<RiDeleteBin2Line size={18} />
					</TooltipDisplay>
				</span>
			</Card.Body>
		</Card>
	);
};

export default AdminProductCard;
