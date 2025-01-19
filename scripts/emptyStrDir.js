import fs from 'fs/promises';
import path from 'path';
import { create } from './log/logControls.js';

const dir = './strapi/';

const deletingDir_ = create('Clearing `strapi` directory...');
deletingDir_.startLoading();

async function deletingDir() {
	const files = await fs.readdir(dir);
	await Promise.all(
		files.map((file) =>
			fs.rm(path.join(dir, file), { recursive: true, force: true })
		)
	);
}

setTimeout(async () => {
	try {
		await deletingDir();
		deletingDir_.exit(0);
	} catch (error) {
		error.code && deletingDir_.exit(error.code);
		!error.code && deletingDir_.exit(null);
	}
}, 1000);
