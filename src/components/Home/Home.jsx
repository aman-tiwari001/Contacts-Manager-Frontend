import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { getAllContacts } from "../../api/contactsAPI";
import Contact from "./Contact";
import CreateContact from "./CreateContact";
import { currentUser } from "../../api/usersAPI";
import AccountHover from "../NavBar/AccountHover";

const Home = ({ setProgress }) => {
	const [allContacts, setAllContacts] = useState([]);
	const [user, setUser] = useState({});
	const [showCreatePopUp, setShowCreatePopUp] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [showAccount, setShowAccount] = useState(false);

	// const navigate = useNavigate();

	const fetchContacts = async () => {
		setProgress(30);
		const access_token = localStorage.getItem("access_token");
		setShowLoader(true);
		setAllContacts(await getAllContacts(access_token));
		setShowLoader(false);
		setProgress(100);
	};
	const fetchUser = async () => {
		const access_token = localStorage.getItem("access_token");
		setUser(await currentUser(access_token));
	};

	useEffect(() => {
		fetchContacts();
		fetchUser();
	}, []);

	useEffect(() => {
		fetchContacts();
	}, [showCreatePopUp]);

	return (
		<>
			<NavBar setProgress={setProgress} setShowAccount={setShowAccount} />
			{showAccount && <AccountHover user={user} />}
			<div
				className='home-container'
				onClick={() => {
					setShowAccount(false);
					document.querySelector(".results-container").style.display =
						"none";
					document.querySelector(".search2").style.display =
						"none";
				}}>
				<button
					onClick={() => {
						setShowCreatePopUp(!showCreatePopUp);
						document.querySelector(
							".contactField-container "
						).style.zIndex = -1;
					}}
					className='create'>
					<img src='add.png' alt='add' /> <span>New Contact</span>
				</button>
				{showCreatePopUp && (
					<CreateContact setShowCreatePopUp={setShowCreatePopUp} />
				)}
				<div className='contactField-container'>
					<span className='name1'>Name</span>
					<span className='phone1'>Phone</span>
					<span className='email1'>Email</span>
				</div>
				<div className='fake'></div>
				{showLoader && (
					<img id='spinner' src='/spinner.gif' alt='spinner' />
				)}
				{Array.isArray(allContacts) && allContacts.length > 0
					? allContacts.map((item) => (
							<Contact
								name={item.name}
								email={item.email}
								phone={item.phone}
								id={item._id}
								key={item._id}
								setProgress={setProgress}
							/>
					  ))
					: !showLoader && (
							<h2 id='no-display' style={{ textAlign: "center" }}>
								No contacts to display
							</h2>
					  )}
			</div>
		</>
	);
};

export default Home;
