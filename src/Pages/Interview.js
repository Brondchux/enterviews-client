import "../assets/css//Interview.css";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findDataById } from "../Utils/mixins";
import { actions } from "../Store";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Advanced from "../Components/Advanced";
import Spinner from "../Components/Spinner";
import constants from "../Utils/constants";
import Modal from "../Components/Modal";
import Rounds from "../Components/Rounds";

const Interview = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showModal } = useSelector((state) => state.modal);
	const { interviews } = useSelector((state) => state.interviews);
	const { interview, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.interview
	);

	// TODO: Revisit me to make sure I can refresh my page via url ID
	const fetchInterviewData = useCallback(async () => {
		const data = await findDataById(interviews, id);
		dispatch(actions.interview.setInterview(data));
		data && localStorage.setItem(constants.LS.INTERVIEW, JSON.stringify(data));
	}, [id, interviews, dispatch]);

	useEffect(() => {
		fetchInterviewData();
	}, [fetchInterviewData]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess && !interview) {
			navigate("/interviews");
		}
		dispatch(actions.interview.reset());
	}, [isError, message, isSuccess, interview, navigate, dispatch]);

	const noInterviewFound = (
		<section className="an-interview">
			<div className="centered">
				<h2>No compaaaaany found!</h2>
				<p>
					Follow{" "}
					<Link to={"/interviews"} className="link">
						me
					</Link>{" "}
					to select an interview!
				</p>
			</div>
		</section>
	);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<Fragment>
			<Header />
			<main>
				{!interview && noInterviewFound}
				{showModal && <Modal />}
				{interview && (
					<section className="an-interview">
						<section id="interview-details">
							<h2>{interview.company}</h2>
							<p>Role: {interview.role}</p>
							<p>
								Status:{" "}
								{interview.active
									? constants.STILL_ACTIVE
									: constants.NOT_ACTIVE}
							</p>
						</section>
						<Rounds interviewId={interview.id} />
						<Advanced />
					</section>
				)}
			</main>
			<Footer />
		</Fragment>
	);
};

export default Interview;
