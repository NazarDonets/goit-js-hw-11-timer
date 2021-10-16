const refs = {
	launchBtn: document.querySelector('.btn-launch'),
	stopBtn: document.querySelector('.btn-stop'),
	targetDateContent: document.querySelector('.targetdate-date'),
};

const { launchBtn, stopBtn, targetDateContent } = refs;

class CountdownTimer {
	constructor({ selector, targetDate }) {
		this.selector = document.getElementById(selector);
		this.targetDate = Date.parse(targetDate);
		this.timerInterval = null;
	}

	start() {
		if (this.timerInterval) {
			return;
		}

		function pad(value) {
			return String(value).padStart(2, '0');
		}

		function getTimeComponents(time) {
			const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
			const hours = pad(
				Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			);
			const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
			const secs = pad(Math.floor((time % (1000 * 60)) / 1000));
			return { days, hours, mins, secs };
		}

		this.timerInterval = setInterval(() => {
			const currentTime = Date.now();
			const deltaTime = this.targetDate - currentTime;
			const { days, hours, mins, secs } = getTimeComponents(deltaTime);

			document.querySelector("[data-value='days']").textContent = days;
			document.querySelector("[data-value='hours']").textContent = hours;
			document.querySelector("[data-value='mins']").textContent = mins;
			document.querySelector("[data-value='secs']").textContent = secs;

			if (days === '00' && hours === '00' && mins === '00' && secs === '00') {
				clearInterval(this.timerInterval);
				this.timerInterval = null;
			}
		}, 1000);
	}

	stop() {
		clearInterval(this.timerInterval);
		this.timerInterval = null;
		document.querySelector("[data-value='days']").textContent = '00';
		document.querySelector("[data-value='hours']").textContent = '00';
		document.querySelector("[data-value='mins']").textContent = '00';
		document.querySelector("[data-value='secs']").textContent = '00';
	}
}

const timer = new CountdownTimer({
	selector: '#timer-1',
	targetDate: new Date('Oct 20, 2021'),
});

const dateFormatter = new Date(timer.targetDate);

targetDateContent.insertAdjacentHTML(
	'afterbegin',
	dateFormatter.getDate() +
		' ' +
		dateFormatter.toLocaleString('default', { month: 'short' }) +
		' ' +
		dateFormatter.getFullYear()
);

launchBtn.addEventListener('click', () => {
	timer.start();
	launchBtn.classList.add('btn--inactive');
	stopBtn.classList.remove('btn--inactive');
});

stopBtn.addEventListener('click', () => {
	timer.stop();
	launchBtn.classList.remove('btn--inactive');
	stopBtn.classList.add('btn--inactive');
});
