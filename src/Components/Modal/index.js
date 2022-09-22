import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, thunks } from "../../Store";
import constants from "../../Utils/constants";
import "./model.css";

const Modal = () => {
	const dispatch = useDispatch();
	const { options } = useSelector((state) => state.modal);
	const closeModal = () => {
		dispatch(actions.modal.setShowModal(false));
	};

	// Possible functions to be invoked by model
	const modelFunctionsMap = {
		[constants.MODAL_ACTIONS.END_INTERVIEW]: ({ interviewId } = "") => {
			const interviewData = { id: interviewId };
			dispatch(thunks.endInterview(interviewData));
			dispatch(actions.modal.setShowModal(false));
		},
		[constants.MODAL_ACTIONS.DELETE_INTERVIEW]: ({ interviewId } = "") => {
			// const interviewData = { id: interviewId };
		},
	};

	const runProceedFxn = () => {
		modelFunctionsMap[options.proceedAction](options.proceedData);
		console.log(JSON.stringify(options, null, 3));
	};

	return (
		<Fragment>
			{options && Object.entries(options).length > 0 && (
				<section className="modal-wrapper" onClick={closeModal}>
					<div className="modal-body" onClick={(e) => e.stopPropagation()}>
						<div className="modal-content">
							<p>{options.description}</p>
						</div>
						<div className="modal-buttons">
							<button onClick={closeModal}>Cancel</button>
							<button onClick={runProceedFxn}>Proceed</button>
						</div>
					</div>
				</section>
			)}
		</Fragment>
	);
};

export default Modal;
