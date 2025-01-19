import { exec } from './EXEC.js';

exec({
	title: 'npm run build  --->  Building the application',
	describtion: 'Building the application, both nuxt and strapi',
	stepTitles: ['Building nuxt', 'Building strapi'],
	finishedTitles: [
		'🔧 Built the application successfully!',
		'🔧 Built the application incompletely or faulty.'
	],
	steps: [
		{
			id: 1,
			subStep: false,
			process: {
				function: 'buildNuxt()',
				file: 'build.js',
				command: 'npm run build'
			}
		},
		{
			id: 2,
			subStep: false,
			process: {
				function: 'buildStrapi()',
				file: 'build.js',
				command: 'npm run build'
			}
		}
	],
	commands: ['npm run build:nuxt', 'npm run build:strapi']
});
