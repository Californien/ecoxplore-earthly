// @ts-check
import globals from 'globals';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
	languageOptions: { globals: { ...globals.browser, ...globals.node } },
	rules: {
		'vue/html-self-closing': 'off'
	}
});
