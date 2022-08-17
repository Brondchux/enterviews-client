import "./list.css";
import {
	formatDateTime,
	dynamicBgColor,
	formatDuration,
} from "../../Utils/mixins";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import constants from "../../Utils/constants";

const List = ({
	type,
	interviewId = null,
	round = null,
	interview = null,
	serial = null,
	startsAt = null,
}) => {
	const [colorCode, setColorCode] = useState(constants.PRIORITY.ONE);
	const colors = {
		[constants.PRIORITY.THREE]: constants.TIMELINES.PRESENT,
		[constants.PRIORITY.TWO]: constants.TIMELINES.FUTURE,
		[constants.PRIORITY.ONE]: constants.TIMELINES.PAST,
	};
	const dynamicBgColorHandler = useCallback(() => {
		const selectedTime = startsAt ? startsAt : round.startTime;
		setColorCode(dynamicBgColor(selectedTime));
	}, [startsAt, round]);

	useEffect(() => dynamicBgColorHandler(), [dynamicBgColorHandler]);

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

	const roundList = round && interviewId && (
		<Fragment>
			<span>Start: {formatDateTime(round.startTime)}</span>
			<span>End: {formatDateTime(round.endTime)}</span>
			<span>Duration: {formatDuration(round.duration)}</span>
			<span>Completed: {round.isCompleted ? "Yes" : "No"}</span>
			<button
				className="mini-btn"
				data-interview={interviewId}
				data-round={round.round}
			>
				{constants.MAC}
			</button>
		</Fragment>
	);

	return (
		<li className={`interview-li serial-${colors[colorCode]}-line`}>
			<div className={`serial serial-${colors[colorCode]}`}>
				{interview && <span>{serial}</span>}
				{round && interviewId && <span>{`R${round.round}`}</span>}
			</div>

			<div className="content">
				{type === constants.LIST.COMPANY && companyList}
				{type === constants.LIST.ROUND && roundList}
			</div>
		</li>
	);
};

export default List;
