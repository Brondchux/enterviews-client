import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actions, thunks } from "../../Store";
import constants from "../../Utils/constants";
import List from "../List";
import Spinner from "../Spinner";

const Rounds = ({ interviewId }) => {
	const dispatch = useDispatch();
	const { rounder, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.rounds
	);

	const fetchInterviewRounds = useCallback(() => {
		const roundsData = { interviewId };
		dispatch(thunks.getRounds(roundsData));
	}, [interviewId, dispatch]);

	useEffect(() => {
		fetchInterviewRounds();
	}, [fetchInterviewRounds]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess && !rounder) {
			fetchInterviewRounds();
		}
		dispatch(actions.rounds.reset());
	}, [isError, message, isSuccess, rounder, dispatch, fetchInterviewRounds]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section>
			<h3>
				Rounds - (
				<Link className="link" to={{ pathname: `/add-rounds/${interviewId}` }}>
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
							interviewId={interviewId}
							round={round}
							type={constants.LIST.ROUND}
						/>
					))}
			</ul>
		</section>
	);
};

export default Rounds;
