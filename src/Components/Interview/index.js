import "./interview.css";
const Interview = ({ interview, serial }) => {
	return (
		<li className="interview-li">
			<div className="serial">
				<span>{serial}</span>
			</div>
			<div className="content">
				<p className="centered">{interview.company}</p>
			</div>
		</li>
	);
};

export default Interview;
