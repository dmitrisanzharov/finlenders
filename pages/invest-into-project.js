import React, { useEffect, useState } from "react";
import { useGlobal } from "../useContext";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/router";

// components imports
import UserSessionNavbar from "../components/UserSessionNavBar";
import Footer from "../components/Footer";
import LoadingPleaseWait from "../components/LoadingPleaseWait";

const InvestIntoProject = () => {
	const router = useRouter();

	//********************************************************************
	//          STATE MANAGEMENT
	// *******************************************************************
	const { expressServerURL, fetchSingleUserDataToGetSingleUserInfo } =
		useGlobal();
	const [loading, setLoading] = useState(true);
	// const [projectDataIsReady, setProjectDataIsReady] = useState('');
	const [userDataIsReady, setUserDateIsReady] = useState("");
	const [amountState, setAmountState] = useState("");
	const [displayAmountIsZeroWarning, setDisplayAmountIsZeroWarning] =
		useState(false);
	const [
		displayInvestedAmountIsBiggerThanUserBalanceWarning,
		setDisplayInvestedAmountIsBiggerThanUserBalanceWarning,
	] = useState(false);
	const [
		redirectBecauseInvestmentIsSuccess,
		setRedirectBecauseInvestmentIsSuccess,
	] = useState(false);

	//********************************************************************
	//         FUNCTIONS
	// *******************************************************************

	const getUserData = async () => {
		try {
			let responds = await fetchSingleUserDataToGetSingleUserInfo(
				sessionStorage.finLendersUserDataId
			);
			setUserDateIsReady(responds);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const investIntoTheProjectFunction = async () => {
		if (amountState < 1) {
			setDisplayAmountIsZeroWarning(true);
			return;
		}

		if (amountState.length < 1) {
			setDisplayAmountIsZeroWarning(true);
			return;
		}

		if (parseFloat(amountState) > parseFloat(sessionStorage.userBalance)) {
			setDisplayInvestedAmountIsBiggerThanUserBalanceWarning(true);
			return;
		}

		let requestToServer = await axios.post(
			`${expressServerURL}/user-makes-investment`,
			{
				projectName: sessionStorage.projectNameToInvestInto,
				amountInEuros: amountState,
				userId: sessionStorage.finLendersUserDataId,
			}
		);

		const respondsFromServer = await requestToServer.data;
		// console.log("respondsFromServer: ", respondsFromServer);

		if (respondsFromServer === "investment-successful") {
			let fetchUserDataOnExit = await fetchSingleUserDataToGetSingleUserInfo(
				sessionStorage.finLendersUserDataId
			);

			sessionStorage.userBalance =
				fetchUserDataOnExit[0].totalDeposits -
				fetchUserDataOnExit[0].totalInvestments -
				fetchUserDataOnExit[0].totalWithdrawals;

			setRedirectBecauseInvestmentIsSuccess(true);

			let timeOut = setTimeout(() => {
				router.push(`/my-investments`);
			}, 2000);
			return () => clearTimeout(timeOut);
		}

		// end of investIntoTheProjectFunction();
	};

	//********************************************************************
	//         useEffect
	// *******************************************************************

	useEffect(() => {
		getUserData();
	}, []);

	//********************************************************************
	//          ACTUAL HTML
	// *******************************************************************

	if (loading) {
		return <LoadingPleaseWait />;
	}

	if (redirectBecauseInvestmentIsSuccess) {
		return (
			<React.Fragment>
				<div className="registrationPageWrapper p-md-5">
					<form className="registrationPageFormBox px-3 pt-5 p-md-5 pb-5">
						<div className="registerFormHeader text-center mb-4 p-0">
							€{amountState} has been invested into the project. <br />
							You will be directed to your My Investments Page in a moment.
						</div>

						<div className="d-flex justify-content-center align-items-center">
							<div className="registerPageLoadingSpinner"></div>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}

	return (
		<>
			{sessionStorage.projectNameToInvestInto && <UserSessionNavbar />}

			<section className="my-5">
				<div className="container" style={{ maxWidth: "600px" }}>
					<div
						className="mb-5 text-center "
						style={{
							fontFamily: "Lato",
							fontStyle: "normal",
							fontWeight: "700",
							fontSize: "32px",
							lineHeight: "38px",
							color: "#002f69",
						}}
					>
						Invest into Project <br />
						{sessionStorage.projectNameToInvestInto}
					</div>

					<div
						className="text-center mb-4"
						style={{
							fontFamily: "Lato",
							fontStyle: "normal",
							fontWeight: "500",
							fontSize: "24px",
							lineHeight: "29px",
							color: "#002f69",
						}}
					>
						Input Amount You Would Like To Invest <br />
						Your current balance is:{" "}
						{parseFloat(sessionStorage.userBalance).toLocaleString("en-GB", {
							style: "currency",
							currency: "EUR",
						})}
					</div>

					{/* AMOUNT INPUT FIELD */}
					<div className="d-flex flex-column">
						{amountState > 0 &&
							!displayInvestedAmountIsBiggerThanUserBalanceWarning && (
								<div style={{ position: "relative" }}>
									<span
										style={{
											marginLeft: "auto",
											color: "#28a745",
											transform: "scale(1.5)",
											position: "absolute",
											right: "20px",
											top: "25px",
											zIndex: "1000",
										}}
									>
										<TiTick />
									</span>
								</div>
							)}

						{/* Warning icon */}
						{displayAmountIsZeroWarning && (
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
						)}

						<label htmlFor="amount" className="labelInRegistrationForm ps-0">
							Amount
						</label>

						<div className="" style={{ position: "relative" }}>
							<input
								type="number"
								id="amount"
								min="1"
								max="5000"
								className="registrationFormInput p-2"
								value={amountState}
								onChange={(e) => {
									setAmountState(e.target.value);
									setDisplayAmountIsZeroWarning(false);
									setDisplayInvestedAmountIsBiggerThanUserBalanceWarning(false);
								}}
								placeholder="€0.00"
								style={
									amountState > 0
										? { border: "1px solid #28a745", width: "100%" }
										: { width: "100%" }
								}
							/>
						</div>

						{displayAmountIsZeroWarning && (
							<div className="registrationPageWarningText pt-1">
								Incorrect amount. Minimum amount is 1
							</div>
						)}
						{displayInvestedAmountIsBiggerThanUserBalanceWarning && (
							<div className="registrationPageWarningText pt-1">
								Invested amount can NOT be bigger than user Balance
							</div>
						)}
					</div>

					<button
						className="loginFormLoginButton w-100 mt-4"
						style={{ cursor: "pointer" }}
						onClick={investIntoTheProjectFunction}
					>
						Invest into the project
					</button>

					{/* end of container */}
				</div>
			</section>

			{sessionStorage.projectNameToInvestInto && <Footer />}
		</>
	);
};

export default InvestIntoProject;
