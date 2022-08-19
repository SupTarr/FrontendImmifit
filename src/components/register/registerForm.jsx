import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import validator from 'validator'
import axios from "axios";
import "./registerForm.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const config = {
	headers: {
	  "Content-Type": "application/json",
	  'Access-Control-Allow-Origin': '*',
	  'withCredentials': 'true'			
	}
}

const Registerdetail = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [allEmail, setAllEmail] = useState([]);
	const [allUsername, setAllUsername] = useState([]);

	const [user, setUser] = useState("");
	const [validUser, setValidUser] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [conPass, setConPass] = useState("");
	const [validConPass, setValidConPass] = useState(false);
	const [conPassFocus, setConPassFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		axios.get('https://immifit-backend.vercel.app/users').then(res => {
			res.data.map(data => {
				setAllEmail(emails => [...emails, data.email]);
				setAllUsername(users => [...users, data.username]);
			})
		});
		userRef.current.focus();
	}, [])

	useEffect(() => {
		setValidUser(USER_REGEX.test(user));
		console.log(allUsername);
		if (allUsername.find(data => data === user) !== undefined) {
			setErrMsg('Username already exists');
			console.log('Username already exists');
			setValidUser(false);
		}
		console.log(validUser);
	}, [user])

	useEffect(() => {
		console.log(allEmail);
		setValidEmail(validator.isEmail(email));
		if (allEmail.find(data => data === email) !== undefined) {
			setErrMsg('Email already exists');
			console.log('Email already exists');
			setValidEmail(false);
		}
	}, [email])

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
		setValidConPass(password === conPass);
	}, [password, conPass])

	useEffect(() => {
		setErrMsg('');
	}, [user, password, conPass])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!USER_REGEX.test(user) || !PWD_REGEX.test(password)) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post('https://immifit-backend.vercel.app/users',
				JSON.stringify({ username: user, email: email, password: password }), config
			);
			console.log(response?.data);
			console.log(response?.accessToken);
			console.log(response)
			setSuccess(true);
			//clear state and controlled inputs
			//need value attrib on inputs for this
			setUsername("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 409) {
				setErrMsg('Username Taken');
			} else {
				setErrMsg('Registration Failed')
			}
			errRef.current.focus();
		}
	}
	console.log(userFocus);
	return (
		<div className="login relative sm:h-screen">
			<div className="flex flex-col justify-center items-center sm:pt-16 h-[100%]">
				<div className="max-w-5xl flex flex-col justify-center sm:flex-row mobile:m-10">
					<img
						className="shadow-md sm:rounded-l-xl object-cover  sm:max-w-[200px] md:max-w-sm lg:max-w-lg xl:max-w-xl"
						src="../../imagecard2.jpg"
						alt="imagecard"
					></img>
					<form className="flex flex-col justify-center bg-white shadow-md sm:rounded-r-xl px-5 md:max-w-[250px] xl:max-w-[350px] py-5" onSubmit={handleSubmit}>
						<div className="flex text-gray-700 text-2xl font-bold mb-10">
							Sign up
						</div>
						<p ref={errRef} className={errMsg ? "errmsg text-red-500 mb-5" : "offscreen"} aria-live="assertive">{errMsg}</p>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
								Username :
								<FontAwesomeIcon icon={faCheck} className={validUser && user ? "valid" : "hide"} />
								<FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "invalid"} />
							</label>
							<input
								className="shadow appearance-none border-b border-[#32312d] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								value={user}
								ref={userRef}
								autoComplete="off"
								type="text"
								required
								placeholder="Username"
								aria-invalid={validUser ? "false" : "true"}
								aria-describedby="uidnote"
								onFocus={() => setUserFocus(true)}
								onBlur={() => setUserFocus(false)}
								onChange={(e) => setUser(e.target.value)}
							/>
							<p id="uidnote" className={(userFocus && user && !validUser) ? "instructions" : "offscreen"}>
								<FontAwesomeIcon icon={faInfoCircle} />
								Invalid username. <br />
								- 4 to 24 characters. <br />
								- Must begin with a letter. <br />
								- Letters, numbers, underscores, hyphens allowed.
							</p>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email :
								<FontAwesomeIcon icon={faCheck} className={validEmail && email ? "valid" : "hide"} />
								<FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								value={email}
								type="email"
								aria-invalid={validEmail ? "false" : "true"}
								aria-describedby="uidnote"
								autoComplete="off"
								placeholder="example@lmmifit.com"
								onFocus={() => setEmailFocus(true)}
								onBlur={() => setEmailFocus(false)}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<p id="uidnote" className={(emailFocus && email && !validEmail) ? "instructions" : "offscreen"}>
								<FontAwesomeIcon icon={faInfoCircle} />
								Invalid Email.
							</p>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password :
								<FontAwesomeIcon icon={faCheck} className={validPassword && password ? "valid" : "hide"} />
								<FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								value={password}
								type="password"
								required
								aria-invalid={validPassword ? "false" : "true"}
								aria-describedby="pwdnote"
								placeholder="******************"
								onFocus={() => setPasswordFocus(true)}
								onBlur={() => setPasswordFocus(false)}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
								<FontAwesomeIcon icon={faInfoCircle} />
								Invalid password. <br />
								- 8 to 24 characters.<br />
								- Must include uppercase and lowercase letters, a number and a special character.<br />
								- Allowed special characters: <span className="font-semibold text-xs">@ # $ %</span>
							</p>
						</div>
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Confirm Password :
								<FontAwesomeIcon icon={faCheck} className={validConPass && conPass ? "valid" : "hide"} />
								<FontAwesomeIcon icon={faTimes} className={validConPass || !conPass ? "hide" : "invalid"} />
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="confirm_password"
								type="password"
								placeholder="******************"
								value={conPass}
								required
								aria-invalid={validConPass ? "false" : "true"}
								aria-describedby="confirmnote"
								onFocus={() => setConPassFocus(true)}
								onBlur={() => setConPassFocus(false)}
								onChange={(e) => setConPass(e.target.value)}
							/>
							<p id="confirmnote" className={conPassFocus && !validConPass ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} /> 
							Invalid confirm password. <br />
                            - Must match the first password input field.
                        	</p>
						</div>
						<p className="text-gray-700 text-sm mb-6">Already registered? <a href="/login" className="font-bold text-sm">Login</a></p>
						<div className="flex items-center justify-between align-middle">
							<button
								className="bg-[#E4665F] hover:bg-[#EDC8D5] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline"
								type="submit"
								disabled={!validUser || !validEmail || !validPassword || !validConPass ? true : false}
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registerdetail;
