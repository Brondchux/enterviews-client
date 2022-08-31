import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { actions } from "../../Store";
import constants from "../../Utils/constants";
import "./header.css";

const Header = () => {
	const dispatch = useDispatch();
	const activeClassName = "active";
	const interview = useSelector((state) => state.interview.interview);
	const { id } = useParams();

	// Get interview data from local storage if any
	const fetchDataFromLocalStorage = useCallback(() => {
		if (!id) return;
		if (id && interview) return;
		if (id && !interview) {
			const lsData = localStorage.getItem(constants.LS.INTERVIEW);
			lsData && dispatch(actions.interview.setInterview(JSON.parse(lsData)));
		}
	}, [id, interview, dispatch]);

	useEffect(() => {
		fetchDataFromLocalStorage();
	}, [fetchDataFromLocalStorage]);

	// Get user data from local storage if any
	const fetchUserFromLocalStorage = useCallback(() => {
		const lsUser = localStorage.getItem(constants.LS.USER);
		lsUser && dispatch(actions.auth.setUser(JSON.parse(lsUser)));
	}, [dispatch]);

	useEffect(() => {
		fetchUserFromLocalStorage();
	}, [fetchUserFromLocalStorage]);

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
