import "./footer.css";
import constants from "../../Utils/constants";
import { useEffect, useState } from "react";

const Footer = () => {
	const [year, setYear] = useState(null);

	useEffect(() => {
		const date = new Date();
		setYear(date.getFullYear());
	}, []);

	return (
		<footer>
			<p>
				&copy; <span>{year}</span>&nbsp;
				{constants.BRAND}
			</p>
		</footer>
	);
};

export default Footer;
