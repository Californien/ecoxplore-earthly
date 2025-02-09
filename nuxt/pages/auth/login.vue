<template>
	<div class="flex h-screen items-center justify-center">
		<div class="w-full max-w-[330px] px-5">
			<h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
				Einloggen
			</h1>
			<p class="mt-1 text-muted-foreground">
				Nenne bitte E-Mail und Passwort, um dich einzuloggen.
			</p>

			<form class="mt-10" @submit="submit">
				<fieldset :disabled="isSubmitting" class="grid gap-5">
					<div>
						<UiVeeInput
							label="E-Mail"
							type="email"
							name="email"
							autocomplete="email"
							placeholder="max@example.com" />
					</div>
					<div>
						<UiVeeInput
							label="Passwort"
							type="password"
							autocomplete="current-password"
							name="password" />
					</div>
					<div>
						<UiButton
							class="w-full"
							type="submit"
							text="Einloggen" />
					</div>
				</fieldset>
			</form>
			<p class="mt-8 text-sm">
				<NuxtLink
					class="font-semibold text-primary underline-offset-2 hover:underline"
					to="#">
					Passwort vergessen?
				</NuxtLink>
			</p>
			<p class="mt-4 text-sm text-muted-foreground">
				Hast du keinen Account?
				<NuxtLink
					class="font-semibold text-primary underline-offset-2 hover:underline"
					to="/auth/register">
					Account erstellen
				</NuxtLink>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { object, string } from 'yup';
	import type { InferType } from 'yup';

	useSeoMeta({
		title: 'Einloggen',
		description: 'Nenne bitte E-Mail und Passwort, um dich einzuloggen.'
	});
	useHead({
		title: 'Earthly - Login'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const LoginSchema = object({
		email: string().email().required().label('E-Mail'),
		password: string().required().label('Passwort').min(8)
	});

	const { handleSubmit, isSubmitting } = useForm<
		InferType<typeof LoginSchema>
	>({
		validationSchema: LoginSchema
	});

	const submit = handleSubmit(async (_) => {
		try {
			// TODO Call API to log in
			// TODO Redirect to dashboard ('/home' page)
			useSonner('Login erfolgreich!', {
				description: 'Du hast dich erfolgreich eingeloggt!'
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			useSonner.error('Login fehlgeschlagen', {
				description: error.error.message
			});
		}
	});
</script>
