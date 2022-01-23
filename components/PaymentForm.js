import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { useGlobal } from "../useContext";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentForm = () => {
	const CARD_OPTIONS = {
		iconStyle: "solid",
		style: {
			base: {
				iconColor: "#616161",
				color: "#616161",
				fontWeight: 400,
				fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
				fontSize: "16px",
				"::placeholder": {
					color: "#616161",
				},
			},
			invalid: {
				iconColor: "#002f69",
				color: "#002f69",
			},
		},
	};

	const stripe = useStripe();
	const elements = useElements();
	const router = useRouter();

	//********************************************************************
	//          STATE MANAGEMENT
	// *******************************************************************

	const [amountState, setAmountState] = useState();
	const [displayAmountIsZeroWarning, setDisplayAmountIsZeroWarning] =
		useState(false);
	const [noPaymentMethodWarning, setNoPaymentMethodWarning] = useState(false);
	const [redirectBecauseFundsAreAdded, setRedirectBecauseFundsAreAdded] =
		useState(false);

	const { expressServerURL } = useGlobal();

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (amountState < 1) {
			setDisplayAmountIsZeroWarning(true);
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!paymentMethod) {
			setNoPaymentMethodWarning(true);
			return;
		}

		const { id } = paymentMethod;

		const requestToServer = await axios.post(`${expressServerURL}/add-funds`, {
			amount: amountState * 100,
			stripeId: id,
			userId: sessionStorage.finLendersUserDataId
		});

		const respondsFromServer = requestToServer.data;

		if (respondsFromServer === "fund-added-success") {
			setRedirectBecauseFundsAreAdded(true);
			let timeOut = setTimeout(() => {
				router.push(`/user-session`);
			}, 2000);
			return () => clearTimeout(timeOut);
		}

		// end of handlesubmit
	};

	//********************************************************************
	//          ACTUAL HTML
	// *******************************************************************

	if (redirectBecauseFundsAreAdded) {
		return (
			<React.Fragment>
				<div className="registrationPageWrapper p-md-5">
					<form className="registrationPageFormBox px-3 pt-5 p-md-5 pb-5">
						<div className="registerFormHeader text-center mb-4 p-0">
							€{amountState} has been added to your account. <br />
							You will be directed to your Dashboard in a moment.
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
		<React.Fragment>
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
						Add Funds To Your Account
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
						Input Top-up Amount
					</div>

					{/* AMOUNT INPUT FIELD */}
					<div className="d-flex flex-column">
						{amountState > 0 && (
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
					</div>

					<div
						className="text-center mt-5 mb-3 mt-md-4"
						style={{
							fontFamily: "Lato",
							fontStyle: "normal",
							fontWeight: "500",
							fontSize: "24px",
							lineHeight: "29px",
							color: "#002f69",
						}}
					>
						Enter Credit Card Details
					</div>

					{/* ****************************************************************** */}
					{/* *****   CREDIT CARD SECTION     ****** */}
					{/* ***************************************************************** */}

					<form onSubmit={handleSubmit} className="">
						<label htmlFor="amount" className="labelInRegistrationForm ps-0">
							Card Details
						</label>
						<div className="p-2" style={{ border: "1px solid lightgray" }}>
							<CardElement
								options={CARD_OPTIONS}
								onChange={() => setNoPaymentMethodWarning(false)}
							/>
						</div>

						{noPaymentMethodWarning && (
							<div className="registrationPageWarningText pt-1">
								Please enter <u>ALL</u> credit card information
							</div>
						)}

						<button
							className="loginFormLoginButton w-100 mt-4"
							style={{ cursor: "pointer" }}
						>
							Add Funds
						</button>

						<div
							className="p-2 mt-3 mb-4 loginBackButton w-100"
							style={{ cursor: "pointer" }}
						>
							<Link href="/user-session" passHref>
								<div className="viewTransactionReportsText text-center">
									Back to dashboard
								</div>
							</Link>
						</div>
					</form>

					{/* end of container */}
				</div>
			</section>
		</React.Fragment>
	);
};

export default PaymentForm;
