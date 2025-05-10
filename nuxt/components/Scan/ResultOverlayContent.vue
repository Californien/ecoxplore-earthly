<template>
	<div class="scan-result-overlay-content">
		<div
			v-if="props.apiResponse.status_verbose === 'product not found'"
			class="not-found">
			<Icon name="lucide:search-x" />
			<p>Dieses Produkt wurde nicht gefunden.</p>
			<UiButton variant="gooeyRight" @click="overlayFadeOut">
				Weiter scannen
			</UiButton>
		</div>
		<div v-else class="content">
			<UiScrollArea class="content-scroll-area">
				<div class="title">
					<p>Ergebnisse für:</p>
					<h1>
						{{
							pr.product_name_de
								? pr.product_name_de
								: 'Name unbekannt'
						}}
					</h1>
					<div class="detail-title">
						<h2>
							{{
								props.apiResponse.code
									? props.apiResponse.code
									: 'Barcode Nummer unbekannt'
							}}
						</h2>
						<h3>
							{{ pr.quantity ? pr.quantity : 'Menge unbekannt' }}
						</h3>
					</div>
				</div>

				<h1 class="divider-title">Übersicht</h1>
				<UiDivider icon="lucide:square-chart-gantt" class="divider" />

				<div class="ecoscore-data ecoscore-grade">
					<div v-if="ecoscore_id > 0" class="data">
						<div class="title">
							<span>EcoScore Grade:</span>
							<Icon
								v-if="items[ecoscore_id - 1].warning"
								name="lucide:triangle-alert" />
						</div>
						<UiTimeline
							:model-value="ecoscore_id"
							class="ecoscore-grade-timeline"
							orientation="horizontal">
							<UiTimelineItem
								v-for="item in items"
								:key="item.id"
								:step="item.id">
								<UiTimelineHeader>
									<UiTimelineSeparator />
									<UiTimelineTitle
										v-if="ecoscore_id === item.id"
										class="font-extrabold">
										{{ item.title }}
									</UiTimelineTitle>
									<UiTimelineTitle v-else class="font-thin">
										{{ item.title }}
									</UiTimelineTitle>
									<UiTimelineIndicator />
								</UiTimelineHeader>
							</UiTimelineItem>
						</UiTimeline>
						<div
							class="ecoscore-score mx-auto flex w-full max-w-sm flex-col gap-2">
							<div class="flex justify-between text-sm">
								<span>Score</span>
								<span class="text-muted-foreground">
									{{
										props.apiResponse.product.ecoscore_score
									}}
									/ 100
								</span>
							</div>
							<UiProgress
								v-model="
									// eslint-disable-next-line vue/no-mutating-props
									props.apiResponse.product.ecoscore_score
								"
								:style="{
									'--color-var': items[ecoscore_id - 1].color
								}"
								class="[&>div]:bg-[var(--color-var)]" />
						</div>
						<p
							class="description"
							:style="{
								color: items[ecoscore_id - 1].color
							}">
							{{ items[ecoscore_id - 1].description }}
						</p>
					</div>
					<div v-else class="na">
						<span class="title">EcoScore Grade:</span>
						<p v-if="ecoscore_id === -1" class="description">
							EcoScore nicht auf dieses Produkt anwendbar.
						</p>
						<p v-else class="description">
							EcoScore ist noch nicht für dieses Produkt verfügbar
							oder kann momentan nicht korrekt abgerufen werden.
						</p>
					</div>
				</div>

				<h1 class="divider-title">Detaillierte Umweltdaten</h1>
				<UiDivider icon="lucide:trees" class="divider" />

				<div class="ecoscore-data carbon-footprint">
					<div
						v-if="pr.ecoscore_data?.agribalyse?.co2_total"
						class="data">
						<UiFancyIcon
							type="light"
							icon="lucide:car"
							size="lg"
							class="icon-seperator" />
						<!-- prettier-ignore -->
						<span class="title">
							Entspricht einer Fahrt von ca. <span :style="`color: ${petrol_car_equivalent_color};`">{{ Number(petrol_car_equivalent.toFixed(1)) }}km</span> mit einem Benzin-Auto.
						</span>
						<!-- prettier-ignore -->
						<span :style="`color: ${petrol_car_equivalent_color};`" class="details">
							{{ Number((co2_total_kg * 100).toFixed(2)) }}g CO<sub>2</sub>e pro 100g Produkt
						</span>
						<UiFancyIcon
							type="light"
							icon="lucide:chart-no-axes-combined"
							size="lg"
							class="icon-seperator mt-10" />
						<UiChartBar
							:data="carbonFootprintChartData"
							index="name"
							:categories="[
								'Landwirtschaft',
								'Verarbeitung',
								'Verpackung',
								'Transport',
								'Vertrieb',
								'Verbrauch'
							]"
							:colors="[
								'#2dd4bf',
								'#22d3ee',
								'#60a5fa',
								'#818cf8',
								'#a78bfa',
								'#f472b6'
							]"
							:rounded-corners="4"
							:y-formatter="
								(tick, i) => {
									return typeof tick === 'number'
										? `${tick.toFixed(1)}%`
										: '';
								}
							" />
					</div>
					<div v-else class="na">
						<UiFancyIcon
							type="light"
							icon="lucide:car"
							size="lg"
							class="icon-seperator" />
						<!-- prettier-ignore -->
						<p class="description">
							Daten zur CO<sub>2</sub>-Billanz sind entweder noch nicht für dieses Produkt
							verfügbar oder können momentan nicht korrekt
							abgerufen werden.
						</p>
					</div>
				</div>
				<div class="ecoscore-data packaging-impact">
					<div
						v-if="
							pr.ecoscore_data?.adjustments?.packaging
								?.warning !== 'packaging_data_missing'
						"
						class="data">
						<UiFancyIcon
							type="light"
							icon="lucide:package-open"
							size="lg"
							class="icon-seperator" />
						<span
							v-if="
								pr.ecoscore_data?.adjustments?.packaging
									?.value >= -5
							"
							class="title"
							style="color: #f94b7d">
							Verpackung mit einem hohem Umwelteinfluss
						</span>
						<span
							v-else-if="
								pr.ecoscore_data?.adjustments?.packaging
									?.value >= -12
							"
							class="title"
							style="color: #fd927a">
							Verpackung mit einem moderaten Umwelteinfluss
						</span>
						<span v-else class="title" style="color: #34d399">
							Verpackung mit einem niedrigen Umwelteinfluss
						</span>

						<div
							class="packaging-table grid overflow-x-auto rounded-md border pb-4 mt-8">
							<UiTable>
								<UiTableCaption>
									Liste der verwendeten Verpackungsarten
								</UiTableCaption>
								<UiTableHeader>
									<UiTableRow>
										<UiTableHead>Shape</UiTableHead>
										<UiTableHead>Material</UiTableHead>
										<UiTableHead>Recycling</UiTableHead>
										<UiTableHead class="text-right">
											Umwelteinfluss
										</UiTableHead>
									</UiTableRow>
								</UiTableHeader>
								<UiTableBody class="last:border-b">
									<template
										v-for="packaging in pr.ecoscore_data
											?.adjustments?.packaging
											?.packagings"
										:key="packaging.material">
										<UiTableRow>
											<UiTableCell class="font-medium">
												{{ packaging.shape }}
											</UiTableCell>
											<UiTableCell>
												{{ packaging.material }}
											</UiTableCell>
											<UiTableCell
												:style="`color: ${
													packaging.non_recyclable_and_non_biodegradable ===
													'yes'
														? '#f94b7d'
														: packaging.non_recyclable_and_non_biodegradable ===
															  'no'
															? '#34d399'
															: '#fd927a'
												};`">
												{{ packaging.recycling }}
											</UiTableCell>
											<UiTableCell
												class="text-right"
												:style="`color: ${(packaging.environmental_score_material_score ?? 0) < 50 ? '#f94b7d' : (packaging.environmental_score_material_score ?? 0) > 80 ? '#34d399' : '#fd927a'};`">
												{{
													(packaging.environmental_score_material_score ??
														0) < 50
														? 'Hoch'
														: (packaging.environmental_score_material_score ??
																	0) > 80
															? 'Niedrig'
															: 'Moderat'
												}}
											</UiTableCell>
										</UiTableRow>
									</template>
								</UiTableBody>
							</UiTable>
						</div>

						<div
							v-if="
								pr.ecoscore_data?.adjustments?.packaging
									?.warning ===
								('unspecified_material' as string)
							"
							class="unspecified-material-warning">
							<p>
								Die Angaben zur Verpackung dieses Produkts sind
								nicht ausreichend präzise (genaue Formen und
								Materialien aller Verpackungsbestandteile).
							</p>
							<NuxtLink to="https://world.openfoodfacts.org/">
								<Icon name="lucide:link" />
								openfoodfacts.org
							</NuxtLink>
						</div>
					</div>
					<div v-else class="na">
						<UiFancyIcon
							type="light"
							icon="lucide:package-open"
							size="lg"
							class="icon-seperator" />
						<p class="description">
							Verpackungsdaten sind entweder noch nicht für dieses
							Produkt verfügbar oder können momentan nicht korrekt
							abgerufen werden.
						</p>
						<NuxtLink
							class="na-link"
							to="https://world.openfoodfacts.org/">
							<Icon name="lucide:link" />
							openfoodfacts.org
						</NuxtLink>
					</div>
				</div>
				<div class="ecoscore-data ingredients-origins">
					<div
						v-if="
							pr.ecoscore_data?.adjustments
								?.origins_of_ingredients?.warning !==
							'origins_are_100_percent_unknown'
						"
						class="data">
						<UiFancyIcon
							type="light"
							icon="lucide:shopping-basket"
							size="lg"
							class="icon-seperator" />
						<span
							v-if="
								pr.ecoscore_data?.adjustments
									?.origins_of_ingredients?.epi_score <= 50
							"
							class="title"
							style="color: #f94b7d">
							Herkunft der Zutaten mit einem hohem Umwelteinfluss
						</span>
						<span
							v-else-if="
								pr.ecoscore_data?.adjustments
									?.origins_of_ingredients?.epi_score > 93
							"
							class="title"
							style="color: #34d399">
							Herkunft der Zutaten mit einem niedrigen
							Umwelteinfluss
						</span>
						<span v-else class="title" style="color: #fd927a">
							Herkunft der Zutaten mit einem moderatem
							Umwelteinfluss
						</span>
						<div
							class="ingredients-table grid overflow-x-auto rounded-md border pb-4">
							<UiTable>
								<UiTableCaption>
									Liste der Zutaten-Herkünfte
								</UiTableCaption>
								<UiTableHeader>
									<UiTableRow>
										<UiTableHead class="w-[100px]">
											Herkunft
										</UiTableHead>
										<UiTableHead>% der Zutaten</UiTableHead>
										<UiTableHead class="text-right">
											Umwelteinfluss
										</UiTableHead>
									</UiTableRow>
								</UiTableHeader>
								<UiTableBody class="last:border-b">
									<template
										v-for="ingr in pr.ecoscore_data
											?.adjustments
											?.origins_of_ingredients
											?.aggregated_origins"
										:key="ingr.percent">
										<UiTableRow>
											<UiTableCell class="font-medium">
												{{ ingr.origin }}
											</UiTableCell>
											<UiTableCell>
												{{ ingr.percent.toFixed(1) }}
											</UiTableCell>
											<UiTableCell
												class="text-right"
												:style="`color: ${
													Number(ingr.epi_score) <= 50
														? '#f94b7d'
														: Number(
																	ingr.epi_score
															  ) > 75
															? '#34d399'
															: '#fd927a'
												};`">
												{{
													Number(ingr.epi_score) <= 50
														? 'Hoch'
														: Number(
																	ingr.epi_score
															  ) > 75
															? 'Niedrig'
															: 'Moderat'
												}}
											</UiTableCell>
										</UiTableRow>
									</template>
								</UiTableBody>
							</UiTable>
						</div>
						<div
							v-if="pr.manufacturing_places"
							id="map"
							class="map h-[200px] w-[100%] rounded-2xl mt-4"></div>
					</div>
					<div v-else class="na">
						<UiFancyIcon
							type="light"
							icon="lucide:shopping-basket"
							size="lg"
							class="icon-seperator" />
						<p class="description">
							Informationen zur Herkunft der Zutaten sind entweder
							noch nicht für dieses Produkt verfügbar oder können
							momentan nicht korrekt abgerufen werden.
						</p>
						<NuxtLink
							class="na-link"
							to="https://world.openfoodfacts.org/">
							<Icon name="lucide:link" />
							openfoodfacts.org
						</NuxtLink>
					</div>
				</div>
				<div class="ecoscore-data threatened-species">
					<div class="data">
						<UiFancyIcon
							type="light"
							icon="lucide:tree-palm"
							size="lg"
							class="icon-seperator" />
						<div
							v-if="
								(pr.ingredients_analysis_tags &&
									pr.ingredients_analysis_tags.includes(
										'en:palm-oil-content-unknown'
									)) ||
								!pr.ingredients_analysis_tags
							">
							<span class="title">
								Informationen zum Palmöl unbekannt
							</span>
						</div>
						<div
							v-else-if="
								pr.ingredients_analysis_tags &&
								pr.ingredients_analysis_tags.includes(
									'en:palm-oil'
								)
							">
							<span class="title" style="color: #f94b7d">
								Produkt enthält Palmöl
							</span>
							<p class="details">
								Tropische Wälder in Asien, Afrika und
								Lateinamerika werden abgeholzt, um
								Ölpalmenplantagen anzulegen und auszuweiten.
								Diese Entwaldung trägt zum Klimawandel bei und
								gefährdet Arten wie den Orang-Utan, den
								Zwerg-Elefanten und das Sumatra-Nashorn.
							</p>
						</div>
						<div
							v-else-if="
								pr.ingredients_analysis_tags &&
								pr.ingredients_analysis_tags.includes(
									'en:palm-oil-free'
								)
							">
							<span class="title" style="color: #34d399">
								Produkt enthält kein Palmöl
							</span>
							<p class="details">
								Tropische Wälder in Asien, Afrika und
								Lateinamerika werden abgeholzt, um
								Ölpalmenplantagen anzulegen und auszuweiten.
								Diese Entwaldung trägt zum Klimawandel bei und
								gefährdet Arten wie den Orang-Utan, den
								Zwerg-Elefanten und das Sumatra-Nashorn.
							</p>
						</div>
						<UiFancyIcon
							type="light"
							icon="lucide:turtle"
							size="lg"
							class="icon-seperator mt-6" />
						<div
							v-if="
								!pr.ecoscore_data?.adjustments
									?.threatened_species?.ingredient
							">
							<span class="title" style="color: #34d399">
								Keine Zutaten, die Arten gefährden
							</span>
						</div>
						<div v-else>
							<span class="title" style="color: #f94b7d">
								Zutaten, die Arten gefährden
							</span>
							<div class="threatened-species-ingredient">
								<span
									v-if="
										pr.ecoscore_data?.adjustments
											?.threatened_species?.ingredient ===
										'en:palm-oil'
									"
									class="ingredient">
									Palmöl
								</span>
								<span v-else class="ingredient">
									{{
										pr.ecoscore_data?.adjustments
											?.threatened_species?.ingredient
									}}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="ecoscore-data production-system">
					<div class="data">
						<UiFancyIcon
							type="light"
							icon="lucide:tags"
							size="lg"
							class="icon-seperator" />
						<div class="ingredients-analysis">
							<div
								class="line palm-oil"
								:class="
									pr.ingredients_analysis_tags &&
									pr.ingredients_analysis_tags.includes(
										'en:palm-oil'
									)
										? 'red'
										: pr.ingredients_analysis_tags &&
											  pr.ingredients_analysis_tags.includes(
													'en:palm-oil-free'
											  )
											? 'green'
											: ''
								">
								<UiFancyIcon
									class="line-icon"
									type="light"
									icon="lucide:tree-palm"
									circle
									size="md" />
								<p class="line-text">
									{{
										pr.ingredients_analysis_tags &&
										pr.ingredients_analysis_tags.includes(
											'en:palm-oil'
										)
											? 'Enthält Palmöl'
											: pr.ingredients_analysis_tags &&
												  pr.ingredients_analysis_tags.includes(
														'en:palm-oil-free'
												  )
												? 'Enthält kein Palmöl'
												: 'Palmöl-Status unbekannt'
									}}
								</p>
							</div>
							<div
								class="line vegan"
								:class="
									pr.ingredients_analysis_tags &&
									pr.ingredients_analysis_tags.includes(
										'en:vegan'
									)
										? 'green'
										: pr.ingredients_analysis_tags &&
											  pr.ingredients_analysis_tags.includes(
													'en:non-vegan'
											  )
											? 'red'
											: ''
								">
								<UiFancyIcon
									class="line-icon"
									type="light"
									icon="lucide:vegan"
									circle
									size="md" />
								<p class="line-text">
									{{
										pr.ingredients_analysis_tags &&
										pr.ingredients_analysis_tags.includes(
											'en:vegan'
										)
											? 'Vegan'
											: pr.ingredients_analysis_tags &&
												  pr.ingredients_analysis_tags.includes(
														'en:non-vegan'
												  )
												? 'Nicht vegan'
												: 'Vegan-Status unbekannt'
									}}
								</p>
							</div>
							<div
								:class="
									pr.ingredients_analysis_tags &&
									pr.ingredients_analysis_tags.includes(
										'en:vegetarian'
									)
										? 'green'
										: pr.ingredients_analysis_tags &&
											  pr.ingredients_analysis_tags.includes(
													'en:non-vegetarian'
											  )
											? 'red'
											: ''
								"
								class="line vegetarian">
								<UiFancyIcon
									class="line-icon"
									type="light"
									icon="lucide:egg-off"
									circle
									size="md" />
								<p class="line-text">
									{{
										pr.ingredients_analysis_tags &&
										pr.ingredients_analysis_tags.includes(
											'en:vegetarian'
										)
											? 'Vegetarisch'
											: pr.ingredients_analysis_tags &&
												  pr.ingredients_analysis_tags.includes(
														'en:non-vegetarian'
												  )
												? 'Nicht vegetarisch'
												: 'Vegetraisch-Status unbekannt'
									}}
								</p>
							</div>
						</div>
					</div>
				</div>

				<h1 class="divider-title">Quellen</h1>
				<UiDivider icon="lucide:link-2" class="divider" />

				<div class="ecoscore-data sources">
					<div class="data">
						<!-- prettier-ignore -->
						<span class="warning">
							Alle angezeigten Umweltinformationen stammen aus der <NuxtLink href="https://de.openfoodfacts.org/">OpenFoodFacts-Datenbank</NuxtLink>. Trotz sorgfältiger Verarbeitung übernehmen wir keine Gewähr für die Vollständigkeit, Richtigkeit oder Aktualität der bereitgestellten Daten. Die Angaben dienen ausschließlich zur allgemeinen Information und ersetzen keine individuelle Beratung.
						</span>
					</div>
				</div>
			</UiScrollArea>
			<div class="continue-button">
				<UiButton variant="gooeyRight" @click="overlayFadeOut">
					Weiter scannen
				</UiButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { gsap } from 'gsap';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	const props = defineProps<{
		apiResponse: OpenFoodFactsProduct;
		parentDiv: HTMLElement | null;
	}>();

	const parentDiv = ref(props.parentDiv);
	const pr = props.apiResponse.product;

	function overlayFadeOut() {
		gsap.to(parentDiv.value, {
			duration: 1,
			delay: 1,
			opacity: 0,
			backdropFilter: 'blur(0px)',
			transform: 'translateY(100%)',
			ease: 'power2.out'
		});
	}

	// EcoScore letter to id
	function scoreToId(letter: string): number {
		switch (letter) {
			case 'a':
				return 1;
			case 'b':
				return 2;
			case 'c':
				return 3;
			case 'd':
				return 4;
			case 'e':
				return 5;
			case 'f':
				return 6;
			case 'unknown':
				return 0;
			case 'not-applicable':
				return -1;
			default:
				return 0;
		}
	}

	const ecoscore_id: number = scoreToId(
		pr.ecoscore_data?.grades?.de ?? pr.ecoscore_grade
	);

	// EcoScore items
	const items = [
		{
			id: 1,
			date: '',
			title: 'A',
			description: 'Sehr geringe Umweltbelastung.',
			color: '#5cf59b',
			warning: false
		},
		{
			id: 2,
			date: '',
			title: 'B',
			description: 'Geringe Umweltbelastung.',
			color: '#5df6be',
			warning: false
		},
		{
			id: 3,
			date: '',
			title: 'C',
			description: 'Mittlere Umweltbelastung.',
			color: '#5cd9f5',
			warning: false
		},
		{
			id: 4,
			date: '',
			title: 'D',
			description: 'Erhöhte Umweltbelastung.',
			color: '#f6d671',
			warning: false
		},
		{
			id: 5,
			date: '',
			title: 'E',
			description: 'Hohe Umweltbelastung.',
			color: '#f56748',
			warning: false
		},
		{
			id: 6,
			date: '',
			title: 'F',
			description: 'Sehr hohe Umweltbelastung.',
			color: '#ff2e58',
			warning: true
		}
	];
	// Carbon Footprint
	const co2_total_kg = pr.ecoscore_data?.agribalyse?.co2_total ?? 0; // in kg CO2 per kg of product
	const co2_total_100g = co2_total_kg / 10; // in kg CO2 per 100g of product
	const petrol_car_equivalent = co2_total_100g / 0.18; // in km
	const petrol_car_equivalent_color =
		petrol_car_equivalent < 2
			? '#34d399'
			: petrol_car_equivalent > 7
				? '#f94b7d'
				: '#fd927a';

	type AgribalyseKeys =
		| 'co2_agriculture'
		| 'co2_consumption'
		| 'co2_distribution'
		| 'co2_packaging'
		| 'co2_processing'
		| 'co2_transportation';

	function calcPercentage(category: AgribalyseKeys): number {
		if (pr.ecoscore_data?.agribalyse) {
			const co2_category = pr.ecoscore_data.agribalyse[category];
			const result = co2_category / pr.ecoscore_data.agribalyse.co2_total;
			const result_ = result * 10000;
			return Math.floor(result_) / 100;
		} else {
			return 0;
		}
	}

	const carbonFootprintChartData = [
		{
			name: '% der Gesamtemission',
			Landwirtschaft: calcPercentage('co2_agriculture'),
			Verarbeitung: calcPercentage('co2_processing'),
			Verpackung: calcPercentage('co2_packaging'),
			Transport: calcPercentage('co2_transportation'),
			Vertrieb: calcPercentage('co2_distribution'),
			Verbrauch: calcPercentage('co2_consumption')
		}
	];

	// Origins of ingredients
	const address = pr.manufacturing_places;

	onMounted(async () => {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
		);
		const data = await res.json();
		if (!data[0]) return;

		const lat = parseFloat(data[0].lat);
		const lon = parseFloat(data[0].lon);

		const map = L.map('map').setView([lat, lon], 13);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		L.marker([lat, lon]).addTo(map).bindPopup(address).openPopup();
	});

	console.log(pr);
</script>

<style lang="scss">
	.scan-result-overlay-content {
		width: 100%;
		height: 100%;
		.not-found {
			width: inherit;
			height: inherit;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			.iconify {
				font-size: 3em;
				color: #ff2e58;
			}
			p {
				font-size: 1.1em;
				text-align: center;
			}
		}
		.content {
			color: white;
			.content-scroll-area {
				mask-image: linear-gradient(
					0deg,
					rgba(0, 0, 0, 0) 1%,
					rgb(0, 0, 0) 20%,
					rgb(0, 0, 0) 95%,
					rgba(0, 0, 0, 0) 100%
				);
				height: 92.5%;
				.production-system {
					// last child
					margin-bottom: 4rem;
				}
			}
			width: inherit;
			height: inherit;
			padding: 1rem 1.25rem;
			display: flex;
			flex-direction: column;
			margin-bottom: 10rem;
			gap: 1rem;
			.title {
				p {
					margin-top: 0.75rem;
					font-size: 0.8rem;
					font-weight: 300;
				}
				h1 {
					font-size: 1.5em;
					font-weight: 800;
				}
				.detail-title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					h2,
					h3 {
						font-size: 0.9em;
						font-weight: 400;
					}
				}
			}
			.continue-button {
				width: 100%;
				height: 5rem;
				position: fixed;
				bottom: 0;
				left: 0;
				display: grid;
				place-items: center;
				z-index: 1000;
			}
			.divider-title {
				margin-top: 1.5rem;
				font-weight: 700;
				font-size: 1.3em;
			}
			.divider {
				margin-top: 0.05rem;
				margin-bottom: 2rem;
			}

			.ecoscore-data {
				.na,
				.data {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					text-align: center;
					margin-top: 2rem;
					.title {
						font-size: 0.9em;
						font-weight: 800;
					}
					.icon-seperator {
						margin-bottom: 1rem;
					}
					.description {
						margin-top: 0.5rem;
						font-size: 0.9em;
						font-weight: 500;
						color: #ffffffe5;
						font-style: italic;
					}
					.na-link {
						margin-top: 1rem;
						font-size: 0.8em;
						font-weight: 400;
						font-style: italic;
						text-decoration: underline;
						cursor: pointer;
					}
				}
			}

			.ecoscore-grade {
				.data {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					flex-direction: column;
					text-align: left;
					.title {
						display: flex;
						justify-content: space-between;
					}
					.ecoscore-score {
						margin-top: 1rem;
					}
					.description {
						margin-top: 1rem;
						font-size: 1em;
						font-weight: 900;
						font-style: italic;
					}
				}
				.na {
					.iconify {
						font-size: 1.5em;
						color: #ff2e58;
						transform: translateY(-10px);
					}
				}
			}
			.carbon-footprint {
				.data {
					.title {
						font-size: 1.1em;
						font-weight: 700;
					}
					.details {
						font-size: 0.9em;
						font-style: italic;
						font-weight: 400;
					}
					.css-czc1aa-bullet-legend-component {
						width: 30vh;
					}
				}
			}
			.packaging-impact {
				.packaging-table {
					text-align: left;
				}
				.unspecified-material-warning {
					margin-top: 1rem;
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					flex-direction: column;
					p,
					a {
						font-size: 0.7em;
						text-align: left;
						font-style: italic;
						font-weight: 400;
					}
					a {
						margin-top: 1rem;
						text-decoration: underline;
					}
				}
			}
			.ingredients-origins {
				.ingredients-table {
					margin-top: 2rem;
					text-align: left;
				}
			}
			.threatened-species {
				.data {
					.title {
						font-size: 1.3em;
						font-weight: 800;
					}
					.details {
						font-size: 0.8em;
						font-style: italic;
						font-weight: 500;
					}
					.threatened-species-ingredient {
						.ingredient {
							margin-top: 3rem;
							font-size: 0.9em;
							font-weight: 800;
							font-style: italic;
						}
					}
				}
			}
			.production-system {
				.data {
					.ingredients-analysis {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						gap: 1rem;
						text-align: left;
						width: 100%;
						.line {
							width: inherit;
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							align-items: center;
							gap: 1rem;
							$red: #f82145;
							$green: #37f894;
							&.red {
								.line-icon {
									background-color: rgba($red, 0.05);
									.iconify {
										color: $red;
									}
								}
								p {
									color: lighten($red, 7.5%);
								}
							}
							&.green {
								.line-icon {
									background-color: rgba($green, 0.05);
									.iconify {
										color: $green;
									}
								}
								p {
									color: lighten($green, 7.5%);
								}
							}
						}
					}
				}
			}
			.sources {
				margin-bottom: 3.5rem;
				.data {
					.warning {
						display: inline;
						font-size: 0.8em;
						font-weight: 500;
						font-style: italic;
						a {
							color: #22d3ee;
							text-decoration: underline;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
