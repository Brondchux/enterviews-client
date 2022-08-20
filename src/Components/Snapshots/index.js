import "./snapshots.css";
import companies from "../../assets/img/companies.png";
import rounds from "../../assets/img/rounds.png";
import addition from "../../assets/img/addition.png";

const Snapshots = () => {
	return (
		<section className="frames">
			<figure className="img-frame" style={{ background: `url(${companies})` }}>
				<figcaption className="img-caption">
					<p>Your Interviews</p>
				</figcaption>
			</figure>
			<figure className="img-frame" style={{ background: `url(${rounds})` }}>
				<figcaption className="img-caption">
					<p>Interview Rounds</p>
				</figcaption>
			</figure>
			<figure className="img-frame" style={{ background: `url(${addition})` }}>
				<figcaption className="img-caption">
					<p>New Interview</p>
				</figcaption>
			</figure>
		</section>
	);
};

export default Snapshots;
