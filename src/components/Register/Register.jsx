import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/usersAPI";
import { toast } from "react-hot-toast";

const Register = ({setProgress}) => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onChange = (obj) => {
		// console.log(obj)
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[obj.target.name]: obj.target.value,
		}));
		// console.log(credentials)
	};

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	const handleSignUp = async () => {
		// console.log("cred" , credentials);
		if(credentials.password.length < 5) {
			toast.error("Password must be at least 5 chars long!");
		}
		else if(!isValidEmail(credentials.email)) {
			toast.error("Invalid email address!");
		}
		
		else {
			setProgress(30);
			const res = await registerUser(credentials);
			// console.log(res);
			if (res.message) {
				setProgress(100);
				toast.error(res.message);
			} 
			else {
				toast.success("User registered!");
				toast.success("Login here!");
				navigate("/login");
				setProgress(100);
			}
		}

	};

	return (
		<div className='reg-main'>
			<div className='reg-nav'>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
					}}
					className='Logo'>
					<img
						src='https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png'
						alt='logo'
					/>
					<span>Contacts</span>
				</div>
				<button className='login' onClick={() => navigate("/login")}>
					Log in
				</button>
			</div>

			<div className='reg-content'>
				<div className='left'>
					<img src='register.png' alt='' />
				</div>
				<div className='right'>
					<h1>Create your account</h1>
					<div>
						<label>Name : </label>
						<input
							name='name'
							value={credentials.name}
							onChange={onChange}
							type='text'
						/>
					</div>
					<div>
						<label>Email : </label>
						<input
							name='email'
							value={credentials.email}
							onChange={onChange}
							type='email'
						/>
					</div>
					<div>
						<label>Password : </label>
						<input
							name='password'
							value={credentials.password}
							onChange={onChange}
							type='password'
						/>
					</div>
					<button className='signup' onClick={handleSignUp}>
						Sign Up
					</button>
					<label style={{ marginTop: "20px" }}>
						Already have an account? <Link to='/login'>Log in</Link>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Register;
