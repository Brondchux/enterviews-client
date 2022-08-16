import "../Styles/Home.css";
import { Fragment } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Home = () => {
	return (
		<Fragment>
			<Header />
			<main>
				<section className="uac-wrapper">
					<h2 className="uac-copy">UAC Soon to be added here!</h2>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Home;
