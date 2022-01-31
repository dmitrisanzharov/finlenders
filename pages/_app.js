import "../styles/globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AppProvider } from "../useContext";
import Script from "next/script";

// component imports
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterSecureSafeTransparentSection from "../components/FooterSecureSafeTransparentSection";
import FooterLowestSection from "../components/FooterLowestSection";

function MyApp({ Component, pageProps }) {
	const [domReady, setDomReady] = useState(false);

	//********************************************************************
	//          FUNCTIONS
	// *******************************************************************

	const checkPathNameAndDisplayFooter = () => {
		if (location.pathname === "/sign-in") {
			return false;
		}

		if (location.pathname === "/user-session") {
			return false;
		}

		if (location.pathname === "/add-funds") {
			return false;
		}

		if (location.pathname === "/test") {
			return false;
		}

		if (location.pathname === "/transactions-reports") {
			return false;
		}

		if (location.pathname === "/" && sessionStorage.finLendersUserDataId) {
			return false;
		}

		if (
			/campaigns\/*/.test(location.pathname) &&
			sessionStorage.finLendersUserDataId
		) {
			return false;
		}

		if (location.pathname === "/invest-into-project") {
			return false;
		}

		if (location.pathname === "/my-investments") {
			return false;
		}

		if (location.pathname === "/marketplace") {
			return false;
		}

		return <Navbar />;
	};

	const showNavBar = () => {
		return (
			<>
				{checkPathNameAndDisplayFooter() && <Navbar />}
				{}
			</>
		);
	};

	const showFooter = () => {
		if (location.pathname === "/sign-in") {
			return (
				<>
					<FooterSecureSafeTransparentSection />
					<FooterLowestSection />
				</>
			);
		}

		return <>{checkPathNameAndDisplayFooter() && <Footer />}</>;
	};

	useEffect(() => {
		setDomReady(true);
	}, []);

	return (
		<>
			<AppProvider>
				<Head>
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
						crossOrigin="anonymous"
					></link>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
					></link>
					<link
						href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
						rel="stylesheet"
					/>
				</Head>

				{domReady && showNavBar()}

				<Component {...pageProps} />

				{domReady && showFooter()}

				<Script
					src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
					integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
					crossOrigin="anonymous"
				></Script>

				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
					integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
					crossOrigin="anonymous"
				></Script>

				<Script src="https://www.google.com/recaptcha/api.js"></Script>

			</AppProvider>
		</>
	);
}

export default MyApp;
