<template>
	<div>
		<AccountHeader :key="$route.fullPath" class="account-header" />
		<slot />
		<Menu class="menu" />
	</div>
</template>

<style lang="scss">
	.menu {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}

	.account-header {
		position: relative;
		top: 0;
		left: 0;
		z-index: 1001;
		display: flex;
		justify-content: right;
		align-items: top;
		padding-right: 1.5rem;
	}
</style>
