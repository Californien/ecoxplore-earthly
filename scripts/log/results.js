import { Chalk } from 'chalk';
import stripAnsi from 'strip-ansi';
import terminalSize from 'terminal-size';
import path from 'path';
import { promises as fs } from 'fs';

const chalk = new Chalk({ level: 3 });
const log = console.log;

const grey = '#1B1E21';
const green = '#1FDB8B';
const lightGreen = '#7DEFC4';
const red = '#F01840';
const lightRed = '#EF7D99';
const cyan = '#27D5ED';
const darkCyan = '#24B0C3';
const lavender = '#A476F0';
const white = '#DDECEE';
const white_ = '#91ADB0';

let processJSON;

function checkIfPending(line) {
	const json = processJSON.currentProcess;

	function cleanString(str) {
		const value = str.replace(/[\s:╰╴]/g, '').toLowerCase();
		return value;
	}

	function isCompleted(json, value) {
		const searchValue = cleanString(value);
		for (let step of json.steps) {
			const process = step.process;
			if (
				cleanString(process.function) === searchValue ||
				cleanString(process.file) === searchValue ||
				cleanString(process.command) === searchValue
			) {
				if (!json.pending.includes(step.id)) {
					return false;
				}
			}
		}
		return true;
	}

	const cleanedString = cleanString(line);
	const isCompletedStatus = isCompleted(json, cleanedString);
	return isCompletedStatus;
}

function checkIfCompleted(line) {
	const json = processJSON.currentProcess;

	function cleanString(str) {
		const value = str.replace(/[\s:╰╴]/g, '').toLowerCase();
		return value;
	}

	function isCompleted(json, value) {
		const searchValue = cleanString(value);
		for (let step of json.steps) {
			const process = step.process;
			if (
				cleanString(process.function) === searchValue ||
				cleanString(process.file) === searchValue ||
				cleanString(process.command) === searchValue
			) {
				if (!json.completed.includes(step.id)) {
					return false;
				}
			}
		}
		return true;
	}

	const cleanedString = cleanString(line);
	const isCompletedStatus = isCompleted(json, cleanedString);
	return isCompletedStatus;
}

function addTicks(text, nbsp) {
	let result = '';
	let lines = text.split('\n');
	lines.pop();
	const smallerNbsp = ' '.repeat(Math.floor(nbsp.length / 3.5));
	const unicodes = [
		chalk.bold.hex(red)('✗'),
		chalk.bold.hex(green)('✓'),
		chalk.bold.hex(lavender)('?')
	];
	let unicodeI = 0;
	for (const line of lines) {
		const uncoloredLine = stripAnsi(line);
		if (checkIfCompleted(uncoloredLine)) {
			unicodeI = 1;
		}
		if (
			!checkIfCompleted(uncoloredLine) &&
			!checkIfPending(uncoloredLine)
		) {
			unicodeI = 0;
		}
		if (checkIfPending(uncoloredLine)) {
			unicodeI = 2;
		}
		result += `${nbsp}${unicodes[unicodeI]}${smallerNbsp}${line}\n`;
	}
	return result;
}

function formatJSON(obj, nbsp) {
	let result = '';
	const keys = Object.keys(obj);
	keys.forEach((key) => {
		result += `${chalk.bold.bgHex(cyan).hex(grey)(` ${key}: `)}\n`;
		const subObj = obj[key];
		const subKeys = Object.keys(subObj);
		subKeys.forEach((subKey) => {
			result +=
				chalk.hex(darkCyan)(`    ╰╴ `) +
				chalk.hex(white)(`${subKey}\n`);
			subObj[subKey].forEach((func) => {
				result +=
					chalk.hex(cyan)(`          ╰╴ `) +
					chalk.hex(white_)(`${func}\n`);
			});
		});
	});
	result = addTicks(result, nbsp);
	return result;
}

async function loadJSON() {
	const filePath = path.resolve('./scripts/log/tmp/log.json');
	const data = await fs.readFile(filePath, 'utf-8');
	processJSON = JSON.parse(data);
}

export async function showResults() {
	await loadJSON();
	const terminalWidth = terminalSize().columns;
	const nbsp = ' '.repeat(Math.floor(terminalWidth / 6));
	const stepsArray = processJSON.currentProcess.steps;
	const steps = stepsArray[stepsArray.length - 1].id;
	const stepsCompletedArray = processJSON.currentProcess.completed;
	const stepsCompleted = stepsCompletedArray[stepsCompletedArray.length - 1]
		? stepsCompletedArray[stepsCompletedArray.length - 1]
		: 0;
	const stCmpl = stepsCompleted === steps ? true : false;
	const highlight = stCmpl ? green : red;
	const cntTitleMsg = stCmpl
		? ` Steps Complete [${stepsCompleted}/${steps}] `
		: ` Steps Incomplete [${stepsCompleted}/${steps}] `;
	const cntTitleHalfLine = chalk.bold.hex(highlight)(
		'⎯'.repeat(
			Math.ceil(terminalWidth / 2) - Math.ceil(cntTitleMsg.length / 2)
		)
	);
	const cntTitleLine = chalk.bold.hex(highlight)('⎯'.repeat(terminalWidth));
	let stepTree = {};
	for (let step of stepsArray) {
		let command = step.process.command;
		let file = step.process.file;
		let func = step.process.function;
		if (!stepTree[command]) {
			stepTree[command] = {};
		}
		if (!stepTree[command][file]) {
			stepTree[command][file] = [];
		}
		stepTree[command][file].push(func);
	}
	let stepDoc = formatJSON(stepTree, nbsp);
	log(
		`${cntTitleHalfLine}${chalk.bgHex(highlight).bold.hex(grey)(cntTitleMsg)}${cntTitleHalfLine}\n\n${nbsp}${chalk
			.bgHex(stCmpl ? lightGreen : lightRed)
			.hex(grey)
			.bold(
				` ${processJSON.currentProcess.describtion} `
			)}\n\n${stepDoc}\n${cntTitleLine}`
	);
	return stCmpl;
}
