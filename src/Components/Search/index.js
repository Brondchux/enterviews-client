import "./search.css";
import { Fragment, useState } from "react";

const Search = () => {
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [formState, setFormState] = useState({
		search: "",
		calendar: "",
	});
	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};
	const searchHandler = (e) => {
		e.preventDefault();
		setShowSuggestions(true);
	};
	const closeSuggestions = () => {
		setShowSuggestions(false);
		setFormState({
			search: "",
			calendar: "",
		});
	};

	return (
		<Fragment>
			<form className="search-box" onSubmit={searchHandler}>
				<fieldset className="search-fieldset">
					<input
						id="search"
						name="search"
						value={formState.search}
						onChange={changeHandler}
						className="form-control"
						placeholder="search company or date"
						type="text"
						autoComplete="off"
					/>
					<input
						id="calendar"
						name="calendar"
						value={formState.calendar}
						onChange={changeHandler}
						className="form-control"
						type="date"
					/>
					<button onClick={searchHandler}>
						<span>GO</span>
					</button>
				</fieldset>
			</form>
			{showSuggestions && (
				<section className="search-suggestions" onClick={closeSuggestions}>
					<p
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						Looking for {formState.search}
					</p>
				</section>
			)}
		</Fragment>
	);
};

export default Search;
