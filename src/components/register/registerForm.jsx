import React, { useState, useEffect, useRef} from "react";
import validator from 'validator'
import axios from "axios";
import "./registerForm.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registerdetail = () => {
	const allEmail = [];
	const allUsername = [];
	const userRef = useRef();
    const errRef = useRef();

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
			console.log(res)
			res.data.map(data => {
				allEmail.push(data.email);
				allUsername.push(data.username);
			})
			console.log(allEmail, allUsername);
		});
        userRef.current.focus();
    }, [])

	useEffect(() => {
        setValidUser(USER_REGEX.test(user));
    }, [user])

	useEffect(() => {
        setValidEmail(validator.isEmail(email));
		console.log(validEmail);
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
        if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
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

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (password !== conPass) {
	// 		alert("Password not match");
	// 		return;
	// 	}
	// 	const data = {
	// 		user,
	// 		email,
	// 		password,
	// 	};
	// 	console.log(data);
	// 	setUsername("");
	// 	setEmail("");
	// 	setPassword("");
	// 	setConfirmPassword("");
	// }

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
						<div className="mb-4">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="username"
							>
								Username
							</label>
							<input
								className="shadow appearance-none border-b border-[#32312d] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								ref={userRef}
								type="text"
								placeholder="Username"
								onChange={(e) => setUser(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="example@lmmifit.com"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								placeholder="******************"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">
								Please choose a password.
							</p>
						</div>
						<div className="mb-6">
							<label
								className="block text-gray-700 text-sm font-bold mb-2"
								htmlFor="password"
							>
								Confirm Password
							</label>
							<input
								className="appearance-non rounded border-b border-[#32312d] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
								id="confirm_password"
								type="password"
								placeholder="******************"
								onChange={(e) => setConPass(e.target.value)}
							/>
							<p className="text-red-500 text-xs italic">
								Please choose a password.
							</p>
						</div>
						<div className="flex items-center justify-between align-middle">
							<button
								className="bg-[#E4665F] hover:bg-[#EDC8D5] text-white font-bold w-full py-2 rounded focus:outline-none focus:shadow-outline"
								type="submit"
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
