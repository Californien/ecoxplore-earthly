<template>
	<div class="flex h-screen items-center justify-center">
		<div
			class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
		<div class="relative w-full max-w-[330px] px-5">
			<h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
				Einloggen
			</h1>
			<p class="mt-1 text-muted-foreground">
				Nenne bitte E-Mail und Passwort, um dich einzuloggen.
			</p>

			<form novalidate class="mt-10" @submit="submit">
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
							placeholder="••••••••"
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
					to="/auth/forgot-password">
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
	import { object, string, setLocale } from 'yup';
	import { de } from 'yup-locales';
	import type { InferType } from 'yup';
	const router = useRouter();
	const { login } = useStrapiAuth();

	useSeoMeta({
		title: 'Einloggen',
		description: 'Nenne bitte E-Mail und Passwort, um dich einzuloggen.'
	});
	useHead({
		title: 'Earthly - Login'
	});
	definePageMeta({
		pageTransition: {
			name: 'auth_next',
			mode: 'out-in'
		},
		middleware: ['logged-in']
	});

	setLocale(de);
	const LoginSchema = object({
		email: string().email().required().label('E-Mail'),
		password: string().required().label('Passwort').min(8)
	});

	const { handleSubmit, isSubmitting } = useForm<
		InferType<typeof LoginSchema>
	>({
		validationSchema: LoginSchema
	});

	const submit = handleSubmit(async (values) => {
		try {
			await login({
				identifier: values.email,
				password: values.password
			});
			useSonner.success('Login erfolgreich!', {
				description: 'Du hast dich erfolgreich eingeloggt!'
			});
			router.push('/dashboard');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			useSonner.error('Login fehlgeschlagen', {
				description: error.error.message
			});
		}
	});
</script>
