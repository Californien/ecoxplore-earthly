import { exec } from './EXEC.js';

exec({
	title: 'npm run ci  --->  Clean-installing all app-dependencies',
	describtion: 'Clean-installing the app-dependencies, both nuxt and strapi',
	stepTitles: [
		'Clean-installing root dependencies',
		'Clean-installing nuxt dependencies',
		'Clean-installing strapi dependencies'
	],
	finishedTitles: [
		'🔒 Clean-installed the app-dependencies successfully!',
		'🔒 Clean-installed the app-dependencies incompletely or faulty.'
	],
	steps: [
		{
			id: 1,
			subStep: false,
			process: {
				function: 'ciMain()',
				file: 'ci.js',
				command: 'npm run ci'
			}
		},
		{
			id: 2,
			subStep: false,
			process: {
				function: 'ciNuxt()',
				file: 'ci.js',
				command: 'npm run ci'
			}
		},
		{
			id: 3,
			subStep: false,
			process: {
				function: 'ciStrapi()',
				file: 'ci.js',
				command: 'npm run ci'
			}
		}
	],
	commands: ['npm ci', 'npm run ci:nuxt', 'npm run ci:strapi']
});
