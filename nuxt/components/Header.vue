<template>
	<header>
		<nav>
			<NuxtLink to="/dashboard/scan">
				<UiFancyIcon
					type="light"
					size="lg"
					icon="lucide:scan-barcode"
					circle />
			</NuxtLink>
			<NuxtLink to="/dashboard">
				<UiFancyIcon
					type="light"
					size="lg"
					icon="lucide:layout-dashboard"
					circle />
			</NuxtLink>
			<NuxtLink to="/settings">
				<UiFancyIcon
					type="light"
					size="lg"
					icon="lucide:settings"
					circle />
			</NuxtLink>
		</nav>
	</header>
</template>

<style lang="scss">
	header {
		width: 100%;
		height: 8vh;
		background-color: #09090b;
		border-top: 1px solid rgba(255, 255, 255, 0.212);
		position: absolute;
		bottom: 0;
		display: grid;
		nav {
			margin: auto;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 3rem;
		}
	}
</style>
