<template>
	<div>
		<button @click="test">Test</button>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Create Account'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const { sendEmailConfirmation } = useStrapiAuth();

	async function test() {
		try {
			await sendEmailConfirmation({ email: 'marlin.lefler29@gmail.com' });
		} catch (e) {
			console.log(e);
		}
	}
</script>
