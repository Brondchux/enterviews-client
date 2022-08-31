import { Fragment } from "react";
import { Link } from "react-router-dom";
import AuthForms from "../Components/AuthForms";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import constants from "../Utils/constants";

const SignUp = () => {
	return (
		<Fragment>
			<Header />
			<main>
				<section className="add-interview-heading">
					<h2>Create an account</h2>
				</section>
				<section className="add-interview-form">
					<AuthForms type={constants.AUTH_TYPES.SIGNUP} />
				</section>
				<section className="centered">
					<p>
						Already have an account?{" "}
						<Link to={"/signin"} className="link">
							Log in
						</Link>
					</p>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default SignUp;
