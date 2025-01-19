import { Chalk } from 'chalk';
import terminalSize from 'terminal-size';
import { showResults } from './results.js';

const chalk = new Chalk({ level: 3 });
const log = console.log;
const err = console.error;

const grey = '#1B1E21';
const green = '#1FDB8B';
const red = '#F01840';

export function exit(options) {
	const terminalWidth = terminalSize().columns;
	const line = chalk.hex(red)('━'.repeat(terminalWidth));
	if (options.code === 0) {
		log(
			`✅   ${chalk.bold.italic.bgHex(green).hex(grey)(` ${options.processFunc} `)} ${chalk.bold.hex(green)('exited with code 0.')}`
		);
	} else {
		err(
			`❌   ${chalk.bold.italic.bgHex(red).hex(grey)(` ${options.processFunc} `)} ${chalk.bold.hex(red)('exited with code ' + options.code + '.')}\n${chalk.bold.hex(red)(' ╰─❯ Error:')}\n${line}\n${options.error}\n${line}`
		);
	}
}

/*

### EXAMPLE:

exit({
	code: 1,
	error: 'Here is the error that occurs',
	process: [ 'fileName.js', 'npm run <command>', 'someRandomFunction()' ]
});

### EXAMPLE (end of code):

exit({
	code: 0,
	error: null,
	process: [ 'fileName.js', 'npm run <command>', 'someRandomFunction()' ]
});

*/
