import "./interview.css";
import { formatDateTime, dynamicBgColor } from "../../Utils/mixins";
import { useEffect, useState } from "react";
const Interview = ({ interview, serial, startsAt }) => {
	const [colorCode, setColorCode] = useState(1);
	const colors = {
		1: "past",
		2: "future",
		3: "present",
	};
	const dynamicBgColorHandler = () => setColorCode(dynamicBgColor(startsAt));

	useEffect(() => {
		dynamicBgColorHandler();
	}, [startsAt]);

	return (
		<li className={`interview-li serial-${colors[colorCode]}-line`}>
			<div className={`serial serial-${colors[colorCode]}`}>
				<span>{serial}</span>
			</div>
			<div className="content">
				<p data-id={interview.data} data-company={interview.company}>
					{interview.company}
				</p>
				<span>{formatDateTime(startsAt)}</span>
			</div>
		</li>
	);
};

export default Interview;