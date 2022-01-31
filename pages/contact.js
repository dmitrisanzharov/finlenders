import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// component imports
import MapBoxForContactUsPage from "../components/MapBoxForContactUsPage";
import MapBoxAddressBox from "../components/microcomponents/MapBoxAddressBox";

const contact = () => {
	return (
		<>
			{/* ****************************************************************** */}
			{/* *****   Contact US with a Green background image SECTION     ****** */}
			{/* ***************************************************************** */}

			<div
				className="d-flex justify-content-center"
				style={{ overflow: "hidden", position: "relative" }}
			>
				<div
					className=""
					style={{
						position: "relative",
						height: "315px",
						width: "100%",
						minWidth: "1200px",
					}}
				>
					<Image
						src="/images/contactUsBackground.png"
						layout="fill"
						alt=""
					></Image>
				</div>
				<div
					style={{
						fontFamily: "Lato",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "36px",
						lineHeight: "43px",
						color: "#ffffff",
						position: "absolute",
						top: "120px",
					}}
				>
					Contact Us
				</div>
			</div>

			{/* ****************************************************************** */}
			{/* *****   folds Flenders SME finance BOX and MAP box SECTION     ****** */}
			{/* ***************************************************************** */}

			<section className="px-0 px-lg-5 mb-5 pt-2">
				<div className="container px-xl-5 px-lg-3 px-4">
					{/* controller for Contact us vs Email us */}
					{/* this is ROW box that holds both Boxes */}
					<div className="row">
						{/* box1 box 1 */}
						<div
							className="col-12 col-md-6 pe-md-5 pe-3"
							style={{ position: "relative" }}
						>
							<div
								className="ps-4"
								style={{
									fontFamily: "Lato",
									fontStyle: "normal",
									fontWeight: "300",
									fontSize: "36px",
									lineHeight: "44px",
									color: "#212529",
								}}
							>
								Finlenders SME Finance
							</div>

							<div
								className="px-4 pt-3"
								style={{
									fontFamily: "Lato",
									fontStyle: "normal",
									fontWeight: "400",
									fontSize: "16px",
									lineHeight: "24px",
									color: "#212529",
								}}
							>
								Our mission is to ensure that borrowers can get on with growing
								their business while our lenders enjoy attractive and reliable
								returns.
							</div>

							<div className="ps-4 mt-4 onHoverUnderlineText d-flex align-items center">
								<i className="bi bi-telephone-fill pe-2"></i>

								<Link href="tel:+35315551234">
									<a
										target="_blank"
										style={{
											fontFamily: "Lato",
											fontStyle: "normal",
											fontWeight: "400",
											fontSize: "16px",
											lineHeight: "24px",
											color: "#0077c8",
										}}
									>
										(01) 155 1234
									</a>
								</Link>
							</div>
							<hr />

							<div className="ps-4 mt-2 onHoverUnderlineText d-flex align-items center">
								<i className="bi bi-envelope pe-2"></i>

								<Link href="mailto:info@finlender.com">
									<a
										target="_blank"
										style={{
											fontFamily: "Lato",
											fontStyle: "normal",
											fontWeight: "400",
											fontSize: "16px",
											lineHeight: "24px",
											color: "#0077c8",
										}}
									>
										info@finlender.com
									</a>
								</Link>
							</div>
							<hr />

							<div className="ps-4 mt-2 d-flex align-items center">
								<i className="bi bi-clock pe-2"></i>

								<div
									style={{
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "400",
										fontSize: "16px",
										lineHeight: "24px",
										color: "#212529",
									}}
								>
									Opening Hours: Mon-Fri 9am - 6pm (GMT+1)
								</div>
							</div>
							<hr />

							<div className="ps-4 mt-2 d-flex align-items center">
								<i className="bi bi-geo-alt-fill pe-2"></i>

								<div
									style={{
										fontFamily: "Lato",
										fontStyle: "normal",
										fontWeight: "400",
										fontSize: "16px",
										lineHeight: "24px",
										color: "#212529",
									}}
								>
									Riverside One, Sir John Rogerson&apos;s Quay, Dublin 2, Ireland.
								</div>
							</div>
							<hr />

							{/* this DIV holds all social media */}
							<div className="ps-4 mt-2 d-flex align-items center">
								<Link href="https://www.linkedin.com/company/flender---the-social-lending-network/?utm_source=Website&utm_medium=Website&utm_campaign=contact%20page%20linkedin">
									<a
										className="changeLinkColorInContactUsBox"
										target="_blank"
										style={{ color: "#0278C8", transform: "scale(1.5)" }}
									>
										<i className="bi bi-linkedin"></i>
									</a>
								</Link>

								<span className="ms-4"></span>
								<Link href="https://www.facebook.com/goflender/?utm_source=Website&utm_medium=Website&utm_campaign=contact%20page%20facebook">
									<a
										className="changeLinkColorInContactUsBox"
										target="_blank"
										style={{ color: "#0278C8", transform: "scale(1.5)" }}
									>
										<i className="bi bi-facebook"></i>
									</a>
								</Link>

								<span className="ms-4"></span>
								<Link href="https://www.instagram.com/flendercrowd/?utm_source=Website&utm_medium=Website&utm_campaign=contact%20page%20instagram">
									<a
										className="changeLinkColorInContactUsBox"
										target="_blank"
										style={{ color: "#0278C8", transform: "scale(1.5)" }}
									>
										<i className="bi bi-instagram"></i>
									</a>
								</Link>

								<span className="ms-4"></span>
								<Link href="mailto:info@flender.ie">
									<a
										className="changeLinkColorInContactUsBox"
										target="_blank"
										style={{ color: "#0278C8", transform: "scale(1.5)" }}
									>
										<i className="bi bi-envelope"></i>
									</a>
								</Link>

								{/* end of box that holds all social media */}
							</div>

							{/* end of box1 */}
						</div>

						{/* box2 */}
						<div
							className="col-12 col-md-6 mt-5 mt-md-0"
							style={{ position: "relative" }}
						>
							<MapBoxForContactUsPage
								latitude={53.34606268318522}
								longitude={-6.239991143815918}
								zoom={15}
							/>

							<MapBoxAddressBox />
						</div>

						{/* end of ROW box that holds both boxes */}
					</div>

					{/* end of container */}
				</div>
			</section>

			{/* end of the React fragment that holds all of this sht */}
		</>
	);
};

export default contact;
