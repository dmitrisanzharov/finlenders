import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import $ from "jquery";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	// const expressServerURL = "http://localhost:4000";
	const expressServerURL = "https://finlenders-express-server.herokuapp.com";
	

	//********************************************************************
	//          STATE CONTROL
	// *******************************************************************

	const [pageOriginURL, setPageOriginURL] = useState("");
	const [styleMissionNav, setMissionNav] = useState(false);
	const [styleTeamNav, setStyleTeamNav] = useState(false);
	const [styleFAQNav, setStyleFAQNav] = useState(false);
	const [loadingData, setLoadingData] = useState(true);
	const [campaignDatabase, setCampaignDatabase] = useState([]);

	// ! Registration Page States

	const [
		registrationPageDropDownSelection,
		setRegistrationPageDropDownSelection,
	] = useState("Select type"); // should be 'Select type' by default;
	const [
		registrationPageInvestAsBorderControl,
		setRegistrationPageInvestAsBorderControl,
	] = useState("default");
	const [registrationCompleted, setRegistrationCompleted] = useState(false);

	// ! User-session Page States

	const [noUserIdSoRedirectToSigninPage, setNoUserIdSoRedirectToSigninPage] =
		useState(false);
	const [userAvailableBalance, setUserAvailableBalance] = useState(0);

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const navBarDropdownStyleController = (tab) => {
		if (tab === "mission") {
			setMissionNav(true);
			setStyleTeamNav(false);
			setStyleFAQNav(false);
		}

		if (tab === "team") {
			setMissionNav(false);
			setStyleTeamNav(true);
			setStyleFAQNav(false);
		}

		if (tab === "faq") {
			setMissionNav(false);
			setStyleTeamNav(false);
			setStyleFAQNav(true);
		}

		if (tab === "removeStyle") {
			setMissionNav(false);
			setStyleTeamNav(false);
			setStyleFAQNav(false);
		}

		// end of navBarDropdownStyleController
	};

	let fetchData = async () => {
		let resp = await axios.get(`${expressServerURL}/getfulldata`);
		let data = await resp.data;
		setCampaignDatabase(data);
	};

	let fetchSingleUserDataToSetAvailableBalance = async (userId) => {
		let request = await axios.post(
			`${expressServerURL}/user-session-single-user`,
			{ userId: userId }
		);
		let responds = await request.data;
		const { totalDeposits, totalInvestments, totalWithdrawals } =
			request.data[0];
		let availableBalance = totalDeposits - totalInvestments - totalWithdrawals;
		return availableBalance;
	};

	let fetchSingleUserDataToGetSingleUserInfo = async (userId) => {
		let request = await axios.post(
			`${expressServerURL}/user-session-single-user`,
			{ userId: userId }
		);
		let responds = await request.data;
		return responds;
	};

	//********************************************************************
	//          useEffects
	// *******************************************************************

	useEffect(() => {
		$(document).ready(() => {
			setPageOriginURL(window.location.origin);
		});
	}, []);

	useEffect(() => {
		const unsubscribe = fetchData();
		return unsubscribe;
	}, []);

	useEffect(() => {
		setLoadingData(false);
	}, [campaignDatabase]);

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const pageUnderDevelopment = () => {
		alert("Page under development");
	};

	return (
		<AppContext.Provider
			value={{
				pageOriginURL,
                expressServerURL,
				pageUnderDevelopment,
				styleTeamNav,
				styleMissionNav,
				styleFAQNav,
				navBarDropdownStyleController,
				loadingData,
				campaignDatabase,
				registrationPageDropDownSelection,
				setRegistrationPageDropDownSelection,
				registrationPageInvestAsBorderControl,
				setRegistrationPageInvestAsBorderControl,
				registrationCompleted,
				setRegistrationCompleted,
				noUserIdSoRedirectToSigninPage,
				setNoUserIdSoRedirectToSigninPage,
				fetchSingleUserDataToSetAvailableBalance,
				fetchSingleUserDataToGetSingleUserInfo,
                
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobal = () => {
	return useContext(AppContext);
};
