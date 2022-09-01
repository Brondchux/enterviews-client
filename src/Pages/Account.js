import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { formatDateTime, capitalize } from "../Utils/mixins";

const Account = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<Fragment>
			<Header />
			<main>
				{user && (
					<section className="copy">
						<article>
							<h2>Welcome back {capitalize(user.username)}!</h2>
							<p>
								Thank you for your membership since{" "}
								{formatDateTime(user.createdAt)}
							</p>
						</article>
						<article>
							<h3>Getting started</h3>
							<p>
								<Link to={{ pathname: "/add-interview" }} className="link">
									Add new interview
								</Link>
							</p>
							<p>
								<Link to={{ pathname: "/interviews" }} className="link">
									My interviews
								</Link>
							</p>
							<p>
								<Link to={{ pathname: "/home" }} className="link">
									Sign out
								</Link>
							</p>
						</article>
					</section>
				)}
			</main>
			<Footer />
		</Fragment>
	);
};
export default Account;
