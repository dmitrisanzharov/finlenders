import React, { useEffect, useState } from "react";
import Link from "next/link";
import Meta from "../components/Meta";
import Image from "next/image";
import { useGlobal } from "../useContext";

// component imports
import NavBarBorderBlueGreen from "../components/NavBarBorderBlueGreen";
import MarketPlaceProjectCards from "../components/MarketPlaceProjectCards";
import Footer from "../components/Footer";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import UserSessionNavbar from "../components/UserSessionNavBar";

const Marketplace = () => {
	const { loadingData, campaignDatabase } = useGlobal();
	const [ sessionStorageHasLoaded, setSessionStorageHasLoaded ] = useState(false);

	useEffect(() => {
		if(sessionStorage.finLendersUserDataId){
			setSessionStorageHasLoaded(true);
			return;
		}
		return; 
	}, []);

	//********************************************************************
	//          ACTUAL HTMLS
	// *******************************************************************

	if (loadingData) {
		return (
			<>
				<Meta
					title="marketplace"
					keywords="invest, p2p, SME Irish Businesses"
					description="finlenders marketplace, see investment opportunities"
				/>

				<LoadingPleaseWait />
			</>
		);
	}

	return (
		<>
			<Meta
				title="marketplace"
				keywords="invest, p2p, SME Irish Businesses"
				description="finlenders marketplace, see investment opportunities"
			/>

			{sessionStorageHasLoaded && <UserSessionNavbar />}

			{/* HEADING AND TAG LINE */}
			<section className="py-5 p-md-5 text-center">
				<div className="container">
					<div
						className="mb-5"
						style={{
							fontFamily: "Lato",
							fontWeight: "500",
							color: "#002f69",
							lineHeight: "48px",
							fontSize: "40px",
						}}
					>
						Marketplace
					</div>

					<div
						style={{
							fontFamily: "Lato",
							fontWeight: "500",
							color: "#002f69",
							lineHeight: "34px",
							fontSize: "28px",
							fontStyle: "italic",
						}}
					>
						Successful Irish businesses growing with Finlenders finance
					</div>

					{/* end of SECTION */}
				</div>
			</section>

			{/* ****************************************************************** */}
			{/* *****   PROJECTS SECTION     ****** */}
			{/* ***************************************************************** */}

			<section className="px-lg-5 mt-3 mb-5">
				<div className="container" style={{ fontFamily: "Lato" }}>
					<div className="row g-5 justify-content-center">
						{campaignDatabase.map((value) => {
							return (
								<Link href={`/campaigns/${value.projectName}`} key={value._id}>
									<a className="col-12 col-lg-4" style={{ maxWidth: "375px" }}>
										<MarketPlaceProjectCards
											projectInfo={{
												imageURL: value.imageURL,
												nameOfProject: value.projectNameToDisplayOnACard,
												nameOfCompany: value.nameOfCompany,
												interestRateJustNumber:
													value.interestRateToDisplayOnACard,
												projectGrade: value.projectGrade,
												percentageFunded:
													(value.totalFunded /
														value.totalAmountAsStringNoEuroSign) *
													100,
												totalAmountAsStringNoEuroSign:
													value.totalAmountAsStringNoEuroSign,
												projectDurationInMonthsJustTheNumber:
													value.projectDurationInMonthsJustTheNumber,
												ribbonType: value.ribbonType,
											}}
										/>
									</a>
								</Link>
							);
						})}

						{/* end of row */}
					</div>

					{/* end of Projects section */}
				</div>
			</section>
			{sessionStorageHasLoaded && <Footer />}
		</>
	);
};

export default Marketplace;
