import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store";
import "./model.css";

const Modal = () => {
	const dispatch = useDispatch();
	const options = useSelector((state) => state.modal.options);
	const closeModal = () => {
		dispatch(actions.modal.setShowModal(false));
	};
	const runProceedFxn = () => {
		// TODO: modelFunctionsMap[options.proceedAtion]()
		console.log(JSON.stringify(options, null, 3));
	};

	return (
		<Fragment>
			{options && Object.entries(options).length && (
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
