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
			<video
				id="selected_camera_viewport"
				autoplay
				playsinline
				muted></video>
			<canvas
				v-show="isFrozen"
				id="canvas"
				ref="canvasRef"
				:class="{
					'opacity-100': isFrozen,
					'opacity-0': !isFrozen
				}"></canvas>
			<div
				v-if="streaming"
				class="viewport-overlay flex flex-row items-center justify-center">
				<UiButton
					:loading="isScanning"
					:disabled="!selectedCamera"
					variant="ringHover"
					class="btn rounded-full"
					size="icon"
					@click="scanBarcode">
					<Icon
						v-if="!isScanning"
						name="lucide:scan-line"
						class="size-4" />
				</UiButton>
				<div class="scan-area">
					<div ref="contentSimulation" class="content-simulation">
						<div ref="indicator" class="indicator"></div>
					</div>
					<div ref="plusIcon" class="plus-icon">
						<Icon name="lucide:plus" />
					</div>
					<div ref="cornerTL" class="corner t tl">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 20 V12 C8 10 10 8 12 8 H20"
								stroke="white"
								stroke-width="4"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</div>
					<div ref="cornerTR" class="corner t tr">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 20 V12 C8 10 10 8 12 8 H20"
								stroke="white"
								stroke-width="4"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</div>
					<div ref="cornerBL" class="corner b bl">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 20 V12 C8 10 10 8 12 8 H20"
								stroke="white"
								stroke-width="4"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</div>
					<div ref="cornerBR" class="corner b br">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8 20 V12 C8 10 10 8 12 8 H20"
								stroke="white"
								stroke-width="4"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round" />
						</svg>
					</div>
				</div>
			</div>
			<p>📦 Produkt-ID: {{ scannedCode }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { gsap } from 'gsap';
	import Quagga from '@ericblade/quagga2';

	const placement = ref('default');
	const cams = ref<MediaDeviceInfo[]>([]);
	const permissionStatus = ref('');
	const selectedCamera = ref('');
	const scannedCode = ref('');
	const isFrozen = ref(false);
	const isScanning = ref(false);
	const streaming = ref<boolean>(false);
	const scanTimeout = ref<NodeJS.Timeout | null>(null);
	const canvasRef = ref<HTMLCanvasElement | null>(null);
	const contentSimulation = ref<HTMLDivElement | null>(null);
	const indicator = ref<HTMLDivElement | null>(null);
	const plusIcon = ref<HTMLDivElement | null>(null);
	const cornerTL = ref<HTMLDivElement | null>(null);
	const cornerTR = ref<HTMLDivElement | null>(null);
	const cornerBL = ref<HTMLDivElement | null>(null);
	const cornerBR = ref<HTMLDivElement | null>(null);

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

	function resetScan() {
		isScanning.value = false;
		isFrozen.value = false;
		if (scanTimeout.value) clearTimeout(scanTimeout.value);
	}

	async function scanBarcode() {
		if (isScanning.value) return;
		isScanning.value = true;
		scannedCode.value = '';
		triggerScanAnimation();
		// 🎯 Standbild erzeugen
		const video = document.getElementById(
			'selected_camera_viewport'
		) as HTMLVideoElement;
		const canvas = canvasRef.value;

		if (video && canvas) {
			const ctx = canvas.getContext('2d');
			if (ctx) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
				isFrozen.value = true;
			}
		}

		// 1,5 Sekunden warten, bevor der Scan startet
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Timer: Kein Barcode gefunden
		scanTimeout.value = setTimeout(() => {
			if (isScanning.value) {
				scannedCode.value = 'Kein Barcode gefunden';
				console.log('→ Kein Barcode gefunden.');
				resetScan();
			}
		}, 2000); // Hier kann der Timeout nach Bedarf angepasst werden

		// Barcode scannen
		Quagga.decodeSingle(
			{
				src: canvasRef.value!.toDataURL('image/png'), // das Standbild als DataURL
				numOfWorkers: 0, // wichtig für Browserkompatibilität bei decodeSingle
				locator: {
					patchSize: 'medium',
					halfSample: true
				},
				decoder: {
					readers: ['ean_reader']
				},
				locate: true
			},
			(result) => {
				if (result && result.codeResult) {
					console.log(
						'Barcode erkannt (Standbild):',
						result.codeResult.code
					);
					scannedCode.value = result.codeResult.code || '';
				} else {
					console.log('→ Kein Barcode im Standbild gefunden.');
					scannedCode.value = 'Kein Barcode gefunden';
				}
				resetScan();
			}
		);
	}

	function triggerScanAnimation() {
		gsap.to(contentSimulation.value, {
			duration: 0.3,
			opacity: 1,
			ease: 'power2.out'
		});
		setTimeout(() => {
			gsap.to(indicator.value, {
				duration: 0.2,
				opacity: 1,
				ease: 'power2.out'
			});
			gsap.to(cornerTL.value, {
				duration: 0.25,
				transform: 'translate(-4px, -4px)',
				ease: 'power1.inOut'
			});
			gsap.to(cornerTR.value, {
				duration: 0.25,
				transform: 'translate(4px, -4px)',
				ease: 'power1.inOut'
			});
			gsap.to(cornerBL.value, {
				duration: 0.25,
				transform: 'translate(-4px, 4px)',
				ease: 'power1.inOut'
			});
			gsap.to(cornerBR.value, {
				duration: 0.25,
				transform: 'translate(4px, 4px)',
				ease: 'power1.inOut'
			});
			gsap.to(indicator.value, {
				duration: 0.5,
				left: '100%',
				ease: 'power1.inOut'
			});
			gsap.to(indicator.value, {
				duration: 0.4,
				opacity: 0,
				ease: 'power2.out',
				delay: 0.2
			});
			gsap.to(cornerTL.value, {
				duration: 0.25,
				transform: 'translate(0px, 0px)',
				ease: 'power1.inOut',
				delay: 0.35
			});
			gsap.to(cornerTR.value, {
				duration: 0.25,
				transform: 'translate(0px, 0px)',
				ease: 'power1.inOut',
				delay: 0.35
			});
			gsap.to(cornerBL.value, {
				duration: 0.25,
				transform: 'translate(0px, 0px)',
				ease: 'power1.inOut',
				delay: 0.35
			});
			gsap.to(cornerBR.value, {
				duration: 0.25,
				transform: 'translate(0px, 0px)',
				ease: 'power1.inOut',
				delay: 0.35
			});
			gsap.to(indicator.value, {
				duration: 0,
				left: '0%'
			});
		}, 500);
		setTimeout(() => {
			gsap.to(contentSimulation.value, {
				duration: 0.5,
				opacity: 0,
				ease: 'power2.out'
			});
		}, 900);
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
			canvas {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 16px;
				transition: opacity 0.3s;
			}
			.viewport-overlay {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: inherit;
				.btn {
					position: absolute;
					top: 8px;
					left: 8px;
				}
				.scan-area {
					position: relative;
					width: 85%;
					height: 20%;
					.corner {
						position: absolute;
						width: 32px;
						aspect-ratio: 1 / 1;
						&.tl {
							top: 0;
							left: 0;
							svg {
								transform: rotate(0deg);
							}
						}
						&.tr {
							top: 0;
							right: 0;
							svg {
								transform: rotate(90deg);
							}
						}
						&.br {
							bottom: 0;
							right: 0;
							svg {
								transform: rotate(180deg);
							}
						}
						&.bl {
							bottom: 0;
							left: 0;
							svg {
								transform: rotate(270deg);
							}
						}
					}
					.plus-icon {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 32px;
						height: 32px;
						display: grid;
						place-items: center;
						svg {
							width: 100%;
							height: 100%;
							color: white;
						}
					}
					.content-simulation {
						position: relative;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 92.5%;
						height: 80%;
						background-color: rgba(255, 255, 255, 0.025);
						border-radius: 6px;
						opacity: 0;
						overflow: hidden;
						.indicator {
							position: absolute;
							top: 0;
							left: 0%;
							width: 4px;
							height: 100%;
							background-color: white;
							opacity: 0;
						}
					}
				}
			}
		}
	}
</style>
