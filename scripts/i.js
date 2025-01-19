import { exec } from './EXEC.js';

exec({
	title: 'npm run i  --->  Installing all app-dependencies',
	describtion: 'Installing the app-dependencies, both nuxt and strapi',
	stepTitles: [
		'Installing root dependencies',
		'Installing nuxt dependencies',
		'Installing strapi dependencies'
	],
	finishedTitles: [
		'📥 Installed the app-dependencies successfully!',
		'📥 Installed the app-dependencies incompletely or faulty.'
	],
	steps: [
		{
			id: 1,
			subStep: false,
			process: {
				function: 'iMain()',
				file: 'i.js',
				command: 'npm run i'
			}
		},
		{
			id: 2,
			subStep: false,
			process: {
				function: 'iNuxt()',
				file: 'i.js',
				command: 'npm run i'
			}
		},
		{
			id: 3,
			subStep: false,
			process: {
				function: 'iStrapi()',
				file: 'i.js',
				command: 'npm run i'
			}
		}
	],
	commands: ['npm i', 'npm run i:nuxt', 'npm run i:strapi']
});
