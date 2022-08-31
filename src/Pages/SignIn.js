import { Fragment } from "react";
import { Link } from "react-router-dom";
import AuthForms from "../Components/AuthForms";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import constants from "../Utils/constants";

const SignIn = () => {
	return (
		<Fragment>
			<Header />
			<main>
				<section className="add-interview-heading">
					<h2>Account login</h2>
				</section>
				<section className="add-interview-form">
					<AuthForms type={constants.AUTH_TYPES.SIGNIN} />
				</section>
				<section className="centered">
					<p>
						Don't have an account?{" "}
						<Link to={"/signup"} className="link">
							Create one
						</Link>
					</p>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default SignIn;
