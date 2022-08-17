import "../Styles/Interview.css";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { actions } from "../Store";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import constants from "../Utils/constants";
import Round from "../Components/Round";
import Advanced from "../Components/Advanced";

const Interview = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const interview = useSelector((state) => state.interview.interview);
	const interviews = useSelector((state) => state.interviews.interviews);

	const fetchInterviewData = useCallback(() => {
		if (!interviews) return;
		const interviewData = interviews.find((data) => data.id === parseInt(id));
		dispatch(actions.interview.setInterview(interviewData));
	}, [id, interviews, dispatch]);

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
	useEffect(() => fetchInterviewData(), [fetchInterviewData]);

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
								<Link className="link" to={{ pathname: "/add-interview" }}>
									New round?
								</Link>
								)
							</h3>
							<ul id="interview-rounds">
								{interview.rounds.map((round, index) => (
									<Round key={index} round={round} />
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
