<template>
	<div>
		<div class="center">
			<h1>Forgot password page</h1>
			<UiButton @click="useRouter().push('/auth/login')">
				Go back
			</UiButton>
		</div>
		<WarnSiteIncomplete />
	</div>
</template>

<style lang="scss">
	.center {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
