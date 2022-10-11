import "../assets/css/Home.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Banner from "../Components/Banner";

const Home = () => {
	return (
		<Fragment>
			<Header />
			<Banner />
			<main className="copy">
				<section>
					<article>
						<h3>Is this service for me?</h3>
						<p>
							Are you like me, having a hard time keeping track of my many job
							interview schedules?
						</p>
						<p>Do you dislike using the traditional calenders?</p>
						<p>Are you tired of travelling to google to convert timezones?</p>
						<p>
							One last question, will you like to be notified of your interviews
							for the day?
						</p>
					</article>
					<article>
						<h3>Is "yes" your answer?</h3>
						<p>
							Hurry, lets get you{" "}
							<Link to={"/signin"} className="link">
								logged in
							</Link>
							!
						</p>
						<p>
							Wait, your first time here? Welcome!{" "}
							<Link to={"/signup"} className="link">
								Create an account
							</Link>{" "}
							for free, no credit card required.
						</p>
					</article>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Home;
