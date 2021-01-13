import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { VscLocation, VscAccount, VscCallOutgoing } from "react-icons/vsc";
import { AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import Search from "../forms/Search";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { loggedout } from "../../actions/userActions";

const AppHeader = ({ history }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const logout = () => {
		firebase.auth().signOut();
		dispatch(loggedout());
	};

	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container fluid>
					<LinkContainer to="/">
						<Navbar.Brand>EDOKAN</Navbar.Brand>
					</LinkContainer>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />

					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto ">
							<LinkContainer to="/contact">
								<Nav.Link>
									<VscCallOutgoing size={20} /> Contact
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/storelocator">
								<Nav.Link>
									<VscLocation size={20} /> Store Locator
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<i className="fas fa-shopping-cart" /> Cart
								</Nav.Link>
							</LinkContainer>
							{!user ? (
								<NavDropdown
									title="Login"
									id="username"
									className="nav-dropdown "
								>
									<LinkContainer to="/login">
										<NavDropdown.Item>
											{" "}
											<VscAccount /> Login
										</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/register">
										<NavDropdown.Item>
											{" "}
											<AiOutlineUserAdd /> Register{" "}
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<NavDropdown
									title={user.name ? user.name.split(" ")[0] : "User"}
									id="username"
								>
									{user && user.role === "admin" ? (
										<LinkContainer to="/admin/dashboard">
											<NavDropdown.Item>
												{" "}
												<RiDashboardLine /> Admin Dashboard
											</NavDropdown.Item>
										</LinkContainer>
									) : (
										<LinkContainer to="/user/account">
											<NavDropdown.Item>
												{" "}
												<RiDashboardLine /> Dashboard
											</NavDropdown.Item>
										</LinkContainer>
									)}
									<LinkContainer to="/">
										<NavDropdown.Item onClick={logout}>
											<AiOutlineLogout /> Logout
										</NavDropdown.Item>
									</LinkContainer>{" "}
								</NavDropdown>
							)}

							<Search />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default AppHeader;
