import "../assets/css/Account.css";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actions, thunks } from "../Store";
import { formatDateTime, capitalize } from "../Utils/mixins";
import { FaPowerOff } from "react-icons/fa";
import { ImCalendar } from "react-icons/im";
import { MdOutlineLibraryAdd } from "react-icons/md";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Account = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const signoutHandler = () => {
		dispatch(thunks.signout());
		dispatch(actions.auth.reset());
		navigate("/");
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
							<article className="account-links">
								<div>
									<MdOutlineLibraryAdd />
									<p>
										<Link to={{ pathname: "/add-interview" }} className="link">
											Add new interview
										</Link>
									</p>
								</div>
								<div>
									<ImCalendar />
									<p>
										<Link to={{ pathname: "/interviews" }} className="link">
											My interviews
										</Link>
									</p>
								</div>
								<div>
									<FaPowerOff />
									<p className="link" onClick={signoutHandler}>
										Sign out
									</p>
								</div>
							</article>
						</article>
					</section>
				)}
			</main>
			<Footer />
		</Fragment>
	);
};
export default Account;
