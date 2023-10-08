import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { toast } from "react-hot-toast";
import { getContactsByQuery } from "../../api/contactsAPI";

const NavBar = ({ setShowAccount, setProgress }) => {
	const navigate = useNavigate();

	if(!localStorage.getItem('access_token')) {
		navigate('/register');
	}

	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const fetchResults = async () => {
		console.log("hi");
		const access_token = localStorage.getItem("access_token");
		const res = await getContactsByQuery(access_token, query);
		setSearchResults(res);
		console.log("res", searchResults);
	};

	const handleSearch = () => {
		document.querySelector(".search-box2").style.display = "block";
	};

	return (
		<div className='navbar-container'>
			<div className='navbar'>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "10px",
					}}
					className='logo'>
					<img
						src='https://www.gstatic.com/images/branding/product/1x/contacts_2022_48dp.png'
						alt='logo'
					/>
					<span>Contacts</span>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "15px",
					}}>
					<img
						className='search'
						src='/search.png'
						alt='search'
						onClick={fetchResults}
					/>
					<input
						className='search-box'
						type='text'
						placeholder='Search contacts'
						name='search'
						value={query}
						onChange={(e) => {
							fetchResults(e.target.value);
							document.querySelector(
								".results-container"
							).style.display = "block";

							setQuery(e.target.value);
							if (
								query.length > 0 &&
								window.location.href.toString().includes("/")
							) {
								document.querySelector(
									".contactField-container"
								).style.zIndex = -1;
							}
						}}
					/>
					<input
						className='search-box2'
						type='text'
						placeholder='Search contacts'
						name='search'
						value={query}
						onChange={(e) => {
							fetchResults(e.target.value);
							document.querySelector(
								".results-container"
							).style.display = "block";

							setQuery(e.target.value);
							if (
								query.length > 0 &&
								window.location.href.toString().includes("/")
							) {
								document.querySelector(
									".contactField-container"
								).style.zIndex = -1;
							}
						}}
					/>
					<div className='results-container'>
						{searchResults && searchResults.length > 0 ? (
							searchResults.slice(0, 6).map((item) => {
								return (
									<div
										onClick={() => {
											navigate(`/contact/${item._id}`);
											if (
												window.location.href
													.toString()
													.includes("/contact")
											) {
												window.location.reload();
											}
										}}>
										<div id='res-name'>{item.name}</div>
										<div>{item.email}</div>
										<div>{item.phone}</div>
									</div>
								);
							})
						) : (
							<div>{searchResults.message}</div>
						)}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "15px",
					}}>
					<img
						src='/search.png'
						alt='search'
						className='search2'
						onClick={handleSearch}
					/>

					<img
						style={{ cursor: "pointer" }}
						onMouseEnter={() => {
							setShowAccount(true);
						}}
						onMouseLeave={() => {
							setShowAccount(false);
						}}
						onClick={() => {
							setShowAccount(true);
						}}
						className='user'
						src='/user.png'
						alt='user'
					/>

					<button
						className='logout'
						onClick={() => {
							setProgress(30);
							setTimeout(() => {
								setProgress(100);
							}, 200);
							localStorage.removeItem("access_token");
							navigate("/login");
							toast.success("Logged out!");
						}}>
						Log out
					</button>
					<img
						className='menu'
						src='/logout.png'
						alt='menu'
						onClick={() => {
							setProgress(30);
							setTimeout(() => {
								setProgress(100);
							}, 200);
							localStorage.removeItem("access_token");
							navigate("/login");
							toast.success("Logged out!");
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
