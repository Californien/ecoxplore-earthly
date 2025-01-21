<script setup lang="ts">
	import type { NuxtError } from '#app';

	const props = defineProps({
		// eslint-disable-next-line vue/require-default-prop
		error: Object as () => NuxtError
	});

	const handleError = () => clearError({ redirect: '/' });
	console.log(props);
</script>

<template>
	<div id="error_vue">
		<div class="wrapper">
			<h1>{{ error?.statusCode }}</h1>
			<h2>{{ error?.message }}</h2>
			<button @click="handleError">Go Home</button>
		</div>
	</div>
</template>
