<template>
	<div class="relative flex h-screen items-center justify-center">
		<div
			class="absolute inset-0 z-[1] bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(circle,transparent_25%,theme(colors.border)_100%)]" />
		<div class="relative z-[2] w-full max-w-[340px] px-5">
			<div
				class="mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border bg-background">
				<Icon class="size-6" name="lucide:lock" />
			</div>

			<div class="flex flex-col items-center text-center">
				<h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
					{{ title }}
				</h1>
				<p class="mt-1 text-muted-foreground">{{ description }}</p>
			</div>

			<form class="mt-10" @submit="submit">
				<fieldset :disabled="isSubmitting" class="grid gap-5">
					<UiVeeInput
						label="Verifizierungscode"
						type="text"
						name="otp"
						placeholder="123456" />
					<UiButton
						class="w-full"
						type="submit"
						text="Verifizieren" />
				</fieldset>
			</form>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { object, string } from 'yup';
	import type { InferType } from 'yup';
	const router = useRouter();

	const title = 'Identität bestätigen';
	const description =
		'Gebe hier dein Verifizierungscode ein, den wir dir geschickt haben.';
	useHead({
		title: 'Earthly - Identität bestätigen'
	});
	definePageMeta({
		middleware: ['active-register-flow']
	});

	useSeoMeta({ title, description });

	const LoginSchema = object({
		otp: string()
			.required()
			.label('OTP')
			.matches(/^\d{6}$/, 'Genau 6 Ziffern erforderlich')
	});

	const { handleSubmit, isSubmitting } = useForm<
		InferType<typeof LoginSchema>
	>({
		validationSchema: LoginSchema
	});

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const submit = handleSubmit(async (values) => {
		try {
			// TODO Call API to log in
			// TODO Redirect to dashboard ('/home' page)
			router.go(0);
			useSonner('Account erflogreich erstellt!', {
				description: 'Du hast erfolgreich einen Account erstellt!'
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			useSonner.error('Registrierung fehlgeschlagen!', {
				description: error.error.message
			});
		}
	});
</script>
