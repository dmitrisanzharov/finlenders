import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobal } from "../useContext";

// component imports
import FooterSecureSafeTransparentSection from "../components/FooterSecureSafeTransparentSection";
import FooterLowestSection from "../components/FooterLowestSection";
import UserSessionNavBar from "../components/UserSessionNavBar";

function lastweek() {
	var today = new Date();
	var lastweek = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 7
	);
	return lastweek;
}

const TransactionsReports = () => {
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};


	//********************************************************************
	//          STATE MANAGEMENTS
	// *******************************************************************

	const [startDate, setStartDate] = useState(lastweek());
	const [displayStartDate, setDisplayStartDate] = useState(lastweek());
	const [displayStartDateIsEmptyWarning, setDisplayStartDateIsEmptyWarning] =
		useState(false);

	const [endDate, setEndDate] = useState(new Date());
	const [displayEndDate, setDisplayEndDate] = useState(new Date()); 
	const [displayEndDateIsEmptyWarning, setDisplayEndDateIsEmptyWarning] =
		useState(false);
	const [
		displayWarningEndTimeIsBeforeStartTime,
		setDisplayWarningEndTimeIsBeforeStartTime,
	] = useState(false);
	const [filteredDataReadyForDOM, setFilteredDataReadyForDOM] = useState("");

	const { fetchSingleUserDataToGetSingleUserInfo } = useGlobal();

	// console.log(startDate, "startDate");
	// console.log(endDate, "endDate");

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const handleSeeAllTransactions = async () => {

		// there is BUG, where end date is NOT displaying if you select it, so just ADD +1 to the end date and it will work
		let originalEndDate = new Date(endDate);
		let endDatePlus1 = new Date(originalEndDate.getFullYear(), originalEndDate.getMonth(), originalEndDate.getDate()+1); 


		if (startDate === "") {
			setDisplayStartDateIsEmptyWarning(true);
			return;
		}

		if (endDate === "") {
			setDisplayEndDateIsEmptyWarning(true);
			return;
		}

		const startDateToUnix = Date.parse(startDate);
		const endDateToUnix = Date.parse(endDatePlus1);

		if (startDateToUnix > endDateToUnix) {
			setDisplayWarningEndTimeIsBeforeStartTime(true);
			return;
		}

		let userId = sessionStorage.finLendersUserDataId;

		let fullUserDate = await fetchSingleUserDataToGetSingleUserInfo(userId);
		let userTransactions = await fullUserDate[0].transactions;
		// console.log("userTransactions: ", userTransactions);

		// here I filter between 2 dates;
		let filteredData = userTransactions.filter((value) => {
			return (
				Date.parse(value.date) >= startDateToUnix &&
				Date.parse(value.date) <= endDateToUnix
			);
		});
		setFilteredDataReadyForDOM(filteredData);
		setDisplayStartDate(startDate);
		setDisplayEndDate(endDatePlus1); 


		// console.log(filteredData);
	};


	//********************************************************************
	//          useEffects
	// *******************************************************************

	useEffect(() => {
		handleSeeAllTransactions();
	}, []);

	// ********************************************************************
	//           ACTUAL HTML
	// *******************************************************************

	return (
		<React.Fragment>
			<UserSessionNavBar />

			<section className="p-md-5 py-5 px-2">
				<div className="container" style={{ maxWidth: "600px" }}>
					<div className="welcomeToFlendersUserSessionText text-center">
						Transactions
					</div>

					{/* CALENDAR IN HERE */}

					<div className="row mt-4">
						<div className="col-md-6">
							<label htmlFor="amount" className="labelInRegistrationForm">
								Start date
							</label>
							<input
								type="date"
								className="p-2"
								style={{
									cursor: "text",
									outline: "none",
									border: "1px solid lightgray",
									background: "white",
									borderRadius: "5px",
									width: "100%",
								}}
								onChange={(e) => {
									setStartDate(e.target.value);
									setDisplayStartDateIsEmptyWarning(false);
								}}
							/>

							{displayStartDateIsEmptyWarning && (
								<div className="registrationPageWarningText pt-1">
									Please enter starting date
								</div>
							)}
						</div>

						<div className="col-md-6 mt-3 mt-md-0">
							<label htmlFor="amount" className="labelInRegistrationForm">
								End date
							</label>
							<input
								type="date"
								className="p-2 "
								style={{
									cursor: "text",
									outline: "none",
									border: "1px solid lightgray",
									background: "white",
									borderRadius: "5px",
									width: "100%",
								}}
								onChange={(e) => {
									setEndDate(e.target.value);
									setDisplayEndDateIsEmptyWarning(false);
									setDisplayWarningEndTimeIsBeforeStartTime(false);
								}}
							/>

							{displayEndDateIsEmptyWarning && (
								<div className="registrationPageWarningText pt-1">
									Please enter end date
								</div>
							)}

							{displayWarningEndTimeIsBeforeStartTime && (
								<div className="registrationPageWarningText pt-1">
									Please enter end date that is AFTER start date
								</div>
							)}
						</div>
					</div>

					<button
						className="loginFormLoginButton w-100 mt-4"
						style={{ cursor: "pointer" }}
						onClick={handleSeeAllTransactions}
					>
						See Transactions
					</button>

					{/* DISPLAY ALL TRANSACTIONS SECTION*/}

					{filteredDataReadyForDOM.length >= 1 ? (
						<div className="mt-5">
							<div className="welcomeToFlendersUserSessionText mb-4 text-center d-flex flex-column flex-md-row justify-content-center align-items-center">
								<span>
									{new Date(displayStartDate).toLocaleDateString("en-GB", options)}
								</span>
								<span>&nbsp; - &nbsp;</span>
								<span>
									{new Date(displayEndDate).toLocaleDateString("en-GB", options)}
								</span>
							</div>
							<div className="welcomeToFlendersUserSessionText text-center">
								({" "}
								{parseInt(
									(new Date(displayEndDate) - new Date(displayStartDate)) /
										(1000 * 60 * 60 * 24),
									10
								)}
								&nbsp; days )
							</div>
							<hr />
							<div className="d-flex flex-column-reverse justify-content-center">
								{filteredDataReadyForDOM.map((value) => {
									const { date, amountInEuroCents, type, stripeTransactionId } =
										value;
									return (
										<div
											key={date}
											className="d-flex flex-column py-3 px-4 mt-3"
											style={{
												border: "1px solid lightgray",
												borderRadius: "5px",
											}}
										>
											<div className="d-flex flex-column  flex-md-row justify-content-between">
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "700",
														fontSize: "16px",
														lineHeight: "24px",
														color: "#212529",
													}}
												>
													{type[0].toUpperCase() +
														type.substring(1, type.length)}
												</div>
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "16px",
														lineHeight: "24px",
														color: "#5f6d75",
													}}
												>
													{new Date(date).toLocaleDateString("en-GB", options)}{" "}
													at{" "}
													{new Date(date).toLocaleTimeString("en-GB", {
														hours12: false,
														hour: "2-digit",
														minute: "2-digit",
													})}
												</div>
											</div>
											<hr style={{ borderStyle: "dotted" }} />
											<div className="d-flex flex-column  flex-md-row justify-content-between">
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "16px",
														lineHeight: "24px",
														color: "#5f6d75",
													}}
												>
													Amount:{" "}
													{(amountInEuroCents / 100).toLocaleString("en-GB", {
														style: "currency",
														currency: "EUR",
													})}
												</div>
												<div
													className="mt-2 mt-md-0"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "24px",
														color: "#5f6d75",
													}}
												>
													<strong style={{ color: "#212529" }}>
														Transaction ID:
													</strong>{" "}
													{stripeTransactionId}
												</div>
											</div>
										</div>
									);
								})}
							</div>
							{/* end of general holder that displays all transactions */}
						</div>
					) : filteredDataReadyForDOM.length === 0 &&
					  filteredDataReadyForDOM !== "" ? (
						<div className="mt-5">
							<div className="welcomeToFlendersUserSessionText mb-4 text-center d-flex flex-column flex-md-row justify-content-center align-items-center">
								No transactions found
							</div>
						</div>
					) : (
						<div></div>
					)}

					{/* end of container */}
				</div>
			</section>

			<div className="p-4"></div>

			<FooterSecureSafeTransparentSection />
			<FooterLowestSection />
		</React.Fragment>
	);
};

export default TransactionsReports;
