import { setTMPLOG, updateTMPLOG, clearTMPLOG } from './log/TMPLOG.js';
import { exit } from './log/exit.js';
import { showResults } from './log/results.js';
import {
	mainTitle,
	stepTitle,
	stepSubtitle,
	finishedTitle
} from './log/styles.js';
import crossSpawn from 'cross-spawn';

const log = console.log;

function delay(ms) {
	const prm = new Promise((resolve) => setTimeout(resolve, ms));
	return prm;
}

export async function exec({
	title: title,
	describtion: describtion,
	stepTitles: stepTitles,
	finishedTitles: finishedTitles,
	steps: steps,
	commands: commands
}) {
	const cmdFunctions = [];
	log(mainTitle(title));
	await clearTMPLOG();
	await setTMPLOG(describtion, steps);

	for (const step of steps) {
		const id = step.id;
		const func = async () => {
			const isSubStep = step.subStep;
			if (isSubStep === true) {
				log(stepSubtitle(stepTitles[id - 1]));
			}
			if (isSubStep === false) {
				log(stepTitle(stepTitles[id - 1]));
			}
			if (isSubStep === 'ALL') {
				log(stepTitle(stepTitles[id - 1][0]));
				log(stepSubtitle(stepTitles[id - 1][1]));
			}
			const command = commands[id - 1].split(' ');
			const cmd = command[0];
			const args = command.slice(1);
			const out = crossSpawn.sync(cmd, args, {
				stdio: 'inherit',
				shell: true
			});
			exit({
				code: out.status,
				error: out.error ? out.error : null,
				processFunc: step.process.function
			});
			await updateTMPLOG(id, { type: 'pending' });
			if (out.status === 0) {
				await updateTMPLOG(id, { type: 'completed' });
				return true;
			} else {
				return false;
			}
		};
		cmdFunctions.push(func);
	}

	await delay(2000);

	for (let i = 0; i < cmdFunctions.length; i++) {
		const response = await cmdFunctions[i]();
		if (!response) break;
		await delay(1000);
	}

	const res = showResults();
	await delay(1000);
	res.then((res) => {
		res &&
			log(
				finishedTitle(finishedTitles[0], {
					success: true
				})
			);
		!res &&
			log(
				finishedTitle(finishedTitles[1], {
					success: false
				})
			);
	});

	await clearTMPLOG();
}
