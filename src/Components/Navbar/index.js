import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);
	const { showMenu } = useSelector((state) => state.modal);
	const activeClassName = "active";

	const publicNavs = (
		<ul>
			<li>
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/signup"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					Register
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/signin"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					Sign In
				</NavLink>
			</li>
		</ul>
	);

	const privateNavs = (
		<ul>
			<li>
				<NavLink
					to="/interviews"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					Interviews
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/add-interview"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					New Interview
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/account"
					className={({ isActive }) => (isActive ? activeClassName : "")}
				>
					Account
				</NavLink>
			</li>
		</ul>
	);

	return (
		<Fragment>
			{showMenu && (
				<nav>
					{!user && publicNavs}
					{user && privateNavs}
				</nav>
			)}
		</Fragment>
	);
};
export default Navbar;
