document.addEventListener('DOMContentLoaded', function () {
	const input = document.getElementById("input");
	const start = document.getElementById("start");
	const timerEl = document.getElementById("timer");
	const regHHMMSS = /[0-9]{2}:[0-9]{2}:[0-9]{2}/;
	// let refreshValue;

	class jsTimer {
		constructor(displayEl) {
			this.displayEl = displayEl;
			this._time;
		}
		#setTime(newTime) {
			this._time = newTime;
		}
		#changeTime() {
			this._time--;
		}
		#render() {
			this.displayEl.innerHTML = secondsToString(this._time);
		}
		#tick() {
			if (this._time > 0) {
				this.#changeTime();
				this.#render();
			} else {
				this.stop();
			}
		}
		start(newTime) {
			this.stop();
			this.#setTime(newTime);
			this.#render();
			this.timer = setInterval(() => this.#tick(), 1000);
		}
		stop() {
			clearInterval(this.timer);
		}
	}

	let newTimer = new jsTimer(timerEl);
	start.addEventListener('click', {
		handleEvent() {
			if (regHHMMSS.test(input.value)) {
				newTimer.start(stringToSeconds(input.value));
			} else alert('Введите значение в формате hh:mm:ss');
		}
	});

	start.addEventListener('click', {
		handleEvent() {
			if (regHHMMSS.test(input.value)) {
				clearInterval(refreshValue);
				refreshValue = timerFunc(stringToSeconds(input.value), timerEl);
			} else alert('Введите значение в формате hh:mm:ss');
		}
	});

	const timerFunc = (time, htmlEl) => setInterval(() => {
		if (time >= 0) {
			htmlEl.innerHTML = secondsToString(time);
			time--
		} else {
			clearInterval();
		}
	}, 1000);

	const stringToSeconds = (string) => {
		const arr = string.split(':').map(Number);
		return arr[0] * 60 * 60 + arr[1] * 60 + arr[2]
	}

	const secondsToString = (s) => {
		const h = getNN(Math.floor(s / 3600));
		s = s % 3600;
		const m = getNN(Math.floor(s / 60));
		return `${h}:${m}:${getNN(s % 60)}`
	}

	const getNN = (number) => (number / 10 < 1) ? `0${number}` : number

}, false);