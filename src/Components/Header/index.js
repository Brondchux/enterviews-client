import "./header.css";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import { GrClose } from "react-icons/gr";
import { actions } from "../../Store";
import constants from "../../Utils/constants";
import Navbar from "../Navbar";

const Header = () => {
	const dispatch = useDispatch();
	const { interview } = useSelector((state) => state.interview);
	const { showMenu } = useSelector((state) => state.modal);
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

	// Get token from local storage if any
	const fetchTokenFromLocalStorage = useCallback(() => {
		const lsToken = localStorage.getItem(constants.LS.TOKEN);
		lsToken && dispatch(actions.auth.setToken(JSON.parse(lsToken)));
	}, [dispatch]);

	useEffect(() => {
		fetchTokenFromLocalStorage();
	}, [fetchTokenFromLocalStorage]);

	// Get user data from local storage if any
	const fetchUserFromLocalStorage = useCallback(() => {
		const lsUser = localStorage.getItem(constants.LS.USER);
		lsUser && dispatch(actions.auth.setUser(JSON.parse(lsUser)));
	}, [dispatch]);

	useEffect(() => {
		fetchUserFromLocalStorage();
	}, [fetchUserFromLocalStorage]);

	const toggleMenu = (visibility) => {
		dispatch(actions.modal.setShowMenu(visibility));
	};

	return (
		<Fragment>
			<header>
				<section className="header-container">
					<div className="brand">
						<Link to={{ pathname: "/" }}>
							{/* <h1>{constants.BRAND}</h1> */}
							<h1>EnterLive</h1>
						</Link>
					</div>
					<div className="hamburger">
						<h1>
							{showMenu ? (
								<GrClose onClick={() => toggleMenu(false)} />
							) : (
								<TiThMenuOutline onClick={() => toggleMenu(true)} />
							)}
						</h1>
					</div>
				</section>
			</header>
			<Navbar />
		</Fragment>
	);
};

export default Header;
