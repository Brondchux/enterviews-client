import "../Form/form.css";
import constants from "../../Utils/constants";
import { useEffect, useState } from "react";
import { actions, thunks } from "../../Store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

const AuthForms = ({ type }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		cPassword: "",
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (formState.password !== formState.cPassword) {
			return toast.error(constants.PWD_MIS_MATCH);
		}
		const userData = { email: formState.email, password: formState.password };
		dispatch(thunks.signup(userData));
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess || user) {
			navigate("/interviews");
		}
		dispatch(actions.auth.reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<section className="form-box">
			<form className="interview-form" onSubmit={submitHandler}>
				<div>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						value={formState.email}
						onChange={changeHandler}
						className="form-control"
						type="email"
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						value={formState.password}
						onChange={changeHandler}
						className="form-control"
						type="password"
					/>
				</div>
				{type === constants.AUTH_FORM_TYPES.SIGN_UP && (
					<div>
						<label htmlFor="cPassword">Confirm Password</label>
						<input
							id="cPassword"
							name="cPassword"
							value={formState.cPassword}
							onChange={changeHandler}
							className="form-control"
							type="password"
						/>
					</div>
				)}
				<div>
					<button type="submit" className="form-control btn" id="submit">
						Submit
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForms;
