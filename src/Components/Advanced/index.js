import "./advanced.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import constants from "../../Utils/constants";

const Advanced = () => {
	const dispatch = useDispatch();
	const interview = useSelector((state) => state.interview.interview);
	const endedHandler = () => {
		dispatch(
			actions.modal.setOptions({
				description: `Are you sure you want to end your interview with ${interview.company}? This action cannot be undone!`,
				proceedAction: constants.MODAL_ACTIONS.END_INTERVIEW,
				proceedData: { interviewId: interview.id },
			})
		);
		dispatch(actions.modal.setShowModal(true));
	};
	const deleteHandler = () => {
		dispatch(
			actions.modal.setOptions({
				description: `Do you want to proceed with deleting your ${interview.company} interviews? This action cannot be undone!`,
				proceedAction: constants.MODAL_ACTIONS.DELETE_INTERVIEW,
				proceedData: { interviewId: interview.id },
			})
		);
		dispatch(actions.modal.setShowModal(true));
	};

	return (
		<section className="advanced-section">
			<h4>Advanced zone</h4>
			<p>Any action executed here is permanent and cannot be undone!</p>
			<div className="advanced-btns">
				<button className="form-control btn" onClick={endedHandler}>
					Interview ended
				</button>
				<button className="form-control btn" onClick={deleteHandler}>
					Delete interview
				</button>
			</div>
		</section>
	);
};

export default Advanced;
