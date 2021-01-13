import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const AdminNav = () => {
	return (
		<Card border="primary">
			<Card.Body>
				<nav>
					<ul className="nav flex-column">
						<li className="nav-item">
							<Link to="/admin/dashboard" className="nav-link">
								Dashboard
								<hr />
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin/product" className="nav-link">
								Product
								<hr />
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin/products" className="nav-link">
								Products
								<hr />
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin/category" className="nav-link">
								Category
								<hr />
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin/sub" className="nav-link">
								Sub Category
								<hr />
							</Link>
						</li>

						<li className="nav-item">
							<Link to="/admin/password" className="nav-link">
								Password
								<hr />
							</Link>
						</li>
					</ul>
				</nav>
			</Card.Body>
		</Card>
	);
};

export default AdminNav;
