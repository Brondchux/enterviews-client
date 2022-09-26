import "./list.css";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions } from "../../Store";
import constants from "../../Utils/constants";
import {
	formatDateTime,
	dynamicBgColor,
	formatDuration,
} from "../../Utils/mixins";

const List = ({
	type,
	interviewId = null,
	round = null,
	interview = null,
	serial = null,
	startsAt = null,
}) => {
	const dispatch = useDispatch();
	const [colorCode, setColorCode] = useState(constants.PRIORITY.ONE);
	const colors = {
		[constants.PRIORITY.THREE]: constants.TIMELINES.PRESENT,
		[constants.PRIORITY.TWO]: constants.TIMELINES.FUTURE,
		[constants.PRIORITY.ONE]: constants.TIMELINES.PAST,
	};
	const dynamicBgColorHandler = useCallback(() => {
		const selectedTime = startsAt ? startsAt : round.start_time;
		setColorCode(dynamicBgColor(selectedTime));
	}, [startsAt, round]);
	useEffect(() => dynamicBgColorHandler(), [dynamicBgColorHandler]);

	const macHandler = (count, roundId) => {
		dispatch(
			actions.modal.setOptions({
				description: `Are you sure you want to mark round ${count} as complete?`,
				proceedAction: constants.MODAL_ACTIONS.ROUND_MAC,
				proceedData: { interviewId, roundId },
			})
		);
		dispatch(actions.modal.setShowModal(true));
	};

	const deleteHandler = (count, roundId) => {
		dispatch(
			actions.modal.setOptions({
				description: `Are you sure you want to delete round ${count}?`,
				proceedAction: constants.MODAL_ACTIONS.ROUND_DEL,
				proceedData: { interviewId, roundId },
			})
		);
		dispatch(actions.modal.setShowModal(true));
	};

	const roundList = round && interviewId && (
		<Fragment>
			<span>Start: {formatDateTime(round.start_time)}</span>
			<span>End: {formatDateTime(round.end_time)}</span>
			<span>Duration: {formatDuration(round.duration)}</span>
			<span>Completed: {round.completed ? "Yes" : "No"}</span>
			{!round.completed && (
				<section className="round-btns-section">
					<button
						className="round-btn round-mac-btn"
						onClick={() => macHandler(round.count, round.id)}
					>
						{constants.ROUND_BTNS.MAC}
					</button>
					<button
						className="round-btn round-del-btn"
						onClick={() => deleteHandler(round.count, round.id)}
					>
						{constants.ROUND_BTNS.DEL}
					</button>
				</section>
			)}
		</Fragment>
	);

	const companyList = interview && (
		<Fragment>
			<p data-id={interview.data} data-company={interview.company}>
				<Link to={{ pathname: `/interview/${interview.id}` }}>
					{interview.company}
				</Link>
			</p>
			<span>{formatDateTime(startsAt)}</span>
		</Fragment>
	);

	return (
		<li className={`interview-li serial-${colors[colorCode]}-line`}>
			<div className={`serial serial-${colors[colorCode]}`}>
				{interview && <span>{serial}</span>}
				{round && interviewId && <span>{`R${round.count}`}</span>}
			</div>

			<div className="content">
				{type === constants.LIST.COMPANY && companyList}
				{type === constants.LIST.ROUND && roundList}
			</div>
		</li>
	);
};

export default List;
