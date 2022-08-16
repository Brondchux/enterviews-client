import "../Styles/Interviews.css";
import { Fragment, useEffect, useState } from "react";
import Interview from "../Components/Interview";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import { companies } from "../Seed";

const Interviews = () => {
	const [interviews, setInterviews] = useState(null);

	useEffect(() => {
		// add API call later
		setInterviews(companies);
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
