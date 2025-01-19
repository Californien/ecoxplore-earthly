import { Chalk } from 'chalk';
const chalk = new Chalk({ level: 3 });

const cyan = '#27D5ED';
const green = '#1FDB8B';
const red = '#F01840';

const characters = ['⠇', '⠋', '⠙', '⠸', '⠴', '⠦'];

class LoadingIndicator {
	constructor(message) {
		this.message = message;
		this.index = 0;
		this.intervalId = null;
	}
	startLoading() {
		this.intervalId = setInterval(() => {
			const styledChar = chalk.hex(cyan)(characters[this.index]);
			process.stdout.write('\r' + styledChar + '  ' + this.message);
			this.index = (this.index + 1) % characters.length;
		}, 80);
	}
	exit(code) {
		clearInterval(this.intervalId);
		process.stdout.write('\r');
		if (code === 0) {
			console.log(chalk.hex(green)('✔'));
		} else {
			console.log(chalk.hex(red)('✗'));
		}
	}
}

export function create(message) {
	return new LoadingIndicator(message);
}
