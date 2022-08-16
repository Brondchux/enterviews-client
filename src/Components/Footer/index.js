import "./footer.css";
import constants from "../../Utils/constants";

const Footer = () => {
	return (
		<footer>
			<p>
				&copy; <span id="currentYear"></span>
				{constants.BRAND}
			</p>
		</footer>
	);
};

export default Footer;
