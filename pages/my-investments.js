import React, { useEffect, useState } from "react";
import { useGlobal } from "../useContext";

// component imports
import UserSessionNavbar from "../components/UserSessionNavBar";
import FooterSecureSafeTransparentSection from "../components/FooterSecureSafeTransparentSection";
import FooterLowestSection from "../components/FooterLowestSection";
import LoadingPleaseWait from "../components/LoadingPleaseWait";

const MyInvestments = () => {
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	//********************************************************************
	//          STATE CONTROL
	// *******************************************************************

	const { fetchSingleUserDataToGetSingleUserInfo } = useGlobal();
	const [sessionStorageLoaded, setSessionStorageLoaded] = useState(false);
	const [userDataIsReady, setUserDataIsReady] = useState("");

	//********************************************************************
//          functions
// *******************************************************************

const fetchUserData = async () => {
	let userData = await fetchSingleUserDataToGetSingleUserInfo(
		sessionStorage.finLendersUserDataId
	);
	setUserDataIsReady(userData[0]);
}

	//********************************************************************
	//          useEffect
	// *******************************************************************

	useEffect(() => {
		if (!sessionStorage.finLendersUserDataId) {
			return;
		}
		setSessionStorageLoaded(true);
	}, []);

	useEffect(async () => {
		fetchUserData(); 
	}, [sessionStorageLoaded]);

	//********************************************************************
	//          ACTUAL HTML
	// *******************************************************************

	if (userDataIsReady !== "") {
		return (
			<React.Fragment>
				{sessionStorageLoaded && <UserSessionNavbar />}

				{/* ******************************************* */}
				{/* *****   MAIN HTML SHOULD GO HERE     ****** */}
				{/* ******************************************* */}

				<section className="p-md-5 py-5 px-2">
					<div className="container" style={{ maxWidth: "600px" }}>
						<div className="welcomeToFlendersUserSessionText text-center">
							Total Investments
                            <br />
                    {userDataIsReady.totalInvestments.toLocaleString("en-GB", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
						</div>
						<hr />
						<div className="d-flex flex-column-reverse justify-content-center">
							{userDataIsReady.investments.map((value) => {
								const {
									dateOfInvestment,
									projectInvestmentName,
									amountInvestedInEuros,
									uniqueId,
								} = value;

								return (
									// start of main box that holds Invesmtent data
									<div
										key={uniqueId}
										className="d-flex flex-column py-3 px-4 mt-3"
										style={{
											border: "1px solid lightgray",
											borderRadius: "5px",
										}}
									>
										<div
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "600",
												fontSize: "16px",
												lineHeight: "24px",
												color: "#5f6d75",
											}}
										>Date: &nbsp; 
											{new Date(dateOfInvestment).toLocaleDateString(
												"en-GB",
												options
											)}{" "}
											at{" "}
											{new Date(dateOfInvestment).toLocaleTimeString("en-GB", {
												hours12: false,
												hour: "2-digit",
												minute: "2-digit",
											})}
										</div>
                                        <div className='mt-2'
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "400",
												fontSize: "16px",
												lineHeight: "24px",
												color: "#5f6d75",
											}}
										>Project Unique Name: &nbsp;{projectInvestmentName}
                                            </div>
                                            <div className='mt-2'
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "600",
												fontSize: "16px",
												lineHeight: "24px",
												color: "#5f6d75",
											}}
										>Amount: {amountInvestedInEuros.toLocaleString("en-GB", {
                                            style: "currency",
                                            currency: "EUR",
                                        })}
                                            </div>
                                            <div className='mt-2'
											style={{
												fontFamily: "Lato",
												fontStyle: "normal",
												fontWeight: "400",
												fontSize: "16px",
												lineHeight: "24px",
												color: "#5f6d75",
											}}
										>Transaction Unique ID: &nbsp;  {uniqueId}
                                            </div>
										{/* end of main box that holds Invesmtent data */}
									</div>
								);
							})}
						</div>
					</div>
				</section>
				{/* END OF THE MAJOR HTML */}
				{sessionStorageLoaded && (
					<>
						<FooterSecureSafeTransparentSection />
						<FooterLowestSection />
					</>
				)}
			</React.Fragment>
		);
	}

	return <LoadingPleaseWait />;
};

export default MyInvestments;
