<template>
	<div class="siteIncompleteWrapper">
		<UiAlert description="Kehre bitte zurück!" class="uiAlert">
			<template #icon>
				<Icon
					name="lucide:triangle-alert"
					class="mt-0.5 size-4 text-amber-500"
					aria-hidden="true" />
			</template>
		</UiAlert>
		<UiButton class="uiBtn">
			<NuxtLink to="/dashboard">Zurück zur Startseite</NuxtLink>
		</UiButton>
	</div>
</template>

<script lang="ts" setup>
	useSonner.warning('Site incomplete', {
		description:
			'Diese Seite ist noch in Produktion und funktioniert eventuell nicht richtig! Kehre bitte zurück.'
	});
</script>

<style lang="scss">
	.siteIncompleteWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100vh;
		padding: 10rem 1rem;
		.uiAlert {
			width: 90%;
		}
		.uiBtn {
			margin-top: 1.25rem;
		}
	}
</style>
