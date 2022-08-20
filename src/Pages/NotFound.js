import "../assets/css//NotFound.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const NotFound = () => {
	return (
		<Fragment>
			<Header />
			<main className="not-found">
				<section>
					<h2>404</h2>
					<p>
						It'a a dead end! Click
						<Link to={{ pathname: "/" }} className="link">
							&nbsp;here&nbsp;
						</Link>
						to go back home 🙂
					</p>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default NotFound;
