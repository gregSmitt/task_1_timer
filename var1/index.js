const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
const secondsToString = (s) => {
	const h = getNN(Math.floor(s / 3600));
	s = s % 3600;
	const m = getNN(Math.floor(s / 60));
	return `${h}:${m}:${getNN(s % 60)}`
}
const getNN = (number) => (number / 10 < 1) ? `0${number}` : number
const render = (el, seconds) => el.innerHTML = secondsToString(seconds);

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
	return (seconds) => {
		render(timerEl, seconds);
		setInterval(() => {
			if (seconds > 0) {
				seconds--
				render(timerEl, seconds);
			} else {
				clearInterval();
			}
		}, 1000);
	};
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
	e.target.value = e.target.value.replace(/[^\d]/g, '');
});

buttonEl.addEventListener('click', () => {
	const seconds = Number(inputEl.value);

	animateTimer(seconds);

	inputEl.value = '';
});
