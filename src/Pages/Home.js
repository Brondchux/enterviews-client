import "../Styles/Home.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Snapshots from "../Components/Snapshots";

const Home = () => {
	return (
		<Fragment>
			<Header />
			<main>
				<section className="copy">
					<article className="questions">
						<h2>Why should I use this service? 🤔</h2>
						<p>Do you have need for a new job?</p>
						<p>Are you applying to multiple companies?</p>
						<p>Do you dislike using the traditional calenders?</p>
						<p>Are you tired of travelling to google to convert timezones?</p>
						<p>
							Are you like me who is having a hard time keeping track of these
							interview schedules?
						</p>
						<p>
							One last question, will you like to be notified of your interviews
							for the day?
						</p>
					</article>
					<article className="answers">
						<h3>Did you just answer yes to all those questions? 😳</h3>
						<p>
							Hurry, lets get you{" "}
							<Link to={"/signup"} className="link">
								logged in
							</Link>
							! Wait, you still reading? That's ok{" "}
							<Link to={"/signup"} className="link">
								create an account
							</Link>
							{"."}
						</p>
					</article>
					<article className="snapshots">
						<h3>Want a glimpse of what we are offering you for free? 😀</h3>
						<p>
							Uhmm, don't expect anything fancy, it's strictly functionalities
						</p>
						<Snapshots />
					</article>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Home;
