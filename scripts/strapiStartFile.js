import fs from 'fs/promises';
import path from 'path';
import { create } from './log/logControls.js';

const dir = './strapi/';
const fileContent = `const strapi = require('@strapi/strapi');\n// @ts-ignore\nstrapi(/* {...} */).start();`;
const filePath = path.join(dir, 'server.js');

const creatingFile = create('Creating server.js file...');
creatingFile.startLoading();

async function createFile() {
	await fs.writeFile(filePath, fileContent);
}

setTimeout(() => {
	try {
		createFile();
		creatingFile.exit(0);
	} catch (error) {
		error.code && creatingFile.exit(error.code);
		!error.code && creatingFile.exit(null);
	}
}, 1000);
