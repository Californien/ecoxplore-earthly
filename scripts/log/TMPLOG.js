import { promises as fs } from 'fs';

const filePath = './scripts/log/tmp/log.json';
const defaultContent = {
	currentProcess: {
		describtion: '',
		steps: [],
		pending: [],
		completed: []
	}
};
export async function clearTMPLOG() {
	await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 4));
}

export async function setTMPLOG(describtion, steps) {
	const fileContent = await fs.readFile(filePath, 'utf-8');
	const jsonData = JSON.parse(fileContent);
	jsonData.currentProcess.describtion = describtion;
	jsonData.currentProcess.steps = steps;
	for (let i = 1; i <= steps.length; i++) {
		jsonData.currentProcess.pending.push(i);
	}
	await fs.writeFile(filePath, JSON.stringify(jsonData, null, 4));
}

export async function updateTMPLOG(stepID, { type: type }) {
	const fileContent = await fs.readFile(filePath, 'utf-8');
	const jsonData = JSON.parse(fileContent);
	const toAdd = type === 'completed' ? true : false;
	let jsonDataNewArray;
	let jsonDataNew;

	if (!toAdd) {
		jsonDataNewArray = jsonData.currentProcess[type].filter(
			(item) => item !== stepID
		);
		jsonDataNew = jsonData;
		jsonDataNew.currentProcess[type] = jsonDataNewArray;
	}
	toAdd && jsonData.currentProcess[type].push(stepID);
	await fs.writeFile(
		filePath,
		JSON.stringify(toAdd ? jsonData : jsonDataNew, null, 4)
	);
}
