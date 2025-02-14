<template>
	<div>
		<h3>Dashboard</h3>
		<UiButton @click="logout">Logout</UiButton>
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Dashboard'
	});
	definePageMeta({
		middleware: ['auth']
	});

	function logout() {
		const { logout } = useStrapiAuth();
		const router = useRouter();
		const logoutPromise = () =>
			new Promise<string>((resolve) => {
				logout();
				resolve('Du wurdest erfolgreich ausgeloggt!');
				router.push('/auth/login');
			});
		useSonner.promise(logoutPromise, {
			loading: 'Ausloggen...',
			success: (d: string) => d,
			error: () => 'Ausloggen fehlgeschlagen!'
		});
	}
</script>
