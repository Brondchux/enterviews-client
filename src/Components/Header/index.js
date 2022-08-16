import { Link, NavLink } from "react-router-dom";
import constants from "../../Utils/constants";
import "./header.css";

const Header = () => {
	const activeClassName = "active";

	return (
		<header>
			<div class="brand">
				<Link to={{ pathname: "/" }}>
					<h1>{constants.BRAND}</h1>
				</Link>
				<p>keep track your interviews</p>
			</div>
			<nav class="navigation">
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
