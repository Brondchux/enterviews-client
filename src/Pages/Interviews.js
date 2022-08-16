import "../Styles/Interviews.css";
import { Fragment, useEffect, useState } from "react";
import Interview from "../Components/Interview";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import { companies } from "../Seed";

const Interviews = () => {
	const [interviews, setInterviews] = useState([
		{ id: 1, company: "Infosys", time: Date.now() },
		{ id: 2, company: "Haven", time: Date.now() },
	]);

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
