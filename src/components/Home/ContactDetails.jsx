import React, { useEffect, useState } from "react";
import { deleteContact, getContactById } from "../../api/contactsAPI";
import NavBar from "../NavBar/NavBar";
import "./ContactDetails.css";
import { useNavigate } from "react-router-dom";
import UpdateContact from "./UpdateContact";
import { toast } from "react-hot-toast";

const ContactDetails = ({ setProgress, setShowAccount }) => {
	const navigate = useNavigate();
	const contact_id = window.location.href.split("/")[4];
	const [details, setDetails] = useState({});
	const [showUpdatePopUp, setShowUpdatePopUp] = useState(false);

	const fetchContactById = async () => {
		setProgress(50);
		setDetails(await getContactById(contact_id));
		setProgress(100);
	};

	const handleDelete = async () => {
		setProgress(30);
		await deleteContact(contact_id);
		navigate("/");
		setProgress(100);
		toast.success("Contact deleted!");
	};

	useEffect(() => {
		fetchContactById();
	}, [showUpdatePopUp]);

	return (
		<div
			className='contact-details-container'
			onClick={() => {
				document.querySelector(".results-container").style.display =
					"none";
			}}>
			<NavBar setProgress={setProgress} setShowAccount={setShowAccount} />
			{showUpdatePopUp && (
				<UpdateContact
					setShowUpdatePopUp={setShowUpdatePopUp}
					id={contact_id}
					setProgress={setProgress}
				/>
			)}
			{details && (
				<>
					<div
						className='details-head'
						onClick={() => {
							document.querySelector(
								".search-box2"
							).style.display = "none";
						}}>
						<div
							className='details-head-div'
							style={{
								display: "flex",
								alignItems: "center",
								gap: "15px",
							}}>
							<img
								className='cont-user-pic'
								src='/user2.png'
								alt='user'
							/>
							<h1>
								{details.name &&
									(details.name.length ===
									details.name.slice(0, 20).length
										? details.name
										: `${details.name.slice(0, 20)}...`)}
							</h1>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "15px",
							}}>
							<img
								className='cont-opts'
								src='/edit.png'
								alt='edit'
								onClick={() => {
									setShowUpdatePopUp(!showUpdatePopUp);
								}}
							/>
							<img
								className='cont-opts'
								src='/delete.png'
								alt='delete'
								onClick={handleDelete}
							/>
						</div>
					</div>
					<div
						className='other-details'
						onClick={() => {
							document.querySelector(
								".search-box2"
							).style.display = "none";
						}}>
						<h3>Contact details</h3>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "15px",
							}}>
							<img src='/phone.png' alt='phone' />
							<span>{details.phone}</span>
						</div>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "15px",
							}}>
							<img src='/email.png' alt='email' />
							<span>{details.email}</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ContactDetails;
