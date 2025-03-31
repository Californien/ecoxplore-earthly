<template>
	<div class="content flex items-left justify-center flex-col">
		<h1>Produkte scannen</h1>
		<UiGradientDivider class="divider" />
		<div class="cam">
			<div class="not-found">
				<Icon name="lucide:triangle-alert" />
				<span>Keine Kamera gefunden</span>
			</div>
			<video src=""></video>
		</div>
	</div>
</template>

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
			margin-top: 24px;
			width: 100%;
			height: 63vh;
			background-color: rgba(255, 255, 255, 0.01);
			border-radius: 16px;
			.not-found {
				opacity: 0;
				animation: fade-in 0.5s 3s ease-in-out forwards;
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
				width: 100%;
				height: 100%;
				border-radius: 16px;
				object-fit: cover;
			}
		}
	}
</style>
