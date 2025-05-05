<template>
	<div
		class="flex items-center justify-center account relative h-[100px] w-full">
		<UiBreadcrumbs class="breadcrumbs justify-left" :items="crumbs" />
		<UiDropdownMenu>
			<UiDropdownMenuTrigger as-child>
				<UiAvatar class="avatar">
					<UiAvatarFallback v-if="fallbackInitials">
						{{ fallbackInitials }}
					</UiAvatarFallback>
					<UiAvatarFallback v-else>
						<Icon
							name="lucide:user-round"
							class="size-5 opacity-80"
							aria-hidden="true" />
					</UiAvatarFallback>
				</UiAvatar>
			</UiDropdownMenuTrigger>
			<UiDropdownMenuContent class="w-56 menu-content">
				<template v-for="(item, i) in menuitems" :key="i">
					<UiDropdownMenuLabel
						v-if="item.label"
						:label="item.label" />
					<UiDropdownMenuSeparator v-else-if="item.divider" />
					<UiDropdownMenuItem
						v-else-if="item.title"
						:title="item.title"
						:icon="item.icon"
						@click="item.action" />
				</template>
			</UiDropdownMenuContent>
		</UiDropdownMenu>
	</div>
</template>

<script lang="ts" setup>
	import type { Crumbs } from '~/components/Ui/Breadcrumbs.vue';
	const route = useRoute();

	const crumbs: Crumbs[] = [
		{
			label: '•',
			disabled: true
		},
		{
			label: 'Dashboard',
			link: '/dashboard',
			icon: 'heroicons:squares-plus',
			disabled: true
		}
	];

	if (route.path === '/dashboard/scan') {
		crumbs.push({
			label: 'Scan',
			link: '/dashboard/scan',
			icon: 'heroicons:magnifying-glass',
			disabled: true
		});
		crumbs[1].disabled = false;
	}

	const user = useStrapiUser();
	const fallbackInitials = user.value?.username
		? user.value.username
				.split(' ')
				.map((n) => n[0])
				.join('')
		: undefined;

	const menuitems = [
		{ label: 'Mein Account' },
		{ divider: true },
		{ title: 'Profil', icon: 'ph:user' },
		{ title: 'Einstellungen', icon: 'ph:gear' },
		{ divider: true },
		{
			title: 'Github',
			icon: 'ph:github-logo',
			action: () =>
				navigate('https://github.com/Californien/ecoxplore-earthly')
		},
		{ divider: true },
		{ title: 'Sign out', icon: 'ph:sign-out', action: logout }
	];

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

	async function navigate(url: string) {
		await navigateTo(url, { open: { target: '_blank' } });
	}
</script>

<style lang="scss">
	.menu-content {
		margin-right: 24px;
	}
	.breadcrumbs {
		margin-left: 24px;
	}
</style>
