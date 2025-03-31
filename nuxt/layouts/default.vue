<template>
	<div>
		<AccountHeader :key="$route.fullPath" class="account-header" />
		<slot />
		<Menu class="menu" />
	</div>
</template>

<style lang="scss">
	body,
	html {
		overflow: visible;
	}
	.menu {
		transition: all 0.5s ease-in-out;
		opacity: 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		animation: slide-fade 0.6s 1.2s ease-in-out forwards;
	}
	@keyframes slide-fade {
		0% {
			transform: translateX(24px);
			opacity: 0;
			filter: blur(8px);
		}
		100% {
			transform: translateX(0px);
			opacity: 1;
			filter: blur(0px);
		}
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
