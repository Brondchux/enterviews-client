import "../Styles/AddInterview.css";
import { Fragment, useCallback, useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Form from "../Components/Form";
import { useParams } from "react-router-dom";
import { getInterviewById } from "../Utils/mixins";
import { useSelector } from "react-redux";

const AddInterview = () => {
	const { interviewId } = useParams();
	const [interviewData, setInterviewData] = useState(null);
	const interviews = useSelector((state) => state.interviews.interviews);

	const fetchInterviewData = useCallback(async () => {
		const data = await getInterviewById(interviews, interviewId);
		setInterviewData(data);
	}, [interviews, interviewId]);

	useEffect(() => {
		fetchInterviewData();
	}, [fetchInterviewData]);
	return (
		<Fragment>
			<Header />
			<main>
				<section className="add-interview-heading">
					<h2>Yeeeehaaw! Let's add it!!</h2>
				</section>
				<section className="add-interview-form">
					<Form interviewData={interviewData} />
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default AddInterview;
