import React from "react";

const LoadingPleaseWait = () => {
	return (
		<section className="p-5 text-center">
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
					Loading, please wait...{" "}
				</div>

				{/* end of SECTION */}
			</div>
		</section>
	);
};

export default LoadingPleaseWait;
