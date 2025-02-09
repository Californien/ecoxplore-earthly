<template>
	<div class="relative flex h-screen items-center justify-center">
		<div
			class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

		<div class="relative w-full max-w-[330px] px-5">
			<h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
				{{ title }}
			</h1>
			<p class="mt-1 text-muted-foreground">{{ description }}</p>

			<form novalidate class="mt-10" @submit="submit">
				<fieldset :disabled="isSubmitting" class="grid gap-5">
					<UiVeeInput
						required
						label="Name"
						name="name"
						autocomplete="username"
						placeholder="Max Mustermann" />
					<UiVeeInput
						required
						label="E-Mail"
						type="email"
						name="email"
						autocomplete="email"
						placeholder="max@example.com" />
					<UiVeeInput
						v-model="password"
						required
						label="Passwort"
						type="password"
						autocomplete="current-password"
						name="password" />
					<ul class="flex flex-col gap-4">
						<li
							class="flex items-center gap-3 text-sm text-muted-foreground">
							<!-- FIXME Icons are not turning green when the password is valid, but when the whole form is valid. thats wrong. obviously. -->

							<Icon
								:class="[meta.valid ? 'text-green-500' : '']"
								class="size-[18px]"
								name="lucide:check-circle-2" />
							<span>Mindestens 8 Zeichen</span>
						</li>
						<li
							class="flex items-center gap-3 text-sm text-muted-foreground">
							<Icon
								:class="[meta.valid ? 'text-green-500' : '']"
								class="size-[18px]"
								name="lucide:check-circle-2" />
							<span>
								Mindestens eine Zahl und ein Sonderzeichen
							</span>
						</li>
					</ul>
					<UiButton
						class="w-full"
						type="submit"
						text="Account erstellen" />
				</fieldset>
			</form>
			<p class="mt-8 text-sm text-muted-foreground">
				Hast du bereits einen Account?
				<NuxtLink
					class="font-semibold text-primary underline-offset-2 hover:underline"
					to="/auth/login">
					Einloggen
				</NuxtLink>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { object, string } from 'yup';
	import type { InferType } from 'yup';

	const title = 'Account erstellen';
	const description = 'Der erste Schritt zur besseren Zukunft...';

	useSeoMeta({ title, description });
	useHead({
		title: 'Earthly - Registrieren'
	});
	definePageMeta({
		middleware: ['logged-in']
	});

	const Schema = object({
		name: string().required().label('Name').min(3).max(50),
		email: string().email().required().label('E-Mail'),
		password: string()
			.required()
			.min(8)
			.label('Passwort')
			.test(
				'password',
				'Passwort muss mindestens eine Zahl und ein Sonderzeichen enthalten!',
				(value) => {
					return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
						value
					);
				}
			)
	});

	const { handleSubmit, isSubmitting, meta } = useForm<
		InferType<typeof Schema>
	>({
		validationSchema: Schema
	});

	const submit = handleSubmit(async (_) => {
		try {
			// TODO Call API to create account AFTER otp
			// TODO Redirect user to OTP page

			useSonner.success('Überprüfe deinen Posteingang', {
				description:
					'Wir haben dir eine E-Mail mit einem Verifizierungscode gesendet.'
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			useSonner.error('Account erstellen fehlgeschlagen!', {
				description: error.error.message
			});
		}
	});
</script>
