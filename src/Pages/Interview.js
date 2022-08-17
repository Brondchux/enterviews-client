import "../Styles/Interview.css";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findDataById } from "../Utils/mixins";
import { actions } from "../Store";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import List from "../Components/List";
import Advanced from "../Components/Advanced";
import constants from "../Utils/constants";

const Interview = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const interviews = useSelector((state) => state.interviews.interviews);
	const interview = useSelector((state) => state.interview.interview);

	const fetchInterviewData = useCallback(async () => {
		/* TODO: Store this found interview object as string value to this "id" 
		in localStorage so that when the user refreshes this or any other page 
		and there is an "id", I can use the "id" to retrieve the complete object 
		from localStorage. Make sure to add the fetch from localStorage function 
		in a component shared by all files e.g App, Header, Footer */
		const data = await findDataById(interviews, id);
		dispatch(actions.interview.setInterview(data));
		// Implement store in LS here!
		// Storage name EVS-Interview {interviewId: {...values}}
	}, [id, interviews, dispatch]);

	useEffect(() => {
		fetchInterviewData();
	}, [fetchInterviewData]);

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

	return (
		<Fragment>
			<Header />
			<main>
				{!interview && noInterviewFound}
				{interview && (
					<section className="an-interview">
						<div id="interview-details">
							<h2>{interview.company}</h2>
							<p>Role: {interview.role}</p>
							<p>
								Status:{" "}
								{interview.isStillActive
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
								{interview.rounds &&
									interview.rounds.length &&
									interview.rounds.map((round, index) => (
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
