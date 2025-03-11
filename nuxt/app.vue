<template>
	<div>
		<ConfigProvider :use-id="useIdFunction">
			<NuxtLayout>
				<NuxtLoadingIndicator />
				<NuxtPage />
				<UiVueSonner />
			</NuxtLayout>
		</ConfigProvider>
	</div>
</template>

<script lang="ts" setup>
	import { ConfigProvider } from 'radix-vue';
	const useIdFunction = () => useId();
</script>
