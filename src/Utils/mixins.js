import constants from "./constants";

export const formatDateTime = (dateTime = Date.now()) =>
	new Date(dateTime).toLocaleString("en-US", {
		dateStyle: "full",
		timeStyle: "medium",
		hour12: true,
		timeZone: "America/New_York",
	});

export const formatDuration = (duration = 0.5) =>
	`${duration} ${parseFloat(duration) > 1 ? "hrs" : "hr"}`;

export const copyrightYear = () => new Date().getFullYear();

export const dynamicBgColor = (startTime = Date.now()) => {
	startTime = new Date(startTime).getTime();
	const dateTime = new Date();
	const today = new Date(dateTime.toDateString()).getTime();
	const tomorrow = new Date(
		new Date(dateTime.setDate(dateTime.getDate() + 1)).toDateString()
	).getTime();

	if (startTime >= today && startTime <= tomorrow) {
		return constants.PRIORITY.THREE; // present
	}
	if (startTime < today) {
		return constants.PRIORITY.ONE; // past
	}
	return constants.PRIORITY.TWO; // future
};

export const sortDesc = (arr = []) => {
	if (!arr.length) return;

	// arrange by start date-time desc
	const sorted = arr.sort((companyA, companyB) => {
		const lastestRoundOfA = companyA.rounds[companyA.rounds.length - 1];
		const lastestRoundOfB = companyB.rounds[companyB.rounds.length - 1];
		return new Date(lastestRoundOfA.startTime) <
			new Date(lastestRoundOfB.startTime)
			? 1
			: -1;
	});
	return sorted;
};
