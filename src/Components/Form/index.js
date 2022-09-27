import "./form.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { actions, thunks } from "../../Store";
import { toast } from "react-toastify";

const Form = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isError, isLoading, isSuccess, message, interviews } = useSelector(
		(state) => state.interviews
	);
	const { interview } = useSelector((state) => state.interview);
	const { rounder } = useSelector((state) => state.rounds);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [formState, setFormState] = useState({
		company: "",
		role: "",
		round: "1",
		date: "",
		time: "",
		duration: "",
	});
	const { company, role, round, date, time, duration } = formState;

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const populateFields = useCallback(() => {
		if (!id || !interview) return;
		const newRoundCount = id && interview && rounder ? rounder.length + 1 : 1;
		setIsReadOnly(true);
		setFormState({
			company: interview.company,
			role: interview.role,
			round: newRoundCount,
			date: "",
			time: "",
			duration: "",
		});
	}, [id, interview, rounder]);
	useEffect(() => populateFields(), [populateFields]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!company.trim().length) return toast.error("Company name is required.");
		if (!role.trim().length) return toast.error("Role is required.");
		if (!date.trim().length) return toast.error("Date is required.");
		if (!time.trim().length) return toast.error("Time is required.");
		if (!round || round < 1) return toast.error("Round is required.");
		if (!duration || duration <= 0) return toast.error("Duration is required.");
		const interviewData = {
			...formState,
			startTime: `${formState.date} ${formState.time}`,
		};
		dispatch(thunks.addInterview(JSON.stringify(interviewData)));
	};

	const cancelHandler = (e) => {
		if (!id) return;
		e.preventDefault();
		navigate(`/interview/${id}`);
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess && id && !interviews) {
			navigate(`/interview/${id}`);
		}
		if (isSuccess && !id && !interviews) {
			navigate("/interviews");
		}
		dispatch(actions.interviews.reset());
	}, [id, isError, isSuccess, message, interviews, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="form-box">
			<form className="interview-form" onSubmit={submitHandler}>
				<div>
					<label htmlFor="company">Company</label>
					<input
						id="company"
						name="company"
						value={company}
						onChange={changeHandler}
						className="form-control"
						type="text"
						readOnly={isReadOnly}
					/>
				</div>
				<div>
					<label htmlFor="role">Role</label>
					<input
						id="role"
						name="role"
						value={role}
						onChange={changeHandler}
						className="form-control"
						placeholder="Job title, role or position"
						type="text"
						readOnly={isReadOnly}
					/>
				</div>
				<div>
					<label htmlFor="round">Round</label>
					<input
						id="round"
						name="round"
						value={round}
						onChange={changeHandler}
						className="form-control"
						placeholder="Interview round?"
						type="text"
						readOnly={true}
					/>
				</div>
				<div className="date-time">
					<div>
						<label htmlFor="date">Date</label>
						<input
							id="date"
							name="date"
							value={date}
							onChange={changeHandler}
							className="form-control"
							type="date"
						/>
					</div>
					<div>
						<label htmlFor="time">Time</label>
						<input
							id="time"
							name="time"
							value={time}
							onChange={changeHandler}
							className="form-control"
							type="time"
						/>
					</div>
				</div>
				<div>
					<label htmlFor="duration">Duration</label>
					<input
						id="duration"
						name="duration"
						value={duration}
						onChange={changeHandler}
						className="form-control"
						placeholder="0.25 is 15m, 0.5 is 30m, 1 is 1hr"
						step="0.25"
						type="number"
					/>
				</div>
				<div>
					<button type="submit" className="form-control btn" id="save">
						Save
					</button>
					{id && interview && (
						<button
							type="button"
							className="form-control btn btn-outline"
							id="cancel"
							onClick={cancelHandler}
						>
							Cancel
						</button>
					)}
				</div>
			</form>
		</section>
	);
};

export default Form;
