import { exec } from './EXEC.js';

const STRAPI_VERSION = '5.8.0';
const cbCMD_custom = `cd strapi && npx create-strapi@${STRAPI_VERSION} ./ --no-run`;
const cbCMD = `cd strapi && npx create-strapi@${STRAPI_VERSION} ./ --no-run --quickstart`;
let useQuickstart = true;

const lastArg = process.argv[process.argv.length - 1];
if (lastArg === '--custom') useQuickstart = false;

exec({
	title: 'npm run setup  --->  Setting up the application',
	describtion: 'Setting up the whole application, to begin coding!',
	stepTitles: [
		'Installing all root dependencies',
		['Creating strapi', 'Clearing `strapi` directory'],
		'Creating strapi',
		'Creating strapi `server.js` file',
		['Installing all dependencies', 'Installing root dependencies'],
		'Installing nuxt dependencies',
		'Installing strapi dependencies'
	],
	finishedTitles: [
		'✨ The application is ready!',
		'There was an error, while setting up the app.'
	],
	steps: [
		{
			id: 1,
			subStep: false,
			process: {
				function: 'installRoot()',
				file: 'setup.js',
				command: 'npm run setup'
			}
		},
		{
			id: 2,
			subStep: 'ALL',
			process: {
				function: 'clearingStrapiDir()',
				file: 'emptyStrDir.js',
				command: 'npm run setup'
			}
		},
		{
			id: 3,
			subStep: true,
			process: {
				function: 'creatingStrapi()',
				file: 'setup.js',
				command: 'npm run setup'
			}
		},
		{
			id: 4,
			subStep: true,
			process: {
				function: 'creatingStrapiServerFile()',
				file: 'strapiStartFile.js',
				command: 'npm run setup'
			}
		},
		{
			id: 5,
			subStep: 'ALL',
			process: {
				function: 'iMain()',
				file: 'i.js',
				command: 'npm run i'
			}
		},
		{
			id: 6,
			subStep: true,
			process: {
				function: 'iNuxt()',
				file: 'i.js',
				command: 'npm run i'
			}
		},
		{
			id: 7,
			subStep: true,
			process: {
				function: 'iStrapi()',
				file: 'i.js',
				command: 'npm run i'
			}
		}
	],
	commands: [
		'npm i',
		'node scripts/emptyStrDir.js',
		useQuickstart ? cbCMD : cbCMD_custom,
		'node scripts/strapiStartFile.js',
		'npm i',
		'npm run i:nuxt',
		'npm run i:strapi'
	]
});
