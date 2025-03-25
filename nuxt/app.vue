<template>
	<div>
		<ConfigProvider :use-id="useIdFunction">
			<NuxtLoadingIndicator />
			<NuxtLayout>
				<NuxtPage />
			</NuxtLayout>
			<UiVueSonner />
		</ConfigProvider>
	</div>
</template>

<script lang="ts" setup>
	import { ConfigProvider } from 'radix-vue';
	const useIdFunction = () => useId();
</script>
