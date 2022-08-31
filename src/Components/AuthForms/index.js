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
	const { token, user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		cPassword: "",
	});
	const { email, password, cPassword } = formState;

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email.trim().length) return toast.error("Email is required.");
		if (!password.trim().length) return toast.error("Password is required.");
		const userData = { email, password };
		if (type === constants.AUTH_TYPES.SIGNUP) {
			if (password.length < constants.PWD_LENGTH)
				return toast.error(
					`Password should be at least ${constants.PWD_LENGTH} characters long.`
				);
			if (!cPassword.trim().length)
				return toast.error("Confirm password is required.");
			if (password !== cPassword) return toast.error(constants.PWD_MIS_MATCH);
			userData[cPassword] = cPassword;
			dispatch(thunks.signup(userData));
		} else {
			dispatch(thunks.signin(userData));
		}
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
		if (isSuccess && token) {
			dispatch(thunks.account(token));
		}
		if (isSuccess && user) {
			navigate("/interviews");
		}
		dispatch(actions.auth.reset());
	}, [token, user, isError, isSuccess, message, navigate, dispatch]);

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
						value={email}
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
						value={password}
						onChange={changeHandler}
						className="form-control"
						type="password"
					/>
				</div>
				{type === constants.AUTH_TYPES.SIGNUP && (
					<div>
						<label htmlFor="cPassword">Confirm Password</label>
						<input
							id="cPassword"
							name="cPassword"
							value={cPassword}
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
