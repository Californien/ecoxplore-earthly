<template>
	<div>
		<ConfigProvider :use-id="useIdFunction">
			<NuxtLoadingIndicator />
			<NuxtPage />
			<UiVueSonner />
		</ConfigProvider>
	</div>
</template>

<script lang="ts" setup>
	import { ConfigProvider } from 'radix-vue';

	const useIdFunction = () => useId();
</script>
