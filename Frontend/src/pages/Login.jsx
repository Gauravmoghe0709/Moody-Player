import { useState } from "react";
import "./Login.css";
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = ({setAuth}) => {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3000/user/login",{
				username,password},{withCredentials:true})
			setAuth(true)
			navigate("/")
		} catch (err) {
			alert(err.response?.data?.message || "Login failed");
		}

	

	};



	return (
		<div className="lp-container">
			<div className="lp-card">
				<div className="lp-brand">
					<div className="lp-logo">🎧</div>
					<h1 className="lp-appname">Moody Player</h1>
				</div>

				<form className="lp-form" onSubmit={handleSubmit}>
					<h2 className="lp-title">Welcome</h2>
					<p className="lp-sub">Sign in to continue to your music.</p>



					<label className="lp-label">
						<span>Email</span>
						<input
							type="text"
							value={username}
							onChange={(e) => setusername(e.target.value)}
							placeholder="you@example.com"

						/>
					</label>

					<label className="lp-label">
						<span>Password</span>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter password"
							required
						/>
					</label>

					<button className="lp-btn" type="submit" >Log in</button>

					<div className="lp-divider">
						<span>You Don`t Have Account?</span>
					</div>

					<div className="lp-socials">
						<button type="button" className="lp-social lp-google" onClick={() => { navigate("/Register") }}>Register Here</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;

