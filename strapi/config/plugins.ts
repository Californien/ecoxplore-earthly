module.exports = ({ env }) => ({
	email: {
		config: {
			provider: 'strapi-provider-email-postmark',
			providerOptions: {
				apiKey: env('POSTMARK_API_KEY')
			},
			settings: {
				defaultFrom: 'support@earthlyapp.de',
				defaultReplyTo: 'support@earthlyapp.de'
			}
		}
	}
});
