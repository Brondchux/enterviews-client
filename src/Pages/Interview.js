import "../assets/css//Interview.css";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findDataById } from "../Utils/mixins";
import { actions, thunks } from "../Store";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import List from "../Components/List";
import Advanced from "../Components/Advanced";
import Spinner from "../Components/Spinner";
import constants from "../Utils/constants";
import Modal from "../Components/Modal";

const Interview = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { showModal } = useSelector((state) => state.modal);
	const { interviews } = useSelector((state) => state.interviews);
	const { rounder } = useSelector((state) => state.rounds);
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

	const fetchInterviewRounds = useCallback(() => {
		const roundData = { interviewId: id };
		dispatch(thunks.getRounds(roundData));
	}, [id, dispatch]);

	useEffect(() => {
		fetchInterviewRounds();
	}, [fetchInterviewRounds]);

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
						<div id="interview-details">
							<h2>{interview.company}</h2>
							<p>Role: {interview.role}</p>
							<p>
								Status:{" "}
								{interview.active
									? constants.STILL_ACTIVE
									: constants.NOT_ACTIVE}
							</p>
						</div>
						<div>
							<h3>
								Rounds - (
								<Link
									className="link"
									to={{ pathname: `/add-rounds/${interview.id}` }}
								>
									New round?
								</Link>
								)
							</h3>
							<ul id="interview-rounds" className="interviews-ul">
								{rounder &&
									rounder.length > 0 &&
									rounder.map((round, index) => (
										<List
											key={index}
											interviewId={interview.id}
											round={round}
											type={constants.LIST.ROUND}
										/>
									))}
							</ul>
						</div>
						<Advanced />
					</section>
				)}
			</main>
			<Footer />
		</Fragment>
	);
};

export default Interview;
