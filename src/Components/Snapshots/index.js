import "./snapshots.css";
import companies from "../../assets/img/companies.png";
import rounds from "../../assets/img/rounds.png";
import addition from "../../assets/img/addition.png";

const Snapshots = () => {
	return (
		<section className="frames">
			<figure className="img-frame">
				<img src={companies} alt="companies interviewing you" />
				<div className="overlay overlay-fade">
					<figcaption className="img-caption">Active companies</figcaption>
				</div>
			</figure>
			<figure className="img-frame">
				<img src={addition} alt="add new round" />
				<div className="overlay overlay-fade">
					<figcaption className="img-caption">Add round</figcaption>
				</div>
			</figure>
			<figure className="img-frame">
				<img src={rounds} alt="interview rounds" />
				<div className="overlay overlay-fade">
					<figcaption className="img-caption">Interview rounds</figcaption>
				</div>
			</figure>
		</section>
	);
};

export default Snapshots;
