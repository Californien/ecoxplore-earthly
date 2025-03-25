<template>
	<div class="card-div flex items-center justify-center">
		<UiCard
			:class="[
				'card',
				'w-[380px]',
				'max-w-sm',
				satisfied ? 'border-green-400/40' : ''
			]"
			:title="name"
			:description="challenge">
			<template #content>
				<UiCardContent>
					<div class="mx-auto flex w-full max-w-sm flex-col gap-2">
						<div class="flex justify-between text-sm">
							<span>Fortschritt</span>
							<span class="text-muted-foreground">
								{{ progress }} / {{ progressMax }}
							</span>
						</div>
						<UiProgress
							v-model="value"
							:class="satisfied ? '[&>div]:bg-green-400' : ''" />
					</div>
				</UiCardContent>
			</template>
		</UiCard>
	</div>
</template>

<script lang="ts" setup>
	const props = defineProps({
		// eslint-disable-next-line vue/require-default-prop
		name: String,
		// eslint-disable-next-line vue/require-default-prop
		challenge: String,
		progress: {
			type: Number,
			default: 0
		},
		progressMax: {
			type: Number,
			default: 1
		}
	});

	const value = (props.progress / props.progressMax) * 100;
	const satisfied = value === 100;
</script>

<style lang="scss">
	.card-div {
		margin-top: 8px;
	}
</style>
