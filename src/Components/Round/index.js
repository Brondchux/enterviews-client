const Round = ({ round }) => {
	console.log(round);
	return (
		<li className="interview-li serial-future-line">
			<div className="serial serial-future">
				<span>R1</span>
			</div>
			<div className="content">
				<span>Start: Wednesday, August 17, 2022 at 3:00:00 PM</span>
				<span>End: Wednesday, August 17, 2022 at 3:30:00 PM</span>
				<span>Duration: 0.5 hr</span>
				<span>Completed: No</span>
				<button
					className="mini-btn"
					data-interview="2757707203047"
					data-round="1"
				>
					Mark as complete
				</button>
			</div>
		</li>
	);
};

export default Round;
