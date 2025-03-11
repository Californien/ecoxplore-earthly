<template>
	<div class="relative flex h-screen items-center justify-center">
		<div
			class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

		<div class="relative w-full max-w-[330px] px-5">
			<h1 class="text-2xl font-bold tracking-tight lg:text-3xl">
				{{ title }}
			</h1>
			<p class="mt-1 text-muted-foreground">{{ description }}</p>

			<form novalidate class="mt-10" @submit.prevent="submit">
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
						name="password"
						placeholder="••••••••"
						@input="passwordInput" />
					<ul class="flex flex-col gap-4">
						<li
							class="flex items-center gap-3 text-sm text-muted-foreground">
							<Icon
								:class="[pwLengthValid ? 'text-green-500' : '']"
								class="size-[18px]"
								name="lucide:check-circle-2" />
							<span>Mindestens 8 Zeichen</span>
						</li>
						<li
							class="flex items-center gap-3 text-sm text-muted-foreground">
							<Icon
								:class="[
									pwComplexityValid ? 'text-green-500' : ''
								]"
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
	import { object, string, setLocale } from 'yup';
	import type { InferType } from 'yup';
	import { de } from 'yup-locales';

	const password = ref<string>();
	const { register } = useStrapiAuth();
	const router = useRouter();

	const title = 'Account erstellen';
	const description = 'Der erste Schritt zur besseren Zukunft...';

	useSeoMeta({ title, description });
	useHead({
		title: 'Earthly - Registrieren'
	});
	definePageMeta({
		pageTransition: {
			name: 'auth_next',
			mode: 'out-in'
		},
		middleware: ['logged-in'],
		layout: 'empty'
	});

	setLocale(de);

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
					return /^(?=.*[0-9])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/.test(
						value
					);
				}
			)
	});

	// Password ticks color detection
	let pwLengthValid = false;
	let pwComplexityValid = false;

	function passwordInput() {
		const input: string | undefined = password.value;
		if (input) {
			if (input.length >= 8) {
				pwLengthValid = true;
			} else {
				pwLengthValid = false;
			}

			const regexNumbers = /\d/;
			const regexSpecialChar =
				/^(?=.*[0-9])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
			if (regexNumbers.test(input) && regexSpecialChar.test(input)) {
				pwComplexityValid = true;
			} else {
				pwComplexityValid = false;
			}
		}
	}

	watch(password, (newPassword) => {
		if (newPassword === '') {
			pwLengthValid = false;
			pwComplexityValid = false;
		} else {
			passwordInput();
		}
	});

	const { handleSubmit, isSubmitting } = useForm<InferType<typeof Schema>>({
		validationSchema: Schema
	});

	const submit = handleSubmit(async (values) => {
		try {
			await register({
				username: values.name,
				email: values.email,
				password: values.password
			});

			useSonner.success('Fertig!', {
				description: 'Dein Account wurde erfolgreich erstellt.'
			});
			return router.push('/dashboard');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			useSonner.error('Ein Fehler ist aufgetreten!', {
				description: error.error.message
			});
		}
	});
</script>

<style lang="scss">
	span.iconify {
		transition: all 0.3s;
	}
</style>
