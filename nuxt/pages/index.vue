<template>
	<div>
		<h3>index.vue</h3>
	</div>
</template>

<script lang="ts" setup>
	useHead({
		title: 'Loading...'
	});
	definePageMeta({
		middleware: ['auth-redirect']
	});
</script>
