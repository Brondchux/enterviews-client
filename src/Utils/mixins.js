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

export const findDataById = (arr, id) => {
	if (!arr || !id) return;
	return arr.find((data) => parseInt(data.id) === parseInt(id));
};

export const capitalize = (string) => {
	if (!string) return;
	let firstChar = string.at(0);
	if (firstChar >= "a" && firstChar <= "z") {
		firstChar = firstChar.toUpperCase();
		let otherChars = string.slice(1, string.length + 1);
		return `${firstChar}${otherChars}`;
	}
	return string;
};
