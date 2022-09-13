import "../assets/css//Interviews.css";
import { Fragment, useEffect } from "react";
import List from "../Components/List";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Search from "../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "../Store";
import constants from "../Utils/constants";
import Spinner from "../Components/Spinner";
import { toast } from "react-toastify";

const Interviews = () => {
	const dispatch = useDispatch();
	const { interviews, isLoading, isError, message } = useSelector(
		(state) => state.interviews
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		dispatch(thunks.getInterviews());
	}, [isError, message, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

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
									<List
										key={data.id}
										type={constants.LIST.COMPANY}
										serial={index + 1}
										interview={data}
										startsAt={data.rounds[0].start_time}
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
