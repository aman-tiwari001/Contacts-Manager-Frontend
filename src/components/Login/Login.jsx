import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/usersAPI";
import { toast } from "react-hot-toast";

const Login = ({setProgress}) => {
	const navigate = useNavigate();

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const onChange = (obj) => {
		// console.log(obj);
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[obj.target.name]: obj.target.value,
		}));
		// console.log(credentials);
	};

	const handleLogIn = async () => {
		setProgress(30);
		const res = await loginUser(credentials);
		// console.log("token", res);
		localStorage.setItem("access_token", res.access_token);
		if (res.message) {
			toast.error(res.message);
			setProgress(100);
		} else {
			toast.success("Logged in!");
			navigate("/");
			setProgress(100);
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
				<button className='login' onClick={() => navigate("/register")}>
					Sign up
				</button>
			</div>

			<div className='reg-content'>
				<div className='left'>
					<img src='register.png' alt='' />
				</div>
				<div className='right'>
					<h1>Log in to your account</h1>
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
					<button onClick={handleLogIn} className='signup'>
						Log in
					</button>
					<label style={{ marginTop: "20px" }}>
						New to Contacts? <Link to='/register'>Sign up</Link>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Login;
