import { mountSuspended } from '@nuxt/test-utils/runtime';
import { it, expect, describe } from 'vitest';
import ExampleComp from '../vue/components/ExampleComp.vue';

describe('Example', () => {
	it('can mount the component', async () => {
		const cmp = await mountSuspended(ExampleComp);
		expect(cmp.html()).toContain('<p>Example component</p>');
	});
});
