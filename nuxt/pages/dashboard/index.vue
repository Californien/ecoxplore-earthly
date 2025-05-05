<template>
	<div class="content flex items-left justify-center flex-col">
		<UiScrollArea>
			<h2>Weekly Challenges</h2>
			<UiGradientDivider class="divider" />
			<div class="weekly-cards cards">
				<ChallengeCard
					name="Mobil ohne Motor"
					challenge="Fahre eine Woche lang kein Auto und nutze stattdessen öffentliche Verkehrsmittel, Fahrrad oder gehe zu Fuß."
					:progress="1"
					:progress-max="1" />
				<ChallengeCard
					name="Bio Einkauf"
					challenge="Suche nach 10 umweltfreundlichen Produkten (EcoScore A oder B) als Alternative zu konventionellen Produkten und integriere sie in deinen Wocheneinkauf."
					:progress="4"
					:progress-max="10" />
			</div>
			<h2 class="mt-5">Daily Challenges</h2>
			<UiGradientDivider class="divider" />
			<div class="daily-cards cards mb-10">
				<ChallengeCard
					name="Klimadusche"
					challenge="Dusche weniger als 5 Minuten und nutze dabei kein heißes Wasser."
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
			&.daily-cards {
				> *:last-child {
					margin-bottom: 8rem;
				}
			}
		}
		.divider {
			margin-top: 16px;
		}
	}
</style>
