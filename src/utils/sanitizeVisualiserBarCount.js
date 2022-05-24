const sanitizeVisualiserBarCount = (barCount) => {
	let next = Math.pow(2, Math.ceil(Math.log(barCount) / Math.log(2)))

	return next
}

export default sanitizeVisualiserBarCount
