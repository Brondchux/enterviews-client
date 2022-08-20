import "./form.css";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Form = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const interview = useSelector((state) => state.interview.interview);
	const [rounds, setRounds] = useState(null);
	const [isReadOnly, setIsReadOnly] = useState(false);
	const [formState, setFormState] = useState({
		company: "",
		role: "Software engineer",
		round: "1",
		date: "",
		time: "",
		duration: "",
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const roundOptions = (begin = 1, end = 10) => {
		const options = [];
		let i = begin;
		while (i <= end) {
			options[i] = <option key={i}>{i}</option>;
			i++;
		}
		setRounds(options);
	};
	useEffect(() => roundOptions(), []);

	const populateFields = useCallback(() => {
		if (!id || !interview) return;
		const newRoundCount = interview.rounds.length + 1;
		roundOptions(newRoundCount, newRoundCount);
		setIsReadOnly(true);
		setFormState({
			company: interview.company,
			role: interview.role,
			round: newRoundCount,
			date: "",
			time: "",
			duration: "",
		});
	}, [id, interview]);
	useEffect(() => populateFields(), [populateFields]);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(formState);
	};

	const cancelHandler = (e) => {
		if (!id) return;
		e.preventDefault();
		navigate(`/interview/${id}`);
	};

	return (
		<section className="form-box">
			<div className="alert" hidden></div>
			<form className="interview-form" onSubmit={submitHandler}>
				<div>
					<label htmlFor="company">Company</label>
					<input
						id="company"
						name="company"
						value={formState.company}
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
						value={formState.role}
						onChange={changeHandler}
						className="form-control"
						type="text"
						readOnly={isReadOnly}
					/>
				</div>
				<div>
					<label htmlFor="round">Round</label>
					<select
						id="round"
						name="round"
						value={formState.round}
						onChange={changeHandler}
						className="form-control"
					>
						{rounds && rounds}
					</select>
				</div>
				<div className="date-time">
					<div>
						<label htmlFor="date">Date</label>
						<input
							id="date"
							name="date"
							value={formState.date}
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
							value={formState.time}
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
						value={formState.duration}
						onChange={changeHandler}
						className="form-control"
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
