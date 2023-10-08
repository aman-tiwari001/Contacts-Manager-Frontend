import React, { useState } from "react";
import { createContact } from "../../api/contactsAPI";
import "./CreateContact.css";
import { toast } from "react-hot-toast";

const CreateContact = ({ setShowCreatePopUp }) => {
	const [details, setDetails] = useState({ name: "", phone: "", email: "" });
	const onChange = (obj) => {
		setDetails({ ...details, [obj.target.name]: obj.target.value });
	};

	const handleSave = async () => {
		const res = await createContact(details);
		// console.log(res);
		if (res.message) {
			toast.error(res.message);
		} else {
			setShowCreatePopUp(false);
			document.querySelector(".contactField-container").style.zIndex = 0;
			toast.success("New contact created!");
		}
	};

	return (
		<div className='create-bg'>
			<div className='create-container'>
				<div className='create-head'>
					<p></p>
					<h1>Create new contact</h1>
					<img
						onClick={() => {
							setShowCreatePopUp(false);
							document.querySelector(
								".contactField-container "
							).style.zIndex = 1;
						}}
						id='close'
						src='close.png'
						alt=''
					/>
				</div>
				<img className='create-pic' src='/user.png' alt='user' />

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "3px",
					}}>
					<img className='create-icon' src='/user3.png' alt='' />
					<input
						name='name'
						value={details.name}
						onChange={onChange}
						type='text'
						placeholder='Name'
					/>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "3px",
					}}>
					<img className='create-icon' src='/email.png' alt='' />
					<input
						name='email'
						value={details.email}
						onChange={onChange}
						type='email'
						placeholder='Email address'
					/>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "3px",
					}}>
					<img className='create-icon' src='/phone.png' alt='' />
					<input
						name='phone'
						value={details.phone}
						onChange={onChange}
						type='text'
						placeholder='Phone number'
					/>
				</div>
				<button className='save-btn' onClick={handleSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default CreateContact;
