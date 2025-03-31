<template>
	<div class="content flex items-left justify-center flex-col">
		<UiScrollArea>
			<h2>Weekly Challenges</h2>
			<UiGradientDivider class="divider" />
			<div class="weekly-cards cards">
				<ChallengeCard
					name="Zwei gesunde Beine"
					challenge="Beschreite 4 Strecken zu Fuß, anstatt mit dem Auto zu fahren."
					:progress="1"
					:progress-max="4" />
				<ChallengeCard
					name="Bio Einkauf"
					challenge="Suche dir 10 Bio-Produkte als Alternative zu konventionellen Produkten aus und integriere sie in deine Einkaufsliste."
					:progress="10"
					:progress-max="10" />
			</div>
			<h2 class="mt-5">Daily Challenges</h2>
			<UiGradientDivider class="divider" />
			<div class="weekly-cards cards mb-10">
				<ChallengeCard
					name="Auspuff fett scheiße"
					challenge="Beschreite 1 Strecken	 zu Fuß, anstatt mit dem Auto zu fahren."
					:progress="0"
					:progress-max="1" />
			</div>
		</UiScrollArea>
	</div>
</template>

<script lang="ts" setup>
	useHead({
		title: 'Earthly - Dashboard'
	});
</script>

<style lang="scss">
	.content {
		padding: 0.2rem 2rem;
		h2 {
			font-size: 1.2em;
			font-weight: 600;
		}
		.cards {
			margin-top: 16px;
		}
		.divider {
			margin-top: 16px;
		}
	}
</style>
