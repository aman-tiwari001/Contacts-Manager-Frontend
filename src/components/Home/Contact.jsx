import React, { useState } from "react";
import "./Contact.css";
import { useNavigate } from "react-router-dom";

const Contact = ({ name, phone, email, id, setProgress }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				setProgress(30);
				navigate(`/contact/${id}`);
				// setTimeout(() => {
				// 	setProgress(100);
				// }, 200);
			}}
			className='contact-container'>
			<img className='contact-photo' src='/user4.png' alt='user' />
			<span className='name'>
				{name.length === name.slice(0, 20).length
					? name
					: `${name.slice(0, 20)}...`}
			</span>
			<span className='phone'>
				{phone.length === phone.slice(0, 20).length
					? phone
					: `${phone.slice(0, 20)}...`}
			</span>
			<span className='email'>
				{email.length === email.slice(0, 20).length
					? email
					: `${email.slice(0, 20)}...`}
			</span>
		</div>
	);
};

export default Contact;
