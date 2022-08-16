import "./search.css";
const Search = () => {
	return (
		<div className="search-box">
			<div>
				<input
					id="search"
					className="form-control"
					placeholder="search by date or company"
					type="text"
				/>
			</div>
			<div>
				<span>GO</span>
			</div>
		</div>
	);
};

export default Search;
