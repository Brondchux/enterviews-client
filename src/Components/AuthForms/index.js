import "../Form/form.css";
import constants from "../../Utils/constants";
import { useState } from "react";

const AuthForms = ({ type }) => {
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
		const [name, value] = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
		console.table(formState);
	};

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
