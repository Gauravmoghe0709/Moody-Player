import  { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Register", { name, username });
        axios.post("http://localhost:3000/user/register",{
            name,username,password
        }).then((res)=>{
            console.log(res)
        })
        
        navigate("/")


       
	};

	return (
		<div className="rg-container">
			<form className="rg-form" onSubmit={handleSubmit}>
				<h2 className="rg-title">Create account</h2>

				

				<label className="rg-field">
					<span>Full name</span>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Your full name"
						required
					/>
				</label>

				<label className="rg-field">
					<span>Username</span>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Choose a username"
						required
					/>
				</label>

				<label className="rg-field">
					<span>Create password</span>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Create a strong password"
						required
					/>
				</label>

				<button className="rg-btn" type="submit">Register</button>
                    <div>
                        <span>You Already Registered?</span>
                    </div>
                    <button className="rg-login" type="submit" onClick={()=>{navigate("/")}}>Log in</button>


				<p className="rg-note">By registering you agree to our Terms of Service.</p>
			</form>
		</div>
	);
};

export default Register;

