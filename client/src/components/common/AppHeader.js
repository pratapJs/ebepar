import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { VscLocation, VscAccount, VscCallOutgoing } from "react-icons/vsc";
import { AiOutlineUserAdd } from "react-icons/ai";
import SearchForm from "../forms/SearchForm";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { loggedout } from "../../actions/userActions";

const AppHeader = ({ history }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	const logOut = () => {
		firebase.auth().signOut();
		dispatch(loggedout());
		history.push("/login");
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
								<NavDropdown title="User" id="username">
									<LinkContainer to="/dashboard">
										<NavDropdown.Item>Dashboard</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/logout">
										<NavDropdown.Item onClick={logOut}>
											{" "}
											Logout{" "}
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}

							<SearchForm />
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default AppHeader;
