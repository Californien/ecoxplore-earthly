<template>
	<div>
		<form novalidate @submit.prevent="login_">
			<input
				id="username"
				v-model="id"
				type="text"
				required
				autocomplete="username" />
			<input
				id="password"
				v-model="pw"
				type="password"
				required
				autocomplete="current-password" />
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Login'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const { login } = useStrapiAuth();
	const router = useRouter();
	const id = ref<string>('');
	const pw = ref<string>('');

	async function login_() {
		try {
			await login({ identifier: id.value, password: pw.value });
			router.go(0);
		} catch (e) {
			console.log(e);
		}
	}
</script>
