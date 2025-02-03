<template>
	<div>
		<form novalidate @submit.prevent="registerUser">
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
		<input v-model="code" type="text" placeholder="Code" />
		<button @click="verifyUser">Verify code</button>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Create Account'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const router = useRouter();
	const email = ref<string>('');
	const username = ref<string>('');
	const pw1 = ref<string>('');
	const pw2 = ref<string>('');
	const code = ref<string>('');
	const { register } = useStrapiAuth();

	async function registerUser() {
		try {
			await register({
				email: email.value,
				username: username.value,
				password: pw1.value
			});
			router.go(0);
		} catch (e) {
			console.error(e);
		}
	}

	async function verifyUser() {
		// ...
	}
</script>
