import "../assets/css//AddInterview.css";
import { Fragment } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Form from "../Components/Form";

const AddInterview = () => {
	return (
		<Fragment>
			<Header />
			<main>
				<section className="add-interview-heading">
					<h2>Yeeeehaaw! Let's add it!!!</h2>
				</section>
				<section className="add-interview-form">
					<Form />
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default AddInterview;
