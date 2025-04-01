<template>
	<div class="content flex items-left justify-center flex-col">
		<div class="flex flex-row items-center justify-between">
			<h1>Produkte scannen</h1>
			<UiDropdownMenu>
				<UiDropdownMenuTrigger as-child>
					<UiButton
						variant="outline"
						size="icon"
						class="rounded-full">
						<Icon name="lucide:video" class="size-4" />
					</UiButton>
				</UiDropdownMenuTrigger>
				<UiDropdownMenuContent class="w-48 dropdown-menu-content">
					<UiDropdownMenuLabel label="Kamera auswählen" />
					<UiDropdownMenuSeparator />
					<UiDropdownMenuRadioGroup v-model="placement">
						<UiDropdownMenuRadioItem
							v-for="item in cams"
							:key="item.label"
							:value="item.label"
							:title="item.label"
							:text-value="item.label"
							@select="selectCamera(item.deviceId)" />
					</UiDropdownMenuRadioGroup>
				</UiDropdownMenuContent>
			</UiDropdownMenu>
		</div>
		<UiGradientDivider class="divider" />
		<div class="cam">
			<div
				v-if="permissionStatus === 'error'"
				class="warning no-camera-found">
				<Icon name="lucide:octagon-x" />
				<span>Ein unerwarteter Fehler ist aufgetreten</span>
			</div>
			<div
				v-else-if="permissionStatus === 'prompt'"
				class="warning assign-permission">
				<Icon name="lucide:shield-question" />
				<span>Kamera Berechtigung bitte erteilen</span>
			</div>
			<div
				v-if="permissionStatus === 'denied'"
				class="warning assign-permission">
				<Icon name="lucide:shield-x" />
				<span>
					Kamera Zugriff nicht erlaubt. Bitte erteile Earthly diese
					Berechtigung.
				</span>
			</div>
			<div
				v-else-if="permissionStatus === 'granted' && cams.length > 0"
				class="warning select-camera">
				<Icon name="lucide:mouse-pointer-click" />
				<span>Bitte Kamera auswählen</span>
			</div>
			<div
				v-else-if="permissionStatus === 'granted' && cams.length === 0"
				class="warning no-camera-found">
				<Icon name="lucide:video-off" />
				<span>Keine Kamera verfügbar</span>
			</div>
			<video id="selected_camera_viewport" autoplay playsinline></video>
			<div
				v-if="streaming"
				class="viewport-overlay flex flex-row items-center justify-center">
				<UiButton
					:disabled="isScanning"
					variant="ringHover"
					class="btn rounded-full"
					size="icon"
					@click="scanBarcode">
					<Icon name="lucide:scan-line" class="size-4" />
				</UiButton>
			</div>
			<p>📦 Produkt-ID: {{ scannedCode }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import {
		MultiFormatReader,
		BarcodeFormat,
		DecodeHintType,
		RGBLuminanceSource,
		BinaryBitmap,
		HybridBinarizer
	} from '@zxing/library';

	const placement = ref('default');
	const cams = ref<MediaDeviceInfo[]>([]);
	const permissionStatus = ref('');
	const selectedCamera = ref('');
	const scannedCode = ref('');
	const isScanning = ref(false);
	let streaming = ref<boolean>(false);
	let videoElement: HTMLVideoElement | null = null;

	async function getCameras() {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			cams.value = devices.filter(
				(device) => device.kind === 'videoinput'
			);
		} catch (error) {
			console.error('Fehler beim Abrufen der Kameras:', error);
		}
	}

	async function checkCameraPermission() {
		try {
			// Berechtigungsstatus abrufen (kann in manchen Browsern fehlschlagen)
			let status;
			try {
				status = await navigator.permissions.query({
					name: 'camera'
				} as unknown as PermissionDescriptor);
				permissionStatus.value = status.state;
			} catch {
				console.warn('`permissions.query` wird nicht unterstützt.');
				permissionStatus.value = 'prompt'; // Setze es als 'prompt', falls nicht überprüfbar
			}

			// Falls die Berechtigung bereits erteilt wurde → Kameras abrufen
			if (permissionStatus.value === 'granted') {
				await getCameras();
			}
			// Falls die Berechtigung "prompt" ist → Nutzer fragen
			else if (permissionStatus.value === 'prompt') {
				try {
					await navigator.mediaDevices.getUserMedia({ video: true });
					permissionStatus.value = 'granted';
					await getCameras();
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (err) {
					console.warn(
						'User hat Kamera-Zugriff verweigert oder Fehler ist aufgetreten.'
					);
					permissionStatus.value = 'denied';
				}
			}

			// Falls `status` definiert ist → auf Änderungen lauschen
			if (status) {
				status.onchange = async () => {
					const updatedStatus = await navigator.permissions.query({
						name: 'camera'
					} as unknown as PermissionDescriptor);
					permissionStatus.value = updatedStatus.state;
					if (updatedStatus.state === 'granted') {
						await getCameras();
					}
				};
			}
		} catch (error) {
			console.error('Ein unerwarteter Fehler ist aufgetreten:', error);
			if (permissionStatus.value !== 'denied') {
				permissionStatus.value = 'error';
			}
		}
	}

	async function startCameraStream(deviceId: string) {
		console.log('Selecting camera ' + deviceId + '...');
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { deviceId: { exact: deviceId } }
			});

			const videoElement = document.getElementById(
				'selected_camera_viewport'
			) as HTMLVideoElement | null;
			if (videoElement) {
				videoElement.srcObject = stream;
				streaming.value = true;
			} else {
				console.error('Video-Element nicht gefunden');
			}
		} catch (error) {
			console.error('Fehler beim Starten der Kamera:', error);
		}
	}

	function selectCamera(deviceId: string) {
		selectedCamera.value = deviceId;
		startCameraStream(deviceId);
	}

	async function scanBarcode() {
		console.log('Scanning barcode...');
		if (!videoElement) return;
		isScanning.value = true;

		try {
			const reader = new MultiFormatReader();
			const hints = new Map();
			hints.set(DecodeHintType.POSSIBLE_FORMATS, [
				BarcodeFormat.QR_CODE,
				BarcodeFormat.DATA_MATRIX
			]);
			reader.setHints(hints);
			console.log('Barcode reader initialized');
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (ctx) {
				canvas.width = videoElement.videoWidth;
				canvas.height = videoElement.videoHeight;
				ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				);
				console.log('Image data captured');
				const luminanceSource = new RGBLuminanceSource(
					imageData.data,
					canvas.width,
					canvas.height
				);
				const binaryBitmap = new BinaryBitmap(
					new HybridBinarizer(luminanceSource)
				);
				const result = reader.decode(binaryBitmap);
				console.log('Barcode decoded:', result);
				scannedCode.value = result.getText();
			}
		} catch (error) {
			console.error('Kein Barcode gefunden:', error);
		} finally {
			console.log('Scan abgeschlossen');
			isScanning.value = false;
		}
	}

	watch(permissionStatus, (newStatus) => {
		if (newStatus === 'granted') {
			getCameras();
		}
	});

	onMounted(() => {
		checkCameraPermission();
	});
</script>

<style lang="scss">
	.content {
		padding: 0.2rem 2rem;
		h1 {
			font-size: 1.4em;
			font-weight: 700;
		}
		.divider {
			margin-top: 24px;
		}
		.cam {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			margin-top: 24px;
			width: 35.44vh;
			height: 63vh;
			aspect-ratio: 9 / 16;
			background-color: rgba(255, 255, 255, 0.01);
			border-radius: 16px;
			.warning {
				opacity: 0;
				animation: fade-in 0.5s ease-in-out forwards;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				color: #fff;
				font-size: 1.2em;
				font-weight: 600;
				@keyframes fade-in {
					0% {
						opacity: 0;
						filter: blur(8px);
					}
					100% {
						opacity: 1;
						filter: blur(0px);
					}
				}

				span {
					width: 70%;
					text-align: center;
					margin-top: 8px;
					font-size: 0.9em;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.5);
				}
				.iconify {
					font-size: 2em;
				}
			}
			video {
				transition: all 0.3s ease-in-out;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 16px;
				object-fit: cover;
			}
			.viewport-overlay {
				position: absolute;
				top: 8px;
				left: 8px;
			}
		}
	}
</style>
