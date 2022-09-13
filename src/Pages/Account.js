import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { actions, thunks } from "../Store";
import { formatDateTime, capitalize } from "../Utils/mixins";

const Account = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const signoutHandler = () => {
		dispatch(thunks.signout());
		dispatch(actions.auth.reset());
		navigate("/signin");
	};

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
							<p className="link" onClick={signoutHandler}>
								Sign out
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
