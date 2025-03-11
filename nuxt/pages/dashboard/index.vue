<template>
	<div>
		<h1>Dashboard</h1>
		<UiButton @click="logout">Logout</UiButton>
	</div>
</template>

<script lang="ts" setup>
	useHead({
		title: 'Earthly - Dashboard'
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
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			error: (d: unknown) => 'Ausloggen fehlgeschlagen!'
		});
	}
</script>
