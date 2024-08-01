import React, { useState, useEffect } from "react";
import AOS from "aos";

import "aos/dist/aos.css";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logo, gif, ngoisao } from "@/assets";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import LoginRepon from "./LoginRepon";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "@/components/social/ui/common/LoadingSpinner";
const LoginPage: React.FC = () => {

	const [isPending, setIsPending] = useState(false);

	const [showSignUpForm, setShowSignUpForm] = useState(false);
	const [showSignInForm, setShowSignInForm] = useState(true);
	const [activeForm, setActiveForm] = useState<string>("");

	const [signUpData, setSignUpData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const [signInData, setSignInData] = useState({
		username: "",
		password: "",
	});

	const queryClient = useQueryClient();

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: false,
			mirror: true,
			anchorPlacement: "top-bottom",
		});
	}, []);

	// send verification email
	const { mutate: sendToken, isPending: isSendingToken } = useMutation({
		mutationFn: async (email: string) => {
			try {
				const res = await fetch("/api/auth/confirm/sendToken", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				});
				const data = await res.json();
				if (!res.ok)
					throw new Error(data.error || "Failed to send token.");
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			toast.success("Please check your email for verification link.");
		},
	});

	const { mutate: signup, isError, error, isPending: isSigningup} = useMutation({
		mutationFn: async (formData) => {
			try {
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				const data = await res.json();
				if (!res.ok)
					throw new Error(data.error || "Failed to create account.");
				// console.log(data);
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			toast.success("Account created successfully.");
			sendToken(signUpData.email);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault(); // page won't reload
		// console.log(signUpData);
		// signup(formData);
		// send verification email
		signup(signUpData);
	};

	const toggleForm = (form: string) => {
		if (form === "signUp") {
			setShowSignUpForm(true);
			setShowSignInForm(false);
			setActiveForm("signUp");
		} else if (form === "signIn") {
			setShowSignInForm(true);
			setShowSignUpForm(false);
			setActiveForm("signIn");
		} else {
			setShowSignUpForm(false);
			setShowSignInForm(false);
			setActiveForm("");
		}
		resetFormInputs();
	};

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		form: string
	) => {
		const { name, value } = event.target;
		if (form === "signUp") {
			setSignUpData({ ...signUpData, [name]: value });
		} else if (form === "signIn") {
			setSignInData({ ...signInData, [name]: value });
		}
	};
	const handleSignInSubmit = async (
		event: React.FormEvent<HTMLFormElement>, 
	) => {
		event.preventDefault();
		setIsPending(true);
		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(signInData),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to login.");
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			resetFormInputs();
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsPending(false);
		}
	};

	const resetFormInputs = () => {
		setSignUpData({
			email: "",
			username: "",
			fullName: "",
			password: "",
		});
		setSignInData({
			username: "",
			password: "",
		});
	};

	return (
		<div className="w-full bg-primary">
			<Toaster position="top-center" reverseOrder={false} />
			<video
				autoPlay
				muted
				loop
				playsInline
				className="fixed inset-0 w-full h-full object-cover z-0"
			>
				<source src={ngoisao} type="video/mp4" />
			</video>
			<div className="hidden xl:block ">
				<div className="w-full h-auto bg-center bg-cover duration-500">
					<div className="flex items-center min-h-screen col-span-1  md:col-span-2 gap-[200px] pt-12">
						<div
							data-aos="fade-right"
							className="pl-2 md:pl-[1px] text-center absolute top-12 w-[1200px] font-bold"
						>
							<div
								data-aos="fade-right"
								className="justify-center flex pt-5"
							>
								<Link to="/">
									<img
										src={logo}
										alt="logo"
										className="md:w-[400px] w-[55px] md:h-full h-[55px] bottom-2 flex relative"
									/>
								</Link>
							</div>
							<h1 className="text-sm md:text-8xl text-center font-syncopate text-gray-300">
								Welcome <br /> to AAP
							</h1>
						</div>

						<div className="pl-[250px] top-48 pt-16 relative w-[900px] h-[300px] rounded-[20px]"></div>

						<div
							data-aos="fade-right"
							className="relative flex pr-[200px]"
						>
							{showSignUpForm && (
								<div
									data-aos="fade-left"
									className={`relative z-10 w-[500px] pt-20 px-20 pb-5 bg-primary bg-opacity-50 shadow-md shadow-white rounded-tr-[200px] rounded-xl mr-10 backdrop-blur-md`}
								>
									<div className="absolute w-[400px] h-[70px] -top-[160px] z-40 -left-[170px] transform scale-x-[-1]">
										<img src={gif} />
									</div>
									<h2 className="text-center pb-12 text-5xl font-poppins text-white mb-6">
										Sign Up
									</h2>
									<form
										className="space-y-6"
										onSubmit={handleSubmit}
										noValidate
									>
										{[
											"email",
											"username",
											"fullName",
											"password",
										].map((placeholder, index) => (
											<div
												key={index}
												className="relative pl-12"
											>
												<input
													type={
														placeholder ===
														"password"
															? "password"
															: placeholder ===
															"email"
															? "email"
															: "text"
													}
													name={placeholder}
													value={
														signUpData[
															placeholder as keyof typeof signUpData
														]
													}
													onChange={(e) =>
														handleInputChange(
															e,
															"signUp"
														)
													}
													className="w-full p-2 text-white bg-transparent border-b-2 border-white focus:outline-none peer"
													required
												/>
												<label
													className={`absolute -left-12 top-6 text-gray-400 text-base peer-focus:-top-3 
													peer-focus:left-12 peer-focus:text-sm transition-all duration-300 ${
														signUpData[
															placeholder as keyof typeof signUpData
														]
															? "-top-3 text-sm"
															: ""
													}`}
												>
													{placeholder
														.charAt(0)
														.toUpperCase() +
														placeholder.slice(1)}
												</label>
											</div>
										))}

										<div className="pt-10 relative flex justify-center">
											<Button
												type="submit"
												className="w-[300px] h-[50px] p-2 text-white bg-gray-500 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500"
											>
												{isSigningup ? (
													<LoadingSpinner />
												) : (
													<div>
														C<span className="lowercase">
															reate Account
														</span>
													</div>
												)}
											</Button>
										</div>
										<div className="w-full justify-center flex">
											{isError && (
												<p className="text-red-500">
													{error.message}
												</p>
											)}
										</div>
										<div className="flex pt-12 justify-center items-center text-center">
											<p>You have an account ?</p>
											<div className="w-[70px]">
												<a
													onClick={() =>
														toggleForm("signIn")
													}
													className={`cursor-pointer text-blue-300 transition-all ease-in-out duration-700 text-sm font-poppins relative hover:underline`}
												>
													Sign In
												</a>
											</div>
										</div>
									</form>
								</div>
							)}

							{showSignInForm && (
								<div
									data-aos="fade-left"
									className={`relative z-10 w-[500px] pt-20 px-20 pb-5 bg-primary shadow-md shadow-white bg-opacity-50 rounded-xl rounded-tr-[200px] mr-10 backdrop-blur-md`}
								>
									<div className="absolute w-[400px] h-[70px] -top-[160px] z-40 -left-[170px] transform scale-x-[-1]">
										<img src={gif} />
									</div>
									<h2 className="text-center pb-12 text-5xl font-poppins text-white mb-6">
										Sign In
									</h2>
									<form
										className="space-y-6"
										onSubmit={handleSignInSubmit}
										noValidate
									>
										{["username", "password"].map(
											(placeholder, index) => (
												<div
													key={index}
													className="relative pl-12"
												>
													<input
														type={
															placeholder ===
															"password"
																? "password"
																: "text"
														}
														name={placeholder}
														value={
															signInData[
																placeholder as keyof typeof signInData
															]
														}
														onChange={(e) =>
															handleInputChange(
																e,
																"signIn"
															)
														}
														className="w-full p-2 text-white bg-transparent border-b-2 border-white focus:outline-none peer"
														required
													/>
													<label
														className={`absolute -left-24 top-6 text-gray-400 text-base peer-focus:-top-3 
													peer-focus:left-0 peer-focus:text-sm transition-all duration-300 ml-12 ${
														signUpData[
															placeholder as keyof typeof signUpData
														]
															? "-top-3 text-sm"
															: ""
													}`}
													>
														{placeholder
															.charAt(0)
															.toUpperCase() +
															placeholder.slice(
																1
															)}
													</label>
												</div>
											)
										)}
										<div
											data-aos="fade-left"
											className="pt-0 pb-1 w-full justify-center z-10 items-center flex gap-5"
										>
											<a className="w-full h-5 cursor-pointer flex justify-end  text-blue-300 transition-all ease-in-out duration-700 text-sm font-poppins z-50 relative hover:underline ">
												Recovery Password
											</a>
										</div>
										<div className="pt-2 relative flex justify-center">
											<Button
												type="submit"
												className="w-[300px] h-[50px] text-white bg-gray-500 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500"
											>
												{isPending ? (
													<LoadingSpinner />
												) : (
													<div>
														S
														<span className="lowercase">
															ign In
														</span>
													</div>
												)}
											</Button>
										</div>
										<div className="relative flex justify-center">
											<Button
												type="submit"
												className="flex items-center justify-center w-[300px] h-[50px] text-white bg-gray-900 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500"
											>
												<FcGoogle className="mr-2 h-auto w-[25px]" />
												<div className="flex items-center">
													<span className="lowercase font-bold">
														Sign In with
													</span>
													<span className="ml-1 lowercase">
														Google
													</span>
												</div>
											</Button>
										</div>

										<div className="flex pt-12 justify-center items-center text-center">
											<p>Don't have an account yet?</p>
											<div className="w-[70px]">
												<a
													onClick={() =>
														toggleForm("signUp")
													}
													className={`cursor-pointer text-blue-300 transition-all ease-in-out duration-700 text-sm font-poppins relative hover:underline`}
												>
													Sign Up
												</a>
											</div>
										</div>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="xl:hidden">
				<LoginRepon />
			</div>
		</div>
	);
};

export default LoginPage;
