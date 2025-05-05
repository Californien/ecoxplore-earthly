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
								{{ currentProgress }} / {{ progressMax }}
							</span>
						</div>
						<UiProgress
							v-model="value"
							:class="satisfied ? '[&>div]:bg-green-400' : ''" />
						<UiButton
							variant="secondary"
							size="xs"
							class="bg-[#fafafa0d] rounded-[8px]"
							:disabled="satisfied"
							@click="(event) => handleClick(event)">
							<Icon name="lucide:plus" />
							Fortschritt hinzufügen
						</UiButton>
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

	const currentProgress = ref(props.progress);
	const value = computed(
		() => (currentProgress.value / props.progressMax) * 100
	);
	const satisfied = computed(() => value.value === 100);

	function handleClick(event: MouseEvent) {
		currentProgress.value++;

		if (currentProgress.value === props.progressMax) {
			const target = event.currentTarget as HTMLElement;
			if (!target) return;
			const rect = target.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const centerX_ = centerX / window.innerWidth;
			const centerY_ = centerY / window.innerHeight;
			triggerConfetti(centerX_, centerY_);
		}
	}

	function triggerConfetti(x: number, y: number) {
		useConfetti({
			particleCount: 200,
			spread: 80,
			origin: { x, y }
		});
	}
</script>

<style lang="scss">
	.card-div {
		margin-top: 8px;
	}
</style>
