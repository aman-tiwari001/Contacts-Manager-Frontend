import React, { useEffect, useState } from "react";
import { getContactById, updateContact } from "../../api/contactsAPI";
import "./UpdateContact.css";
import { toast } from "react-hot-toast";

const UpdateContact = ({ setShowUpdatePopUp, id }) => {
	const [details, setDetails] = useState({ name: "", email: "", phone: "" });
	const onChange = (obj) => {
		setDetails({ ...details, [obj.target.name]: obj.target.value });
	};

	const handleUpdate = async () => {
		const res = await updateContact(details, id);
		// console.log(res);
		setShowUpdatePopUp(false);
		toast.success("Contact updated!");
	};

	const fetchContact = async () => {
		setDetails(await getContactById(id));
	};

	useEffect(() => {
		fetchContact();
	}, []);

	return (
		<div className='update-bg'>
			<div className='update-container'>
				<div className='update-head'>
					<p></p>
					<h1>Edit your contact</h1>
					<img
						onClick={() => {
							setShowUpdatePopUp(false);
						}}
						id='close'
						src='/close.png'
						alt=''
					/>
				</div>
				<img className='update-pic' src='/user.png' alt='user' />

				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "3px",
					}}>
					<img className='update-icon' src='/user3.png' alt='user' />
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
					<img className='update-icon' src='/email.png' alt='email' />
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
					<img className='update-icon' src='/phone.png' alt='phone' />
					<input
						name='phone'
						value={details.phone}
						onChange={onChange}
						type='text'
						placeholder='Phone number'
					/>
				</div>
				<button className='update-btn' onClick={handleUpdate}>
					Update
				</button>
			</div>
		</div>
	);
};

export default UpdateContact;
