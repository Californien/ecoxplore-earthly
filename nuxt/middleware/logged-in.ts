export default defineNuxtRouteMiddleware(async () => {
	const user = useStrapiUser();
	if (user.value) {
		return navigateTo('/dashboard', { replace: true });
	}
});
