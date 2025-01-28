<template>
	<div>
		<form novalidate @submit.prevent="register_">
			<p>mail</p>
			<input
				id="email"
				v-model="email"
				type="text"
				required
				autocomplete="email" />
			<p>username</p>
			<input
				id="username"
				v-model="username"
				type="text"
				required
				autocomplete="username" />
			<p>pass</p>
			<input
				id="password1"
				v-model="pw1"
				type="password"
				required
				autocomplete="new-password" />
			<input
				id="password2"
				v-model="pw2"
				type="password"
				required
				autocomplete="new-password" />
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Create Account'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const { register } = useStrapiAuth();
	const router = useRouter();

	const email = ref<string>('');
	const username = ref<string>('');
	const pw1 = ref<string>('');
	const pw2 = ref<string>('');

	async function register_() {
		try {
			await register({
				username: username.value,
				email: email.value,
				password: pw1.value
			});
			router.go(0);
		} catch (e) {
			console.error(e);
		}
	}
</script>
