<template>
	<div>
		<Header class="header" />
		<slot />
	</div>
</template>

<style lang="scss">
	.header {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
	}
</style>
