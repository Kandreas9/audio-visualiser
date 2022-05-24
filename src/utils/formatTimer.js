const formatTimer = (timerSec) => {
	const pad = (n) => (n < 10 ? `0${n}` : n)

	const h = Math.floor(timerSec / 3600)
	const m = Math.floor(timerSec / 60) - h * 60
	const s = Math.floor(timerSec - h * 3600 - m * 60)

	return `${pad(m)}:${pad(s)}`
}

export default formatTimer
