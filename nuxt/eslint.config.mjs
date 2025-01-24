// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import globals from 'globals';

export default withNuxt({
	languageOptions: { globals: { ...globals.browser, ...globals.node } },
	rules: {
		'vue/html-self-closing': 'off'
	}
});
