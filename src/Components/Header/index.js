import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import constants from "../../Utils/constants";
import "./header.css";

const Header = () => {
	const activeClassName = "active";
	const interview = useSelector((state) => state.interview.interview);
	const { id } = useParams();

	const fetchDataFromLocalStorage = useCallback(() => {
		if (!id) return;
		if (id && interview) {
			return console.log("I don't need to fetch from LS for id:", id);
			// TODO: Update me to "if (id && interview) return;" after implementing LS
		}
		if (id && !interview) {
			return console.log("Must fetch data from LS for id:", id);
			// dispatch(actions.interview.setInterview(THE DATA HERE))
		}
	}, [id, interview]);

	useEffect(() => {
		fetchDataFromLocalStorage();
	}, [fetchDataFromLocalStorage]);

	return (
		<header>
			<div className="brand">
				<Link to={{ pathname: "/" }}>
					<h1>{constants.BRAND}</h1>
				</Link>
				<p>keep track your interviews</p>
			</div>
			<nav>
				<ul>
					<li>
						<NavLink
							to="/interviews"
							className={({ isActive }) => (isActive ? activeClassName : "")}
						>
							All Interviews
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/add-interview"
							className={({ isActive }) => (isActive ? activeClassName : "")}
						>
							Add Interview
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
