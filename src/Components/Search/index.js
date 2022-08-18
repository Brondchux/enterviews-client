import "./search.css";
import { Fragment, useState } from "react";

const Search = () => {
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [formState, setFormState] = useState({
		search: "",
	});
	const changeHandler = (e) => {
		const { name, value } = e.target;
		setFormState({
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
		});
	};

	return (
		<Fragment>
			<form className="search-box" onSubmit={searchHandler}>
				<div>
					<input
						id="search"
						name="search"
						value={formState.search}
						onChange={changeHandler}
						className="form-control"
						placeholder="search by date or company"
						type="text"
						onBlur={closeSuggestions}
					/>
				</div>
				<div onClick={searchHandler}>
					<span>GO</span>
				</div>
			</form>
			{showSuggestions && (
				<section className="search-suggestions">
					<p>Looking for {formState.search}</p>
				</section>
			)}
		</Fragment>
	);
};

export default Search;
