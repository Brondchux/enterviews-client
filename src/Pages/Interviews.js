import "../Styles/Interviews.css";
import { Fragment, useEffect } from "react";
import Interview from "../Components/Interview";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import { companies } from "../Seed";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../Store";

const Interviews = () => {
	const dispatch = useDispatch();
	const interviews = useSelector((state) => state.interviews.interviews);

	useEffect(() => {
		// add API call later
		dispatch(actions.interviews.setInterviews(companies));
	}, []);

	return (
		<Fragment>
			<Header />
			<main>
				<section className="all-interviews">
					<Search />
					<div>
						<ul id="interview-list" className="interviews-ul">
							{interviews &&
								interviews.map((data, index) => (
									<Interview
										key={data.id}
										serial={index + 1}
										interview={data}
										startsAt={data.rounds[data.rounds.length - 1].startTime}
									/>
								))}
						</ul>
					</div>
				</section>
			</main>
			<Footer />
		</Fragment>
	);
};

export default Interviews;
