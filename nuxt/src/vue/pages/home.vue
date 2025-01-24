<template>
	<div>
		<h3>Home</h3>
		<LogoutBtn />
	</div>
</template>

<script setup lang="ts">
	useHead({
		title: 'Earthly - Home'
	});
	definePageMeta({
		middleware: ['auth']
	});
</script>
