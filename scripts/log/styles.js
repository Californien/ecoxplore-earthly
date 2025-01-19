import { Chalk } from 'chalk';
import terminalSize from 'terminal-size';

const chalk = new Chalk({ level: 3 });
const cyan = '#27D5ED';
const lavender = '#A476F0';
const lightLavender = '#A79FF8';
const green = '#1FDB8B';
const red = '#F01840';
const grey = '#1B1E21';
const terminalWidth = terminalSize().columns;

export function mainTitle(text) {
	const padding = ' '.repeat(
		(terminalWidth - 2) / 2 - Math.ceil((text.length + 8) / 2)
	);
	const style = chalk.bold.hex(cyan);
	const line1 = style(`╭${'─'.repeat(terminalWidth - 2)}╮`);
	const line2 = `${style('│')}${padding}${chalk.bgHex(cyan).bold.hex(grey)(`    ${text}    `)}${text.length % 2 !== 0 ? padding + ' ' : padding}${style('│')}`;
	const line3 = style(`╰${'─'.repeat(terminalWidth - 2)}╯`);
	const output = `${line1}\n${line2}\n${line3}\n`;
	return output;
}

export function stepTitle(text) {
	const marginLeft1 = ' '.repeat(Math.ceil(terminalWidth / 2 - 30));
	const marginLeft2 = ' '.repeat(
		Math.ceil(terminalWidth / 2 - (text.length + 8) / 2)
	);
	let line1 = `${marginLeft1}${chalk.bold.hex(lavender)('════════════════════════════════════════════════════════════')}`;
	let line2 =
		marginLeft2 + chalk.bold.bgHex(lavender).hex(grey)(`   ❯ ${text}   `);
	let line3 = line1;
	return `\n${line1}\n${line2}\n${line3}\n`;
}

export function stepSubtitle(text) {
	const line = chalk.bold.hex(grey).bgHex(lightLavender)(`   ❯ ${text}   `);
	return `\n${line}\n`;
}

export function finishedTitle(msg, data) {
	const success = data.success;
	const highlight = success ? green : red;
	const marginLeft1 = ' '.repeat(Math.ceil(terminalWidth / 2 - 30));
	const marginLeft2 = ' '.repeat(
		Math.ceil(terminalWidth / 2 - (msg.length + 6) / 2)
	);
	let line1 = `${marginLeft1}${chalk.bold.hex(highlight)('════════════════════════════════════════════════════════════')}`;
	let line2 =
		marginLeft2 + chalk.bold.bgHex(highlight).hex(grey)(`   ${msg}   `);
	let line3 = line1;
	return `\n${line1}\n${line2}\n${line3}`;
}
