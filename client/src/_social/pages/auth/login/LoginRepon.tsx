import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { logo, bgSocial, gif, ngoisao } from "@/assets";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@tanstack/react-query";

const LoginRepon = () => {
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

	const {
		mutate: signup,
		isError,
		error,
	} = useMutation({
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
				console.log(data);
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			console.log("ok")
			toast.success("Account created successfully");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault(); // page won't reload
		console.log(signUpData);
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
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
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
			console.log(data);
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			resetFormInputs();
		} catch (error) {
			toast.error(error.message);
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
    <div>
            <div
					className="w-full h-auto relative bg-cover bg-center pt-12 pb-12"
				>
					<div className="relative flex flex-col items-center justify-center min-h-screen gap-8 px-4">
						<div className="flex flex-col items-center pb-6">
							<Link to="http://localhost:3000/">
								<img
                                   data-aos="fade-down"
									src={logo}
									alt="logo"
									className="md:w-[300px] sm:w-[200px] w-[100px] h-auto"
								/>
							</Link>
							<h1    data-aos="fade-down" className="text-3xl md:text-8xl text-center font-poppins sm:text-5xl font-bold text-gray-300 shadow-2xl mt-1">
								Welcome to Social AAP
							</h1>
						</div>
						{/* 
                            ----------------- */}
						<div className="flex justify-center sm:px-12 w-full">
							{showSignUpForm && (
								<div className="w-full max-w-xl p-8 bg-primary backdrop-blur-md bg-opacity-50 shadow-xl rounded-lg">
                                    <h2 className="text-center pb-12 text-2xl sm:text-3xl font-poppins text-white mb-6 lg:text-5xl">
										Sign Up
									</h2>
									<form
                                    data-aos="fade-up"
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
												className="relative"
											>
												<input
                                                    placeholder={
                                                        placeholder
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        placeholder.slice(1)
                                                    }
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
											
											</div>
										))}

										<div className="pt-10 relative flex justify-center">
											<Button 
												type="submit"
											className="w-[300px] ss:w-[400px] h-[50px] p-2 text-white bg-gray-500 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500">
												C<span className="lowercase">reate Account</span>
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
											<p>
												You have an account
											</p>
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
								<div className="w-full max-w-xl p-8 bg-primary backdrop-blur-md bg-opacity-50 shadow-xl rounded-lg">
                                    <h2 className="text-center pb-12 text-2xl sm:text-3xl font-poppins text-white mb-6 lg:text-5xl">
										Sign In
									</h2>
										<form
                                        data-aos="fade-up"
										className="space-y-6"
										onSubmit={handleSignInSubmit}
										noValidate
									>
										{["username", "password"].map(
											(placeholder, index) => (
												<div
													key={index}
													className="relative"
												>
													<input
                                                      placeholder={
                                                        placeholder
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        placeholder.slice(1)
                                                    }
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
												</div>
											)
										)}
										<div
										
											className="pt-0 pb-1 w-full justify-center z-10 items-center flex gap-5"
										>
											<a className="w-full h-5 cursor-pointer flex justify-end  text-blue-300 transition-all ease-in-out duration-700 text-sm font-poppins z-50 relative hover:underline ">
												Recovery Password
											</a>
										</div>
										<div className="pt-2 relative flex justify-center">
											<Button
												type="submit"
												className="w-[300px] ss:w-[400px] h-[50px] text-white bg-gray-500 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500"
											>
												S
												<span className="lowercase">
													ign In
												</span>
											</Button>
										</div>
										<div className="relative flex justify-center">
											<Button
												type="submit"
												className="flex ss:w-[400px] items-center justify-center w-[300px] h-[50px] text-white bg-gray-900 hover:bg-gray-700 transition-all ease-in-out rounded-md text-md font-poppins duration-500"
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
  )
}

export default LoginRepon
