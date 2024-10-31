export function formatCurrency(amount = 0, currency = "VND") {
	const amountString = amount.toString();
	const amountArray = amountString.split("");
	const reversedArray = amountArray.reverse();
	let resultArray = [];
	for (let i = 0; i < reversedArray.length; i++) {
		if (i > 0 && i % 3 === 0) {
			resultArray.push(".");
		}
		resultArray.push(reversedArray[i]);
	}

	const formattedAmount = resultArray.reverse().join("");
	return formattedAmount + ` ${currency}`;
}
