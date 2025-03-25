<template>
	<div
		class="flex items-center justify-center account relative h-[100px] w-full">
		<UiBreadcrumbs class="breadcrumbs justify-left" :items="crumbs" />
		<UiDropdownMenu>
			<UiDropdownMenuTrigger as-child>
				<UiAvatar class="avatar">
					<UiAvatarFallback>
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
						v-else-if="item.title && !item.items"
						:title="item.title"
						:icon="item.icon"
						:shortcut="item.shortcut"
						:disabled="item.disabled"
						@click="item.action" />
					<UiDropdownMenuSub v-else-if="item.title && item.items">
						<UiDropdownMenuSubTrigger
							:title="item.title"
							:icon="item.icon"
							:text-value="item.title" />
						<UiDropdownMenuSubContent>
							<template
								v-for="(child, k) in item.items"
								:key="`child-${k}`">
								<UiDropdownMenuSeparator v-if="child.divider" />
								<UiDropdownMenuItem
									v-else
									:title="child.title"
									:icon="child.icon"
									:shortcut="child.shortcut" />
							</template>
						</UiDropdownMenuSubContent>
					</UiDropdownMenuSub>
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

	const menuitems = [
		{ label: 'My Account' },
		{ divider: true },
		{ title: 'Profile', icon: 'ph:user', shortcut: '⇧⌘P' },
		{ title: 'Billing', icon: 'ph:credit-card', shortcut: '⌘B' },
		{ title: 'Settings', icon: 'ph:gear', shortcut: '⌘S' },
		{ title: 'Keyboard shortcuts', icon: 'ph:keyboard', shortcut: '⌘K' },
		{ divider: true },
		{ title: 'Team', icon: 'ph:users', shortcut: '⇧⌘T' },
		{
			title: 'Invite Users',
			icon: 'ph:user-plus',
			items: [
				{ title: 'Email', icon: 'ph:envelope', shortcut: '⇧⌘E' },
				{ title: 'Facebook', icon: 'logos:facebook', shortcut: '⇧⌘F' },
				{ title: 'Twitter', icon: 'logos:twitter', shortcut: '⇧⌘T' },
				{ divider: true },
				{ title: 'More', icon: 'ph:plus-circle' }
			]
		},
		{ title: 'Settings', icon: 'ph:gear', shortcut: '⌘S' },
		{ title: 'Keyboard shortcuts', icon: 'ph:keyboard', shortcut: '⌘K' },
		{ divider: true },
		{ title: 'Github', icon: 'ph:github-logo' },
		{ title: 'Support', icon: 'ph:lifebuoy' },
		{ title: 'API', icon: 'ph:cloud', disabled: true },
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
</script>

<style lang="scss">
	.menu-content {
		margin-right: 24px;
	}
	.breadcrumbs {
		margin-left: 24px;
	}
</style>
