import React, { useState, useEffect, useCallback } from "react";
import { useGlobal } from "../../useContext";
import axios from "axios";
import $ from "jquery";
import Image from "next/image";
import Link from "next/link";
import { IoRocketSharp } from "react-icons/io5";
import { useRouter } from "next/router";

// Component Imports
import LoadingPleaseWait from "../../components/LoadingPleaseWait";
import FundedRibbon from "../../components/FundedRibbon";
import ProjectGreenRibbon from "../../components/ProjectGreenRibbon";
import ProgressCircleComponent from "../../components/ProgressCircleComponent";
import MapBoxForSingleProjectDetails from "../../components/MapBoxForSingleProjectDetails";
import Footer from "../../components/Footer";
import UserSessionNavbar from "../../components/UserSessionNavBar";

const Index = () => {
	const router = useRouter();
	const { expressServerURL} = useGlobal();

	const options = {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	// console.log(campaignDatabase);

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [currentUrl, setCurrentUrl] = useState("");
	const [filteredData, setFilteredData] = useState("empty");

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	let fetchData = async () => {
		let resp = await axios.get(`${expressServerURL}/getfulldata`);
		let final = await resp.data;
		setData(final);

		$(document).ready(() => {
			let pageUrl = window.location.pathname.split("/").pop();
			setCurrentUrl(pageUrl);
		});

		setLoading(false);
	};

	//********************************************************************
	//          USE EFFECT
	// *******************************************************************

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		let finalData = data.find((value) => value.projectName === currentUrl);
		//   console.log("finalData: ", finalData);
		setFilteredData(finalData);
		sessionStorage.projectNameToInvestInto = currentUrl; 
	}, [currentUrl]);


	//********************************************************************
	//          ACTUAL HTML
	// *******************************************************************

	if (loading) {
		return (
			<>
				{/* {sessionStorage.finLendersUserDataId && <UserSessionNavbar />} */}
				<LoadingPleaseWait />;
				{/* {sessionStorage.finLendersUserDataId && <Footer />} */}
			</>
		);
	}

	//********************************************************************
	//          THIS IS MAIN HTML
	// *******************************************************************

	if (filteredData) {
		return (
			<>
				{sessionStorage.finLendersUserDataId && <UserSessionNavbar />}

				{/* this is floating box of investment */}

				{/* this section holds Project and Company NAME */}
				<section className="pt-5 pb-2">
					<div className="container px-0 ps-xxl-5">
						<div className="d-flex flex-column justify-content-center align-items-center align-items-md-start ps-md-3">
							<div
								className="singleProjectHeaderText"
								style={{
									fontFamily: "Lato",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "32px",
									lineHeight: "38.4px",
									color: "#212529",
								}}
							>
								{filteredData.projectNameToDisplayOnACard}
							</div>

							<div
								className="mt-3 mb-3 singleProjectHeaderText"
								style={{
									fontFamily: "Lato",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "16px",
									lineHeight: "24px",
									color: "#212529",
								}}
							>
								by {filteredData.nameOfCompany}
							</div>

							{sessionStorage.finLendersUserDataId && (
								<div className="col-12 col-md-4 mb-5 px-3 d-flex justify-content-center justify-content-md-start ps-md-0">
									<div
										className="p-2 loginFormLoginButton text-center w-100"
										style={{ cursor: "pointer" }}
										onClick={() =>{
                                            router.push(`/invest-into-project`);
                                        }}
									>
										Invest into this project
									</div>
								</div>
							)}
						</div>
						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   WRAPPER THAT HOLDS IMAGE AND PROJECT SUCCESS BOXES     ****** */}
				{/* ***************************************************************** */}

				<section className="px-0 px-lg-5">
					<div className="container px-xxl-5">
						{/* this div holds both ImageBox and SuccessFunded Campaing thing */}
						<div className="d-flex justify-content-between flex-column flex-lg-row">
							{/* ****************************************************************** */}
							{/* *****   IMAGE BOX IN THE ROW   ****** */}
							{/* ***************************************************************** */}

							<div className="">
								{/* start of  Image Box d-flex wrapper */}

								<div className="d-flex flex-column align-items-center justify-content-between">
									<div className="singleProjectImageWrapper">
										{filteredData.ribbonType === "funded" ? (
											<FundedRibbon />
										) : (
											<ProjectGreenRibbon />
										)}
										<Image src={filteredData.imageURL} layout="fill" alt='image1'></Image>
									</div>

									<div className="singleProjectUnderTheImageDiv d-sm-flex justify-content-sm-between align-items-sm-center px-0 px-sm-3">
										{/* ****************************************************************** */}
										{/* *****   PROGRESS BAR MARKER AND TEXT     ****** */}
										{/* ***************************************************************** */}

										{/* APPEARS ON DEVICES BIGGER THAN SM, i.e. 576px */}

										<div
											className="singleProjectProgressBar d-none d-sm-block"
											style={{
												width: `${
													(filteredData.totalFunded /
														filteredData.totalAmountAsStringNoEuroSign) *
													100
												}%`,
											}}
										>
											<div className="singleProjectProgressMarkerRedBox1 text-center pt-1">
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#FFFFFF",
													}}
												>
													{(
														(filteredData.totalFunded /
															filteredData.totalAmountAsStringNoEuroSign) *
														100
													).toFixed(0)}
													%
												</div>
											</div>

											<div className="singleProjectProgressMarkerRedBox2"></div>

											<div className="singleProjectProgressMarketFundedText">
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#FFFFFF",
													}}
												>
													€
													{
														filteredData.totalFunded
															.toFixed(1)
															.replace(/\d(?=(\d{3})+\.)/g, "$&,")
															.split(".")[0]
													}
												</div>

												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#FFFFFF",
													}}
												>
													funded
												</div>

												{/* end of singleProjectProgressMarketFundedText */}
											</div>

											{/* end of singleProjectProgressBar */}
										</div>

										{/* ****************************************************************** */}
										{/* *****   REQUIRED MONTHS AND TOTAL AMOUNT BOX, TO THE RIGHT OF THE TOTAL FUNDED MARKER, UNDER THE IMAGE BOX    ****** */}
										{/* ***************************************************************** */}

										<div className="text-end d-none d-sm-block">
											<div
												style={{
													fontFamily: "Lato",
													fontStyle: "normal",
													fontWeight: "400",
													fontSize: "12px",
													lineHeight: "18px",
													color: "#FFFFFF",
												}}
											>
												required over{" "}
											</div>
											<div
												style={{
													fontFamily: "Lato",
													fontStyle: "normal",
													fontWeight: "400",
													fontSize: "12px",
													lineHeight: "18px",
													color: "#FFFFFF",
												}}
											>
												{filteredData.projectDurationInMonthsJustTheNumber}{" "}
												months
											</div>

											<div
												className="mt-3"
												style={{
													fontFamily: "Lato",
													fontStyle: "normal",
													fontWeight: "400",
													fontSize: "18px",
													lineHeight: "27px",
													color: "#FFFFFF",
												}}
											>
												€{" "}
												{
													filteredData.totalAmountAsStringNoEuroSign
														.toFixed(1)
														.replace(/\d(?=(\d{3})+\.)/g, "$&,")
														.split(".")[0]
												}
											</div>
										</div>

										{/* END OF APPEARS ON DEVICES BIGGER THAN SM, i.e. 576px */}

										{/* ****************************************************************** */}
										{/* *****   UNDER THE IMAGE SECTION APPEARS 0 to 576 devices     ****** */}
										{/* ***************************************************************** */}

										<div
											className="progressBarZeroTo576px mt-5 d-sm-none"
											style={{
												width: `${
													(filteredData.totalFunded /
														filteredData.totalAmountAsStringNoEuroSign) *
													100
												}%`,
											}}
										></div>

										{/* 0 to 576 devices box that holds  Months, Total Required, Progress Circle and Fundeds */}

										<div className="d-flex justify-content-around mt-4 mb-5 d-sm-none">
											{/* BOX1: Reruires over months, and total funding target */}
											<div>
												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#ffffff",
													}}
												>
													requires over
												</div>

												<div
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#ffffff",
													}}
												>
													{filteredData.projectDurationInMonthsJustTheNumber}{" "}
													months
												</div>

												<div
													className="mt-2"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "18px",
														lineHeight: "27px",
														color: "#FFFFFF",
													}}
												>
													€{" "}
													{
														filteredData.totalAmountAsStringNoEuroSign
															.toFixed(1)
															.replace(/\d(?=(\d{3})+\.)/g, "$&,")
															.split(".")[0]
													}
												</div>
											</div>

											{/* BOX2: Total Funded As a circle and percentage */}

											<ProgressCircleComponent
												progress={(
													(filteredData.totalFunded /
														filteredData.totalAmountAsStringNoEuroSign) *
													100
												).toFixed(0)}
											/>

											{/* BOX3: Total Funded number and text */}

											<div className="text-center">
												<div
													className="mt-2"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "21px",
														lineHeight: "32px",
														color: "#00d1c1",
													}}
												>
													€
													{
														filteredData.totalFunded
															.toFixed(1)
															.replace(/\d(?=(\d{3})+\.)/g, "$&,")
															.split(".")[0]
													}
												</div>

												<div
													className="mt-1"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "12px",
														lineHeight: "18px",
														color: "#ffffff",
													}}
												>
													Funded
												</div>
											</div>

											{/* end of 0 to 576 devices box that holds  Months, Total Required, Progress Circle and Fundeds */}
										</div>

										{/* end of  singleProjectUnderTheImageDiv */}
									</div>

									{/* end of  image box d-flex wrapper */}
								</div>

								{/* end of IMAGE BOX */}
							</div>

							{/* ****************************************************************** */}
							{/* *****   INSIDE ROW BOX Flenders Success Box    ****** */}
							{/* ***************************************************************** */}

							<div className=" d-flex px-0 px-sm-5 mt-5 mb-5 mb-lg-0 mt-lg-0">
								<div className="d-flex flex-column align-items-center justify-content-center">
									{filteredData.ribbonType === "funded" ? (
										<div className="fundedOrProjectGreenImageWrapper2">
											<Image
												src="https://flender.ie/assets/success-badge-982ffc1e0871025961c373ae2316bda3e93b51347a106593254d9b5fd36611fd.png"
												layout="fill"
												alt='image2'
											/>
										</div>
									) : (
										<div className="fundedOrProjectGreenImageWrapper">
											<Image
												src="https://flender.ie/assets/project-green-campaign-success-tag-f73fb198dcac56ac8b117d94be9f74340d9f50b159213a87d9d64f9573b545a7.png"
												layout="fill"
												alt='image3'
											/>
										</div>
									)}

									{filteredData.ribbonType === "funded" ? (
										<div
											className="text-center mt-3"
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "500",
												fontSize: "28px",
												lineHeight: "34px",
												color: "#212529",
											}}
										>
											Grow your business quickly or earn great returns helping
											businesses expand
										</div>
									) : (
										<div
											className="text-center mt-3"
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "500",
												fontSize: "24px",
												lineHeight: "29px",
												color: "#212529",
											}}
										>
											This campaign focuses on &apos; Rebooting Irish SMEs&apos; and
											working alongside our SME community to assist in their
											ongoing efforts to reopen smoothly after Covid 19
											restrictions.
										</div>
									)}

									{filteredData.ribbonType === "funded" ? (
										<div className="mt-4 singleProjectLearnMoreButton2 py-2 px-3 d-flex justify-content-center align-items-center">
											<Link href="/register">
												<a
													className="text-center"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "18px",
														lineHeight: "27px",
														color: "#ffffff",
													}}
												>
													Get Started
												</a>
											</Link>
										</div>
									) : (
										<div className="mt-4 singleProjectLearnMoreButton p-2 d-flex justify-content-center align-items-center">
											<Link href="/projectgreen">
												<a
													className="text-center"
													style={{
														fontFamily: "Lato",
														fontStyle: "normal",
														fontWeight: "400",
														fontSize: "16px",
														lineHeight: "24px",
														color: "#ffffff",
													}}
												>
													Learn More
												</a>
											</Link>
										</div>
									)}

									{/* end of INSIDE ROW BOX Flenders Success Box */}
								</div>

								{/* end of FLEX box to hold the items in the INSIDE ROW BOX Flenders Success Box   */}
							</div>

							{/* end of display flex box that holds image and project success boxes*/}
						</div>

						{/* end of WRAPPER THAT HOLDS IMAGE AND PROJECT SUCCESS BOXES */}

						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   Why invest in US and Campaign Information section    ****** */}
				{/* ***************************************************************** */}

				<section className="p-0 mt-lg-4 ">
					<div className="container px-4 pe-xxl-5">
						{/* START OF ROW THAT HOLD BOTH invest in us AND compaign information */}
						<div className="row">
							{/* this holds both project green hiddenbox AND why invest in up with bullet points */}
							<div className="col-12 col-lg-7 gx-5 pe-xxl-5">
								{/* start project green hidden box */}
								{filteredData.ribbonType === "projectgreen" && (
									<div
										className="row py-3 mb-4"
										style={{ borderRadius: "5px", border: "2px solid #00A76A" }}
									>
										<div
											className="col-12 mb-3 col-sm-5 col-lg-5 text-center whyInvestWithUsHeadingAndSimilar"
											style={{ color: "#00A76A" }}
										>
											<div
												className="me-3"
												style={{
													display: "inline-block",
													transform: "rotate(-45deg)",
												}}
											>
												<IoRocketSharp />
											</div>
											Project Green
										</div>

										<div className="col-12 col-sm-7 col-lg-7 ps-5">
											<div className="mb-3 bulletPointsAndSimilarTextSize">
												{filteredData.projectGreenMessage}
											</div>

											<Link href="/projectgreen">
												<a>
													<div
														className="mb-3"
														style={{
															fontFamily: "Lato",
															fontStyle: "normal",
															fontWeight: "700",
															fontSize: "12px",
															lineHeight: "12px",
															color: "#ffffff",
															background: "#00a76a",
															width: "fit-content",
															padding: "4px",
															borderRadius: "3px",
														}}
													>
														Learn more about project green
													</div>
												</a>
											</Link>
										</div>
									</div>
								)}
								{/* start project green hidden box */}

								{/* start why invest in us box and bullet points box */}
								<div className="row">
									<div className="col-12 mb-3 col-sm-5 col-lg-5 text-center whyInvestWithUsHeadingAndSimilar">
										Why Invest in us?
									</div>

									<ul className="col-12 col-sm-7 col-lg-7 ps-5">
										{filteredData.whyInvestInUs.map((value) => {
											return (
												<li
													className="mb-3 bulletPointsAndSimilarTextSize"
													key={value}
												>
													{value}
												</li>
											);
										})}
									</ul>
								</div>

								{/* end of start why invest in us box and bullet points box AND project green hidden box */}
							</div>

							{/* START OF Campaign Information BOX */}
							<div
								className="col-12 col-lg-5 p-4 shadow-dreamy-no-hover order-first order-lg-last mb-5 mb-md-4"
								style={{ borderRadius: "5px", height: "fit-content" }}
							>
								<div
									className="text-center"
									style={{
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "500",
										fontSize: "32px",
										lineHeight: "38px",
										color: "#212529",
									}}
								>
									Campaign Information
								</div>

								<hr />

								<div className="row">
									<div className="col-5 text-end">
										<div className="campaignInformationBlueFont">Created</div>

										<div className="campaignInformationBlueFont">Raised</div>

										<div className="campaignInformationBlueFont">Loan Term</div>

										<div className="campaignInformationBlueFont">Address</div>

										<div className="campaignInformationBlueFont">Country</div>
									</div>

									<div className="col-7 text-start">
										<div className="campaignInformationBlackFont">
											{new Date(filteredData.dateCreated).toLocaleDateString(
												"en-GB",
												options
											)}
										</div>

										<div className="campaignInformationBlackFont">
											€
											{
												filteredData.totalFunded
													.toFixed(1)
													.replace(/\d(?=(\d{3})+\.)/g, "$&,")
													.split(".")[0]
											}{" "}
											of €
											{
												filteredData.totalAmountAsStringNoEuroSign
													.toFixed(1)
													.replace(/\d(?=(\d{3})+\.)/g, "$&,")
													.split(".")[0]
											}
										</div>

										<div className="campaignInformationBlackFont">
											{filteredData.projectDurationInMonthsJustTheNumber} Months
										</div>

										<div className="campaignInformationBlackFont">
											{filteredData.address}
										</div>

										<div className="campaignInformationBlackFont">Ireland</div>
									</div>
								</div>

								{/* END OF Campaign Information BOX */}
							</div>

							{/* end of ROW container for Why invest in US and Campaign Infomration section  */}
						</div>

						{/* end of container */}
					</div>
				</section>

				{/* horizontal line separator */}

				<section className="p-0 py-4">
					<div className="container">
						<hr className="singleProjectDetailsHorizonalLine"></hr>

						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   HOW WILL WE USE YOUR INVESTMENT     ****** */}
				{/* ***************************************************************** */}

				<section className="">
					<div className="container px-4 pe-xxl-5">
						<div className="row">
							{/* start why invest in us box and bullet points box */}
							<div className="col-12 col-lg-7 gx-5 pe-xxl-5">
								<div className="row">
									<div className="col-12 mb-3 col-sm-5 col-lg-5 text-center whyInvestWithUsHeadingAndSimilar">
										How will we use your investment?
									</div>

									<div className="col-12 col-sm-7 col-lg-7 ps-5">
										{filteredData.howWillWeUseYourInvestment.map((value) => {
											return (
												<div
													className="mb-3 bulletPointsAndSimilarTextSize"
													key={value}
												>
													{value}
												</div>
											);
										})}
									</div>
								</div>

								{/* end of start why invest in us box and bullet points box */}
							</div>

							{/* end of ROW */}
						</div>

						{/* end of container */}
					</div>
				</section>

				{/* horizontal line separator */}

				<section className="p-0 py-4">
					<div className="container">
						<hr className="singleProjectDetailsHorizonalLine"></hr>

						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   Where we are based     ****** */}
				{/* ***************************************************************** */}

				<section className="">
					<div className="container px-4 pe-xxl-5">
						<div className="row">
							{/* start why invest in us box and bullet points box */}
							<div className="col-12 col-lg-7 gx-5 pe-xxl-5">
								<div className="row">
									<div className="col-12 mb-3 col-sm-5 col-lg-5 text-center        whyInvestWithUsHeadingAndSimilar">
										Where we are based
									</div>

									<div className="col-12 col-sm-7 col-lg-7 ps-0">
										<MapBoxForSingleProjectDetails
											latitude={filteredData.latitudeLongitudeArray[0]}
											longitude={filteredData.latitudeLongitudeArray[1]}
											zoom={10}
										/>
									</div>
								</div>

								{/* end of start why invest in us box and bullet points box */}
							</div>

							{/* end of ROW */}
						</div>

						{/* end of container */}
					</div>
				</section>

				{/* horizontal line separator */}

				<section className="p-0 py-4">
					<div className="container">
						<hr className="singleProjectDetailsHorizonalLine"></hr>

						{/* end of container */}
					</div>
				</section>

				{/* ****************************************************************** */}
				{/* *****   OUR STORY    ****** */}
				{/* ***************************************************************** */}

				<section className="mb-5">
					<div className="container px-4 pe-xxl-5">
						<div className="row">
							{/* start why invest in us box and bullet points box */}
							<div className="col-12 col-lg-7 gx-5 pe-xxl-5">
								<div className="row">
									<div className="col-12 mb-3 col-sm-5 col-lg-5 text-center whyInvestWithUsHeadingAndSimilar">
										Our story
									</div>

									<div className="col-12 col-sm-7 col-lg-7 ps-5">
										{filteredData.ourStory.map((value) => {
											return (
												<div
													className="mb-3 bulletPointsAndSimilarTextSize"
													key={value}
												>
													{value}
												</div>
											);
										})}
									</div>
								</div>

								{/* end of start why invest in us box and bullet points box */}
							</div>

							{/* end of ROW */}
						</div>

						{/* end of container */}
					</div>
				</section>

				{sessionStorage.finLendersUserDataId && <Footer />}
				{/* end of the most important HTML, i.e. end of component */}
			</>
		);
	}

	// all other

	return (
		<>
			{/* {sessionStorage.finLendersUserDataId && <UserSessionNavbar />} */}
			<LoadingPleaseWait />;
			{/* {sessionStorage.finLendersUserDataId && <Footer />} */}
		</>
	);

	// end of component
};

export default Index;
