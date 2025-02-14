import type { Core } from '@strapi/strapi';

export default {
	/**
	 * An asynchronous register function that runs before
	 * your application is initialized.
	 *
	 * This gives you an opportunity to extend code.
	 */
	register({ strapi }: { strapi: Core.Strapi }) {
		const authControllers =
			strapi.plugins['users-permissions'].controllers['auth'];
		const sendMail = strapi.plugins['email'].services.email.send;
		const originalAuthRegister = authControllers.register;

		authControllers.register = async (ctx) => {
			try {
				// @ts-expect-error
				await originalAuthRegister(ctx);
				await sendMail({
					// @ts-expect-error
					to: ctx.response.body.user.email,
					from: process.env.EMAIL_ADDRESS_FROM,
					replyTo: process.env.EMAIL_ADDRESS_REPLY_TO,
					subject: 'Welcome!',
					text: `text`,
					html: `<h3>Welcome from html</h3>`
				});
			} catch (error) {
				ctx.badRequest(
					`Error while creating account: ${error.message}`
				);
			}
		};
	},

	/**
	 * An asynchronous bootstrap function that runs before
	 * your application gets started.
	 *
	 * This gives you an opportunity to set up your data model,
	 * run jobs, or perform some special logic.
	 */
	bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {}
};
