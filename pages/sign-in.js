import React, { useEffect, useState } from "react";
import { ImEnter } from "react-icons/im";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useGlobal } from "../useContext";

// component imports
import FinLendersLogo from "../components/FinLendersLogo";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [emailWarning, setEmailWarning] = useState(false);
	const [
		pleaseEnterValidEmailWithAtSymbolWarning,
		setPleaseEnterValidEmailWithAtSymbolWarning,
	] = useState(false);
	const [noSuchUserFound, setNoSuchUserFound] = useState(false);

	const [googleUserNotFound, setGoogleUserNotFound] = useState(false);

	const [passwordMain, setPasswordMain] = useState("");
	const [passwordMainWarning, setPasswordMainWarning] = useState(false);
	const [
		mainPasswordFieldTypeSetToPassword,
		setMainPasswordFieldTypeSetToPassword,
	] = useState(true);
	const [wrongPassword, setWrongPassword] = useState(false);

	const [captchaDone, setCaptchaDone] = useState(false);
	const [pleaseDoCaptchaMessage, setPleaseDoCaptchaMessage] = useState(false);

	const {
		pageOriginURL,
		expressServerURL,
		noUserIdSoRedirectToSigninPage,
		setNoUserIdSoRedirectToSigninPage,
	} = useGlobal();

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const captchaValidationFunction = (token) => {
		setCaptchaDone(true);
		setPleaseDoCaptchaMessage(false);
	};

	const handleSubmit = async () => {
		try {
			if (email.length < 1) {
				setEmailWarning(true);
				return;
			}

			if (!/@/g.test(email) && email.length > 1) {
				setPleaseEnterValidEmailWithAtSymbolWarning(true);
				return;
			}

			if (passwordMain.length < 1) {
				setPasswordMainWarning(true);
				return;
			}

			if (!captchaDone) {
				setPleaseDoCaptchaMessage(true);
				return;
			}

			// CAN submit to server now

			let serverRequest = await axios.post(`${expressServerURL}/sign-in-user`, {
				email,
				passwordMain,
			});
			let serverResponds = await serverRequest.data;

			// entered incorrect EMAIL that does NOT exist

			if (serverResponds === "user-not-found") {
				setNoSuchUserFound(true);
				return;
			}

			if (serverResponds === "wrong-password-entered") {
				setWrongPassword(true);
				return;
			}

			placeUserDataIntoLocalStorageAndRedirect(serverResponds);

			// end of try method
		} catch (error) {
			console.log(error);
		}

		// end of handleSubmit()
	};

	const responseGoogleSignUpButton = async (response) => {
		try {
			let requestToExpress = await axios.post(
				`${expressServerURL}/sign-in-user`,
				{
					email: response.profileObj.email,
					googleId: response.profileObj.googleId,
				}
			);
			let respondsFromExpress = await requestToExpress.data;

			if (respondsFromExpress === "googleId-did-not-match") {
				alert(
					"google ID did NOT match with the email, please check your google address, email and security"
				);
				return;
			}

			if (respondsFromExpress === "user-not-found") {
				setGoogleUserNotFound(true);
				return;
			}

			placeUserDataIntoLocalStorageAndRedirect(respondsFromExpress);

			// end of try method
		} catch (error) {
			console.log(error);
		}

		// end of responseGoogleSignUpButton
	};

	const placeUserDataIntoLocalStorageAndRedirect = (userData) => {
		sessionStorage.finLendersUserDataId = userData;
		window.location.href = `${pageOriginURL}/user-session`;
	};

	//********************************************************************
	//          ACTUAL HTML
	// *******************************************************************
	return (
		<div className="signInPageWrapper p-md-5">
			<form
				className="registrationPageFormBox px-md-3 pt-5 p-md-5"
				style={{ maxWidth: "600px" }}
			>
				<div className="d-flex justify-content-center align-items-center">
					<FinLendersLogo />
				</div>

				<div className="registerFormHeader text-center mb-md-2 p-0">
					Sign into your account
				</div>

				{/* ****************************************************************** */}
				{/* *****   Sign in or sign up Warning SECTION     ****** */}
				{/* ***************************************************************** */}

				{noUserIdSoRedirectToSigninPage && (
					<section className="mt-3 px-md-5">
						<div className="container px-md-5">
							<div
								className="px-4 py-3 d-flex justify-content-center align-items-center"
								style={{
									background: "#f8d7da",
									borderRadius: "5px",
									border: "1px solid #f5c6cb",
								}}
							>
								<div className="signinOrSignupWarningText text-center p-0 m-0">
									You need to sign in or sign up before continuing.
								</div>
							</div>
							{/* end of container */}
						</div>
					</section>
				)}

				{/* ****************************************************************** */}
				{/* *****   Sign up with GOOGLE SECTION     ****** */}
				{/* ***************************************************************** */}

				{/* <section className="mt-4">
					<div className="container">
			

						<div
							className="d-flex flex-column justify-content-center align-items-center"
							onClick={() => {
								setGoogleUserNotFound(false);
								setNoUserIdSoRedirectToSigninPage(false);
							}}
						>
							<GoogleLogin
								clientId="1031087847528-cfu81r2r8bvtje22lc19p89s5khfkm7j.apps.googleusercontent.com"
								buttonText="Sign in with Google"
								onSuccess={responseGoogleSignUpButton}
								onFailure={responseGoogleSignUpButton}
								cookiePolicy={"single_host_origin"}
							/>

							{googleUserNotFound && (
								<div className="registrationPageWarningText pt-1">
									This user not found on our system, please register&nbsp;
									<Link href="/register">
										<a className="warningLinkForEmailPleaseRegister">
											<u>here</u>
										</a>
									</Link>
								</div>
							)}


						</div>

						<div className="d-flex justify-content-center align-items-center my-4 mb-md-2">
							<span
								style={{ textDecoration: "line-through", color: "#777777" }}
							>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</span>

							<span className="registerWithGoogleOrHorizontalLineSeparator labelInRegistrationForm text-center">
								&nbsp; OR sign in by filling in the form &nbsp;
							</span>

							<span
								style={{ textDecoration: "line-through", color: "#777777" }}
							>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</span>
						</div>


					</div>
				</section> */}

				{/* ****************************************************************** */}
				{/* *****   Email SECTION     ****** */}
				{/* *************************************************************** */}

				<section className="mt-4 px-md-5">
					<div className="container px-md-5">
						{/* start of the box that holds ALL elements in email */}
						<div className="d-flex flex-column">
							{/* Warning icon */}
							{emailWarning ||
								(pleaseEnterValidEmailWithAtSymbolWarning && (
									<div style={{ position: "relative" }}>
										<span
											style={{
												marginLeft: "auto",
												color: "#e04B59",
												position: "absolute",
												right: "17px",
												top: "27px",
												zIndex: "1000",
											}}
										>
											<i className="bi bi-exclamation-circle-fill"></i>
										</span>
									</div>
								))}

							<label htmlFor="email" className="labelInRegistrationForm ps-0">
								Email
							</label>

							<input
								type="email"
								id="email"
								className="registrationFormInput p-2"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setEmailWarning(false);
									setPleaseEnterValidEmailWithAtSymbolWarning(false);
									setNoSuchUserFound(false);
									setGoogleUserNotFound(false);
									setNoUserIdSoRedirectToSigninPage(false);
								}}
								placeholder="Enter"
								style={
									/@/g.test(email)
										? { border: "1px solid #28a745", width: "100%" }
										: { width: "100%" }
								}
							/>

							{emailWarning && (
								<div className="registrationPageWarningText pt-1">
									Please enter your email
								</div>
							)}

							{pleaseEnterValidEmailWithAtSymbolWarning && (
								<div className="registrationPageWarningText pt-1">
									Please enter valid email with @ symbol
								</div>
							)}

							{noSuchUserFound && (
								<div className="registrationPageWarningText pt-1">
									Email not found, please register&nbsp;
									<Link href="/register">
										<a className="warningLinkForEmailPleaseRegister">
											<u>here</u>
										</a>
									</Link>
								</div>
							)}

							{/* end of the box that holds ALL elements in email */}
						</div>

						{/* end of Container and Wrapper for Email  */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   Password SECTION     ****** */}
				{/* ***************************************************************** */}

				<section className="mt-4 px-md-5">
					<div className="container px-md-5">
						{/* start of the Div, that wrapps ALL elements together */}
						<div className="d-flex flex-column">
							{/* start of SHOW/HIDE password button */}
							<div style={{ position: "relative", zIndex: "100" }}>
								<span
									className="showHideButtonOnInputInRegistration"
									style={{
										marginLeft: "auto",
										position: "absolute",
										right: "45px",
										top: "29px",
										cursor: "pointer",
									}}
									onClick={() => {
										setMainPasswordFieldTypeSetToPassword(
											!mainPasswordFieldTypeSetToPassword
										);
									}}
								>
									{mainPasswordFieldTypeSetToPassword ? "Show" : "Hide"}
								</span>

								{/* end of SHOW/HIDE password button */}
							</div>

							<label
								htmlFor="passWord"
								className="labelInRegistrationForm ps-0"
							>
								Password
							</label>

							{/* start of a div that wraps INPUT and ALL warning UNDER the input field */}
							<div className="">
								<input
									type={
										mainPasswordFieldTypeSetToPassword ? "password" : "text"
									}
									id="passWord"
									className="registrationFormInput p-2"
									value={passwordMain}
									onChange={(e) => {
										setPasswordMain(e.target.value);
										setPasswordMainWarning(false);
										setWrongPassword(false);
										setGoogleUserNotFound(false);
										setNoUserIdSoRedirectToSigninPage(false);
									}}
									placeholder="Enter a password"
									style={{ width: "100%" }}
								/>

								{passwordMainWarning && (
									<div className="registrationPageWarningText pt-1">
										Please enter password
									</div>
								)}

								{wrongPassword && (
									<div className="registrationPageWarningText pt-1">
										Incorrect password entered, please check password and try
										again
									</div>
								)}

								{/* end of a div that wraps INPUT and ALL warning UNDER the input field */}
							</div>

							{/* end of the Div, that wrapps ALL elements together */}
						</div>

						{/* end of container/wrapper for password */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   CAPTCHA SECTION SECTION     ****** */}
				{/* ***************************************************************** */}

				<section className="mt-4 px-5">
					<div className="container px-5">
						<div className="d-flex justify-content-center align-items-center">
							<ReCAPTCHA
								sitekey={process.env.GOOGLE_SITE_KEY}
								onChange={captchaValidationFunction}
							/>
						</div>

						{pleaseDoCaptchaMessage && (
							<div className="registrationPageWarningText pt-1 text-center">
								Please complete the captcha
							</div>
						)}

						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   Submit and back BUTTONS SECTION     ****** */}
				{/* ***************************************************************** */}

				<section className="mt-4 px-0 pb-5 px-md-5">
					<div className="container px-3 px-md-5">
						<div className="d-flex flex-column justify-content-center align-items-center">
							{/* start of a div that holds 2 buttons  */}
							<div className="d-flex flex-column-reverse flex-md-row w-100 align-items-center justify-content-md-around">
								<button type="button" className="loginBackButton">
									<Link href="/marketplace">
										<a className="signUpLink">Back</a>
									</Link>
								</button>

								<button
									type="button"
									className="loginFormLoginButton mb-3 mb-md-0"
									onClick={handleSubmit}
								>
									Log In
								</button>

								{/* end of a div that holds 2 buttons */}
							</div>

							<div className="px-3 pt-4">
								<Link href="/register">
									<a className="iAlreadyHaveAnAccountText text-center">
										<ImEnter /> Sign up for an account? Sign Up
									</a>
								</Link>
							</div>
						</div>
						{/* end of container */}
					</div>
				</section>

				{/* end of the form */}
			</form>
			{/* end of the signInPageWrapper */}
		</div>
	);
};

export default SignIn;
