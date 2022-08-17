import "../Styles/AddInterview.css";
import { Fragment } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Form from "../Components/Form";
import { useSelector } from "react-redux";

const AddInterview = () => {
	const interview = useSelector((state) => state.interview.interview);

	return (
		<Fragment>
			<Header />
			<main>
				<section className="add-interview-heading">
					<h2>Yeeeehaaw! Let's add it!!</h2>
				</section>
				<section className="add-interview-form">
					<Form interviewData={interview} />
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default AddInterview;
