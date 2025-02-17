module.exports = ({ env }) => ({
	email: {
		config: {
			provider: 'strapi-provider-email-postmark',
			providerOptions: {
				apiKey: env('POSTMARK_API_KEY')
			},
			settings: {
				defaultFrom: env('EMAIL_ADDRESS_FROM'),
				defaultReplyTo: env('EMAIL_ADDRESS_REPLY')
			}
		}
	},
	'users-permissions': {
		config: {
			register: {
				allowedFields: ['lastLoggedIn']
			}
		}
	}
});
