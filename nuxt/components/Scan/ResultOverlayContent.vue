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
		<div v-else class="title">
			<p>Ergebnisse für:</p>
			<h1>{{ props.apiResponse.product.abbreviated_product_name }}</h1>
			<h2>{{ props.apiResponse.code }}</h2>

			<div class="ecoscore-grade">
				<UiTimeline :model-value="3" orientation="horizontal">
					<UiTimelineItem
						v-for="item in items"
						:key="item.id"
						:step="item.id">
						<UiTimelineHeader>
							<UiTimelineSeparator />
							<UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
							<UiTimelineIndicator />
						</UiTimelineHeader>
					</UiTimelineItem>
				</UiTimeline>
			</div>

			<UiButton variant="gooeyRight" @click="overlayFadeOut">
				Weiter scannen
			</UiButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { gsap } from 'gsap';

	// const props = defineProps<{
	// 	apiResponse: OpenFoodFactsProduct;
	// 	parentDiv: HTMLElement | null;
	// }>();

	// BEISPIEL:
	interface Props {
		apiResponse: OpenFoodFactsProduct;
	}

	const props: Props = {
		apiResponse: {
			code: '8000500310427',
			product: {
				_id: '8000500310427',
				_keywords: [
					'au',
					'aux',
					'biscoito',
					'biscuit',
					'cacao',
					'coeur',
					'croquant',
					'de',
					'et',
					'ferrero',
					'fourre',
					'la',
					'noisette',
					'nutella',
					'onctueux',
					'pate',
					'ponto',
					'recheado',
					'tartiner',
					'verde'
				],
				abbreviated_product_name: 'Nutella biscuits t22',
				abbreviated_product_name_fr: 'Nutella biscuits t22',
				abbreviated_product_name_fr_imported: 'Nutella biscuits t22',
				added_countries_tags: [],
				additives_n: 5,
				additives_original_tags: [
					'en:e322',
					'en:e322i',
					'en:e450i',
					'en:e500ii',
					'en:e503ii'
				],
				additives_tags: [
					'en:e322',
					'en:e322i',
					'en:e450',
					'en:e450i',
					'en:e500',
					'en:e500ii',
					'en:e503',
					'en:e503ii'
				],
				allergens: 'en:gluten,en:milk,en:nuts,en:soybeans',
				allergens_from_ingredients:
					'en:soybeans, en:gluten, en:gluten, en:gluten, en:milk, en:gluten, en:gluten, en:soybeans, en:milk, en:nuts, NOISETTES , NOISETTES , LAIT , SOJA, FROMENT , BLE, LACTOSE, BLE, LAIT , ORGE , ORGE , FROMENT, SOJA, NOISETTES, NOISETTES, LAIT, SOJA, FROMENT, BLE, LACTOSE, BLE, LAIT, ORGE, ORGE, FROMENT, SOJA',
				allergens_from_user:
					'(pt) en:gluten,en:milk,en:nuts,en:soybeans',
				allergens_hierarchy: [
					'en:gluten',
					'en:milk',
					'en:nuts',
					'en:soybeans'
				],
				allergens_imported:
					'Gluten, Lait, Fruits à coque, Soja, Gs1:T4078:ML',
				allergens_lc: 'pt',
				allergens_tags: [
					'en:gluten',
					'en:milk',
					'en:nuts',
					'en:soybeans'
				],
				amino_acids_prev_tags: [],
				amino_acids_tags: [],
				brands: 'Ferrero, Nutella',
				brands_imported: 'Nutella biscuits',
				brands_old: 'Nutella,Ferrero',
				brands_tags: ['ferrero', 'nutella'],
				carbon_footprint_from_known_ingredients_debug:
					'en:wheat-flour 32% x 1.2 = 38.4 g - en:cane-sugar 9% x 1.3 = 11.7 g - ',
				carbon_footprint_percent_of_known_ingredients: 41,
				categories: 'Biscoitos recheados',
				categories_hierarchy: [
					'en:snacks',
					'en:sweet-snacks',
					'en:biscuits-and-cakes',
					'en:biscuits-and-crackers',
					'en:biscuits',
					'en:filled-biscuits'
				],
				categories_lc: 'pt',
				categories_old:
					'Botanas,Snacks dulces,Galletas y pasteles,Galletas,Galletas rellenas',
				categories_properties: {
					'agribalyse_proxy_food_code:en': '24000'
				},
				categories_properties_tags: [
					'all-products',
					'categories-known',
					'agribalyse-food-code-unknown',
					'agribalyse-proxy-food-code-24000',
					'agribalyse-proxy-food-code-known',
					'ciqual-food-code-unknown',
					'agribalyse-known',
					'agribalyse-24000'
				],
				categories_tags: [
					'en:snacks',
					'en:sweet-snacks',
					'en:biscuits-and-cakes',
					'en:biscuits-and-crackers',
					'en:biscuits',
					'en:filled-biscuits'
				],
				category_properties: {},
				checkers_tags: ['telperion87'],
				ciqual_food_name_tags: ['unknown'],
				cities_tags: [],
				code: '8000500310427',
				codes_tags: [
					'code-13',
					'8000500310xxx',
					'800050031xxxx',
					'80005003xxxxx',
					'8000500xxxxxx',
					'800050xxxxxxx',
					'80005xxxxxxxx',
					'8000xxxxxxxxx',
					'800xxxxxxxxxx',
					'80xxxxxxxxxxx',
					'8xxxxxxxxxxxx'
				],
				compared_to_category: 'en:filled-biscuits',
				complete: 0,
				completeness: 0.9,
				conservation_conditions:
					"A conserver au sec et à l'abri de la chaleur. Ne pas mettre au réfrigérateur.",
				conservation_conditions_fr:
					"A conserver au sec et à l'abri de la chaleur. Ne pas mettre au réfrigérateur.",
				conservation_conditions_fr_imported:
					"A conserver au sec et à l'abri de la chaleur. Ne pas mettre au réfrigérateur.",
				correctors_tags: [
					'yuka.ZTc0d1M2UlFsOTR2c00wZSt4UGwvb2x3eksyWFRFZnBEZTB6SUE9PQ',
					'ferrero',
					'danbernfanck',
					'yuka.ZEtvL0x2US9vOThKa3NFNjd4Q01xK2d1N1pQMFgyaXJDdHNhSVE9PQ',
					'desan',
					'openfoodfacts-contributors',
					'yuka.U29JTEFmMDlpTXRSc3NJdytnbnM1OUFzNllDdGYzaWFMY000SUE9PQ',
					'mrhalal',
					'charlesnepote',
					'virginie0031',
					'scanbot',
					'sebleouf',
					'antonos65',
					'org-ferrero-france-commerciale',
					'swipe-studio',
					'thaialagata',
					'date-limite-app',
					'erleje',
					'inf',
					'gourmet',
					'cquest',
					'mathias83dxb',
					'grumpf',
					'driveoff',
					'packbot',
					'allergies-app-chakib',
					'citrullus28',
					'heuwerk',
					'loremily',
					'prepperapp',
					'ztoclo',
					'telperion87',
					'lalucarne',
					'tacite',
					'feat',
					'salma124',
					'chevalstar',
					'elcoco',
					'g123k',
					'mairoluin',
					'fpdsurveys',
					'cgfan749',
					'insectproductadd',
					'monalika9',
					'smoothie-app',
					'segundo',
					'maxtess',
					'quentinbrd',
					'gmlaa',
					'moon-rabbit',
					'moncoachigbas',
					'duhowpi',
					'showmaster',
					'professordoc',
					'maryvi',
					'october-food-facts',
					'intolerapp',
					'macrofactor',
					'alia',
					'foodless',
					'lucasoft'
				],
				countries:
					'França,Alemanha,Itália,Marrocos,Portugal,Roménia,Espanha,Suíça',
				countries_beforescanbot: 'France,Allemagne,Italie',
				countries_hierarchy: [
					'en:france',
					'en:germany',
					'en:italy',
					'en:morocco',
					'en:portugal',
					'en:romania',
					'en:spain',
					'en:switzerland'
				],
				countries_imported: 'France',
				countries_lc: 'pt',
				countries_tags: [
					'en:france',
					'en:germany',
					'en:italy',
					'en:morocco',
					'en:portugal',
					'en:romania',
					'en:spain',
					'en:switzerland'
				],
				created_t: 1548751374,
				creator: 'openfoodfacts-contributors',
				customer_service:
					'FERRERO FRANCE COMMERCIALE - Service Consommateurs, CS 90058 - 76136 MONT SAINT AIGNAN Cedex',
				customer_service_fr:
					'FERRERO FRANCE COMMERCIALE - Service Consommateurs, CS 90058 - 76136 MONT SAINT AIGNAN Cedex',
				customer_service_fr_imported:
					'FERRERO FRANCE COMMERCIALE - Service Consommateurs, CS 90058 - 76136 MONT SAINT AIGNAN Cedex',
				data_quality_bugs_tags: [],
				data_quality_errors_tags: [],
				data_quality_info_tags: [
					'en:packaging-data-incomplete',
					'en:carbon-footprint-from-known-ingredients-but-not-from-meat-or-fish',
					'en:environmental-score-extended-data-not-computed',
					'en:food-groups-1-known',
					'en:food-groups-2-known',
					'en:food-groups-3-unknown'
				],
				data_quality_tags: [
					'en:packaging-data-incomplete',
					'en:carbon-footprint-from-known-ingredients-but-not-from-meat-or-fish',
					'en:environmental-score-extended-data-not-computed',
					'en:food-groups-1-known',
					'en:food-groups-2-known',
					'en:food-groups-3-unknown',
					'en:ingredients-percent-analysis-not-ok',
					'en:environmental-score-origins-of-ingredients-origins-are-100-percent-unknown',
					'en:environmental-score-packaging-unspecified-material',
					'en:environmental-score-production-system-no-label'
				],
				data_quality_warnings_tags: [
					'en:ingredients-percent-analysis-not-ok',
					'en:environmental-score-origins-of-ingredients-origins-are-100-percent-unknown',
					'en:environmental-score-packaging-unspecified-material',
					'en:environmental-score-production-system-no-label'
				],
				data_sources:
					'Producer - Ferrero, Producers, App - off, App - yuka, Apps, Producer - ferrero-france-commerciale, Database - Equadis, Database - GDSN, Databases, App - Horizon, App - InFood, App - Open Food Facts, App - Speisekammer, App - smoothie-openfoodfacts, App - El CoCo, App - mon-coach-ig-bas, App - intolerapp, App - macrofactor',
				data_sources_imported:
					'Producers, Producer - ferrero-france-commerciale, Database - Equadis, Database - GDSN, Databases, Producers, Producer - ferrero-france-commerciale',
				data_sources_tags: [
					'producer-ferrero',
					'producers',
					'app-off',
					'app-yuka',
					'apps',
					'producer-ferrero-france-commerciale',
					'database-equadis',
					'database-gdsn',
					'databases',
					'app-horizon',
					'app-infood',
					'app-open-food-facts',
					'app-speisekammer',
					'app-smoothie-openfoodfacts',
					'app-el-coco',
					'app-mon-coach-ig-bas',
					'app-intolerapp',
					'app-macrofactor'
				],
				debug_param_sorted_langs: ['fr', 'de', 'it', 'pt', 'es'],
				ecoscore_data: {
					adjustments: {
						origins_of_ingredients: {
							aggregated_origins: [
								{
									epi_score: '0',
									origin: 'en:unknown',
									percent: 100,
									transportation_score: 0
								}
							],
							epi_score: 0,
							epi_value: -5,
							origins_from_categories: ['en:unknown'],
							origins_from_origins_field: ['en:unknown'],
							transportation_score: 0,
							transportation_scores: {
								ad: 0,
								al: 0,
								at: 0,
								ax: 0,
								ba: 0,
								be: 0,
								bg: 0,
								ch: 0,
								cy: 0,
								cz: 0,
								de: 0,
								dk: 0,
								dz: 0,
								ee: 0,
								eg: 0,
								es: 0,
								fi: 0,
								fo: 0,
								fr: 0,
								gg: 0,
								gi: 0,
								gr: 0,
								hr: 0,
								hu: 0,
								ie: 0,
								il: 0,
								im: 0,
								is: 0,
								it: 0,
								je: 0,
								lb: 0,
								li: 0,
								lt: 0,
								lu: 0,
								lv: 0,
								ly: 0,
								ma: 0,
								mc: 0,
								md: 0,
								me: 0,
								mk: 0,
								mt: 0,
								nl: 0,
								no: 0,
								pl: 0,
								ps: 0,
								pt: 0,
								ro: 0,
								rs: 0,
								se: 0,
								si: 0,
								sj: 0,
								sk: 0,
								sm: 0,
								sy: 0,
								tn: 0,
								tr: 0,
								ua: 0,
								uk: 0,
								us: 0,
								va: 0,
								world: 0,
								xk: 0
							},
							transportation_value: 0,
							transportation_values: {
								ad: 0,
								al: 0,
								at: 0,
								ax: 0,
								ba: 0,
								be: 0,
								bg: 0,
								ch: 0,
								cy: 0,
								cz: 0,
								de: 0,
								dk: 0,
								dz: 0,
								ee: 0,
								eg: 0,
								es: 0,
								fi: 0,
								fo: 0,
								fr: 0,
								gg: 0,
								gi: 0,
								gr: 0,
								hr: 0,
								hu: 0,
								ie: 0,
								il: 0,
								im: 0,
								is: 0,
								it: 0,
								je: 0,
								lb: 0,
								li: 0,
								lt: 0,
								lu: 0,
								lv: 0,
								ly: 0,
								ma: 0,
								mc: 0,
								md: 0,
								me: 0,
								mk: 0,
								mt: 0,
								nl: 0,
								no: 0,
								pl: 0,
								ps: 0,
								pt: 0,
								ro: 0,
								rs: 0,
								se: 0,
								si: 0,
								sj: 0,
								sk: 0,
								sm: 0,
								sy: 0,
								tn: 0,
								tr: 0,
								ua: 0,
								uk: 0,
								us: 0,
								va: 0,
								world: 0,
								xk: 0
							},
							value: -5,
							values: {
								ad: -5,
								al: -5,
								at: -5,
								ax: -5,
								ba: -5,
								be: -5,
								bg: -5,
								ch: -5,
								cy: -5,
								cz: -5,
								de: -5,
								dk: -5,
								dz: -5,
								ee: -5,
								eg: -5,
								es: -5,
								fi: -5,
								fo: -5,
								fr: -5,
								gg: -5,
								gi: -5,
								gr: -5,
								hr: -5,
								hu: -5,
								ie: -5,
								il: -5,
								im: -5,
								is: -5,
								it: -5,
								je: -5,
								lb: -5,
								li: -5,
								lt: -5,
								lu: -5,
								lv: -5,
								ly: -5,
								ma: -5,
								mc: -5,
								md: -5,
								me: -5,
								mk: -5,
								mt: -5,
								nl: -5,
								no: -5,
								pl: -5,
								ps: -5,
								pt: -5,
								ro: -5,
								rs: -5,
								se: -5,
								si: -5,
								sj: -5,
								sk: -5,
								sm: -5,
								sy: -5,
								tn: -5,
								tr: -5,
								ua: -5,
								uk: -5,
								us: -5,
								va: -5,
								world: -5,
								xk: -5
							},
							warning: 'origins_are_100_percent_unknown'
						},
						packaging: {
							non_recyclable_and_non_biodegradable_materials: 1,
							packagings: [
								{
									environmental_score_material_score: 0,
									environmental_score_shape_ratio: 1,
									material: 'en:o-7-other-plastics',
									non_recyclable_and_non_biodegradable: 'yes',
									number_of_units: '1',
									quantity_per_unit: '304 g',
									quantity_per_unit_unit: 'g',
									quantity_per_unit_value: '304',
									recycling: 'en:recycle',
									shape: 'en:bag',
									weight_measured: 10.8
								},
								{
									environmental_score_material_score: 0,
									environmental_score_shape_ratio: 0.1,
									material: 'en:unknown',
									shape: 'en:envelope'
								}
							],
							score: -10,
							value: -11,
							warning: 'unspecified_material'
						},
						production_system: {
							labels: [],
							value: 0,
							warning: 'no_label'
						},
						threatened_species: {
							ingredient: 'en:palm-oil',
							value: -10
						}
					},
					agribalyse: {
						agribalyse_proxy_food_code: '24000',
						co2_agriculture: 2.3635185,
						co2_consumption: 0,
						co2_distribution: 0.019437894,
						co2_packaging: 0.10986902,
						co2_processing: 0.22831584,
						co2_total: 2.856230424,
						co2_transportation: 0.13508917,
						code: '24000',
						dqr: '2.14',
						ef_agriculture: 0.27654213,
						ef_consumption: 0,
						ef_distribution: 0.0047895045,
						ef_packaging: 0.01090994,
						ef_processing: 0.04151582,
						ef_total: 0.3448030585,
						ef_transportation: 0.011045664,
						is_beverage: 0,
						name_en: 'Biscuit (cookie)',
						name_fr: 'Biscuit sec, sans précision',
						score: 70,
						version: '3.1.1'
					},
					grade: 'd',
					grades: {
						ad: 'd',
						al: 'd',
						at: 'd',
						ax: 'd',
						ba: 'd',
						be: 'd',
						bg: 'd',
						ch: 'd',
						cy: 'd',
						cz: 'd',
						de: 'd',
						dk: 'd',
						dz: 'd',
						ee: 'd',
						eg: 'd',
						es: 'd',
						fi: 'd',
						fo: 'd',
						fr: 'd',
						gg: 'd',
						gi: 'd',
						gr: 'd',
						hr: 'd',
						hu: 'd',
						ie: 'd',
						il: 'd',
						im: 'd',
						is: 'd',
						it: 'd',
						je: 'd',
						lb: 'd',
						li: 'd',
						lt: 'd',
						lu: 'd',
						lv: 'd',
						ly: 'd',
						ma: 'd',
						mc: 'd',
						md: 'd',
						me: 'd',
						mk: 'd',
						mt: 'd',
						nl: 'd',
						no: 'd',
						pl: 'd',
						ps: 'd',
						pt: 'd',
						ro: 'd',
						rs: 'd',
						se: 'd',
						si: 'd',
						sj: 'd',
						sk: 'd',
						sm: 'd',
						sy: 'd',
						tn: 'd',
						tr: 'd',
						ua: 'd',
						uk: 'd',
						us: 'd',
						va: 'd',
						world: 'd',
						xk: 'd'
					},
					missing: {
						labels: 1,
						origins: 1,
						packagings: 1
					},
					missing_data_warning: 1,
					previous_data: {
						agribalyse: {
							agribalyse_proxy_food_code: '24000',
							co2_agriculture: 3.8424243,
							co2_consumption: 0,
							co2_distribution: 0.029120657,
							co2_packaging: 0.10869536,
							co2_processing: 0.32913764,
							co2_total: 4.4447267,
							co2_transportation: 0.135384,
							code: '24000',
							dqr: '2.14',
							ef_agriculture: 0.36061354,
							ef_consumption: 0,
							ef_distribution: 0.0098990521,
							ef_packaging: 0.016471128,
							ef_processing: 0.051325736,
							ef_total: 0.44895118,
							ef_transportation: 0.010645482,
							is_beverage: 0,
							name_en: 'Biscuit (cookie)',
							name_fr: 'Biscuit sec, sans précision',
							score: 58
						},
						grade: 'd',
						score: 33
					},
					score: 44,
					scores: {
						ad: 44,
						al: 44,
						at: 44,
						ax: 44,
						ba: 44,
						be: 44,
						bg: 44,
						ch: 44,
						cy: 44,
						cz: 44,
						de: 44,
						dk: 44,
						dz: 44,
						ee: 44,
						eg: 44,
						es: 44,
						fi: 44,
						fo: 44,
						fr: 44,
						gg: 44,
						gi: 44,
						gr: 44,
						hr: 44,
						hu: 44,
						ie: 44,
						il: 44,
						im: 44,
						is: 44,
						it: 44,
						je: 44,
						lb: 44,
						li: 44,
						lt: 44,
						lu: 44,
						lv: 44,
						ly: 44,
						ma: 44,
						mc: 44,
						md: 44,
						me: 44,
						mk: 44,
						mt: 44,
						nl: 44,
						no: 44,
						pl: 44,
						ps: 44,
						pt: 44,
						ro: 44,
						rs: 44,
						se: 44,
						si: 44,
						sj: 44,
						sk: 44,
						sm: 44,
						sy: 44,
						tn: 44,
						tr: 44,
						ua: 44,
						uk: 44,
						us: 44,
						va: 44,
						world: 44,
						xk: 44
					},
					status: 'known'
				},
				ecoscore_grade: 'd',
				ecoscore_score: 44,
				ecoscore_tags: ['d'],
				editors_tags: [
					'alia',
					'allergies-app-chakib',
					'antonos65',
					'arlettepipard-gmail-com',
					'arrotino',
					'avdigital',
					'cgfan749',
					'charlesnepote',
					'chevalstar',
					'citrullus28',
					'cquest',
					'danbernfanck',
					'date-limite-app',
					'desan',
					'driveoff',
					'duhowpi',
					'ecoscore-impact-estimator',
					'elcoco',
					'erleje',
					'feat',
					'ferrero',
					'foodless',
					'foodvisor',
					'fpdsurveys',
					'g123k',
					'gmlaa',
					'gourmet',
					'grumpf',
					'heuwerk',
					'inf',
					'insectproductadd',
					'intolerapp',
					'kiliweb',
					'lalucarne',
					'loremily',
					'lucasoft',
					'macrofactor',
					'mairoluin',
					'maryvi',
					'mathias83dxb',
					'maxtess',
					'monalika9',
					'moncoachigbas',
					'moon-rabbit',
					'mrhalal',
					'october-food-facts',
					'openfoodfacts-contributors',
					'org-ferrero-france-commerciale',
					'packbot',
					'prepperapp',
					'professordoc',
					'pupuce78280',
					'quechoisir',
					'quentinbrd',
					'radek',
					'raphael0202',
					'roland5457',
					'salma124',
					'scanbot',
					'sebleouf',
					'segundo',
					'showmaster',
					'smoothie-app',
					'stephane',
					'swipe-studio',
					'tacite',
					'telperion87',
					'thaialagata',
					'virginie0031',
					'yuka.U29JTEFmMDlpTXRSc3NJdytnbnM1OUFzNllDdGYzaWFMY000SUE9PQ',
					'yuka.YTRzaExZWWNpdEF1cXNZZnd5UGt4L1Z6bDZhZ1dXeU1Mc002SUE9PQ',
					'yuka.ZEtvL0x2US9vOThKa3NFNjd4Q01xK2d1N1pQMFgyaXJDdHNhSVE9PQ',
					'yuka.ZTc0d1M2UlFsOTR2c00wZSt4UGwvb2x3eksyWFRFZnBEZTB6SUE9PQ',
					'ztoclo'
				],
				emb_codes: '',
				emb_codes_orig: '',
				emb_codes_tags: [],
				entry_dates_tags: ['2019-01-29', '2019-01', '2019'],
				environment_impact_level: '',
				environment_impact_level_tags: [],
				expiration_date: '19-10-2023',
				food_groups: 'en:biscuits-and-cakes',
				food_groups_tags: ['en:sugary-snacks', 'en:biscuits-and-cakes'],
				generic_name:
					'Biscuit fourré à la pâte à tartiner aux noisettes et au cacao Nutella®',
				generic_name_de: 'Kekse mit Nuss-Nougat-Creme-Füllung',
				generic_name_en: '',
				generic_name_es: '',
				generic_name_fr:
					'Biscuit fourré à la pâte à tartiner aux noisettes et au cacao Nutella®',
				generic_name_fr_imported:
					'Biscuit fourré à la pâte à tartiner aux noisettes et au cacao Nutella®',
				generic_name_it: '',
				generic_name_pl: '',
				generic_name_pt:
					'Bolachas recheadas de creme para barrar de avelãs e cacau NUTELLA®',
				generic_name_ro: '',
				grades: {},
				id: '8000500310427',
				image_front_small_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.200.jpg',
				image_front_thumb_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.100.jpg',
				image_front_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.400.jpg',
				image_ingredients_small_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.200.jpg',
				image_ingredients_thumb_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.100.jpg',
				image_ingredients_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.400.jpg',
				image_nutrition_small_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.200.jpg',
				image_nutrition_thumb_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.100.jpg',
				image_nutrition_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.400.jpg',
				image_packaging_small_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.200.jpg',
				image_packaging_thumb_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.100.jpg',
				image_packaging_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.400.jpg',
				image_small_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.200.jpg',
				image_thumb_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.100.jpg',
				image_url:
					'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.400.jpg',
				images: {
					'1': {
						sizes: {
							'100': {
								h: 100,
								w: 57
							},
							'400': {
								h: 400,
								w: 226
							},
							full: {
								h: 3179,
								w: 1800
							}
						},
						uploaded_t: 1548751374,
						uploader: 'openfoodfacts-contributors'
					},
					'2': {
						sizes: {
							'100': {
								h: 100,
								w: 49
							},
							'400': {
								h: 400,
								w: 194
							},
							full: {
								h: 3686,
								w: 1792
							}
						},
						uploaded_t: 1548751415,
						uploader: 'openfoodfacts-contributors'
					},
					'3': {
						sizes: {
							'100': {
								h: 100,
								w: 79
							},
							'400': {
								h: 400,
								w: 316
							},
							full: {
								h: 1200,
								w: 949
							}
						},
						uploaded_t: 1549700751,
						uploader: 'kiliweb'
					},
					'4': {
						sizes: {
							'100': {
								h: 62,
								w: 100
							},
							'400': {
								h: 248,
								w: 400
							},
							full: {
								h: 1200,
								w: 1937
							}
						},
						uploaded_t: 1549700752,
						uploader: 'kiliweb'
					},
					'5': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 4032,
								w: 3024
							}
						},
						uploaded_t: 1553781839,
						uploader: 'openfoodfacts-contributors'
					},
					'6': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 3302,
								w: 2477
							}
						},
						uploaded_t: 1556822709,
						uploader: 'openfoodfacts-contributors'
					},
					'7': {
						sizes: {
							'100': {
								h: 100,
								w: 80
							},
							'400': {
								h: 400,
								w: 320
							},
							full: {
								h: 2736,
								w: 2188
							}
						},
						uploaded_t: 1558118657,
						uploader: 'openfoodfacts-contributors'
					},
					'8': {
						sizes: {
							'100': {
								h: 57,
								w: 100
							},
							'400': {
								h: 229,
								w: 400
							},
							full: {
								h: 1730,
								w: 3024
							}
						},
						uploaded_t: 1558470807,
						uploader: 'openfoodfacts-contributors'
					},
					'9': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 4032,
								w: 3024
							}
						},
						uploaded_t: 1558470904,
						uploader: 'openfoodfacts-contributors'
					},
					'10': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 3226,
								w: 2420
							}
						},
						uploaded_t: 1558471108,
						uploader: 'openfoodfacts-contributors'
					},
					'11': {
						sizes: {
							'100': {
								h: 66,
								w: 100
							},
							'400': {
								h: 263,
								w: 400
							},
							full: {
								h: 1200,
								w: 1822
							}
						},
						uploaded_t: 1559465572,
						uploader: 'kiliweb'
					},
					'12': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 299
							},
							full: {
								h: 3959,
								w: 2957
							}
						},
						uploaded_t: 1561428982,
						uploader: 'openfoodfacts-contributors'
					},
					'13': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 4032,
								w: 3024
							}
						},
						uploaded_t: '1577733301',
						uploader: 'openfoodfacts-contributors'
					},
					'14': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 4032,
								w: 3024
							}
						},
						uploaded_t: '1577733340',
						uploader: 'openfoodfacts-contributors'
					},
					'15': {
						sizes: {
							'100': {
								h: 75,
								w: 100
							},
							'400': {
								h: 300,
								w: 400
							},
							full: {
								h: 3024,
								w: 4032
							}
						},
						uploaded_t: '1577733406',
						uploader: 'openfoodfacts-contributors'
					},
					'16': {
						sizes: {
							'100': {
								h: 100,
								w: 69
							},
							'400': {
								h: 400,
								w: 276
							},
							full: {
								h: 1200,
								w: 829
							}
						},
						uploaded_t: '1570024768',
						uploader: 'kiliweb'
					},
					'17': {
						sizes: {
							'100': {
								h: 100,
								w: 83
							},
							'400': {
								h: 400,
								w: 330
							},
							full: {
								h: 1200,
								w: 991
							}
						},
						uploaded_t: '1570024769',
						uploader: 'kiliweb'
					},
					'18': {
						sizes: {
							'100': {
								h: 100,
								w: 78
							},
							'400': {
								h: 400,
								w: 312
							},
							full: {
								h: 1200,
								w: 936
							}
						},
						uploaded_t: '1570118641',
						uploader: 'kiliweb'
					},
					'19': {
						sizes: {
							'100': {
								h: 100,
								w: 83
							},
							'400': {
								h: 400,
								w: 333
							},
							full: {
								h: 1200,
								w: 1000
							}
						},
						uploaded_t: '1570118642',
						uploader: 'kiliweb'
					},
					'20': {
						sizes: {
							'100': {
								h: 100,
								w: 71
							},
							'400': {
								h: 400,
								w: 285
							},
							full: {
								h: 4000,
								w: 2853
							}
						},
						uploaded_t: 1578772578,
						uploader: 'antonos65'
					},
					'21': {
						sizes: {
							'100': {
								h: 70,
								w: 100
							},
							'400': {
								h: 282,
								w: 400
							},
							full: {
								h: 1541,
								w: 2187
							}
						},
						uploaded_t: 1578772834,
						uploader: 'antonos65'
					},
					'22': {
						sizes: {
							'100': {
								h: 100,
								w: 77
							},
							'400': {
								h: 400,
								w: 307
							},
							full: {
								h: 3053,
								w: 2340
							}
						},
						uploaded_t: 1587748980,
						uploader: 'arrotino'
					},
					'23': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 3024,
								w: 3024
							}
						},
						uploaded_t: 1603029807,
						uploader: 'openfoodfacts-contributors'
					},
					'24': {
						sizes: {
							'100': {
								h: 100,
								w: 71
							},
							'400': {
								h: 400,
								w: 286
							},
							full: {
								h: 4134,
								w: 2953
							}
						},
						uploaded_t: 1606408311,
						uploader: 'org-ferrero-france-commerciale'
					},
					'25': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 1500,
								w: 1500
							}
						},
						uploaded_t: 1606408312,
						uploader: 'org-ferrero-france-commerciale'
					},
					'26': {
						sizes: {
							'100': {
								h: 100,
								w: 79
							},
							'400': {
								h: 400,
								w: 316
							},
							full: {
								h: 1266,
								w: 1000
							}
						},
						uploaded_t: 1610198112,
						uploader: 'date-limite-app'
					},
					'28': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 1500,
								w: 1500
							}
						},
						uploaded_t: 1612330648,
						uploader: 'org-ferrero-france-commerciale'
					},
					'29': {
						sizes: {
							'100': {
								h: 66,
								w: 100
							},
							'400': {
								h: 263,
								w: 400
							},
							full: {
								h: 786,
								w: 1197
							}
						},
						uploaded_t: 1612359241,
						uploader: 'roland5457'
					},
					'30': {
						sizes: {
							'100': {
								h: 38,
								w: 100
							},
							'400': {
								h: 154,
								w: 400
							},
							full: {
								h: 1551,
								w: 4032
							}
						},
						uploaded_t: 1621005613,
						uploader: 'openfoodfacts-contributors'
					},
					'33': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 4032,
								w: 3024
							}
						},
						uploaded_t: 1630495466,
						uploader: 'openfoodfacts-contributors'
					},
					'35': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 750,
								w: 750
							}
						},
						uploaded_t: 1641838875,
						uploader: 'grumpf'
					},
					'36': {
						sizes: {
							'100': {
								h: 35,
								w: 100
							},
							'400': {
								h: 141,
								w: 400
							},
							full: {
								h: 1233,
								w: 3500
							}
						},
						uploaded_t: 1642615585,
						uploader: 'openfoodfacts-contributors'
					},
					'37': {
						sizes: {
							'100': {
								h: 100,
								w: 56
							},
							'400': {
								h: 400,
								w: 225
							},
							full: {
								h: 4000,
								w: 2252
							}
						},
						uploaded_t: 1642615705,
						uploader: 'openfoodfacts-contributors'
					},
					'38': {
						sizes: {
							'100': {
								h: 84,
								w: 100
							},
							'400': {
								h: 337,
								w: 400
							},
							full: {
								h: 1897,
								w: 2252
							}
						},
						uploaded_t: 1642615867,
						uploader: 'openfoodfacts-contributors'
					},
					'39': {
						sizes: {
							'100': {
								h: 100,
								w: 81
							},
							'400': {
								h: 400,
								w: 325
							},
							full: {
								h: 3377,
								w: 2742
							}
						},
						uploaded_t: 1649086583,
						uploader: 'heuwerk'
					},
					'40': {
						sizes: {
							'100': {
								h: 25,
								w: 100
							},
							'400': {
								h: 100,
								w: 400
							},
							full: {
								h: 919,
								w: 3694
							}
						},
						uploaded_t: 1649086776,
						uploader: 'heuwerk'
					},
					'45': {
						sizes: {
							'100': {
								h: 62,
								w: 100
							},
							'400': {
								h: 247,
								w: 400
							},
							full: {
								h: 1418,
								w: 2294
							}
						},
						uploaded_t: 1654945782,
						uploader: 'openfoodfacts-contributors'
					},
					'46': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 640,
								w: 480
							}
						},
						uploaded_t: 1658053532,
						uploader: 'prepperapp'
					},
					'47': {
						sizes: {
							'100': {
								h: 52,
								w: 100
							},
							'400': {
								h: 209,
								w: 400
							},
							full: {
								h: 1206,
								w: 2308
							}
						},
						uploaded_t: 1659804750,
						uploader: 'ztoclo'
					},
					'48': {
						sizes: {
							'100': {
								h: 100,
								w: 93
							},
							'400': {
								h: 400,
								w: 371
							},
							full: {
								h: 3184,
								w: 2953
							}
						},
						uploaded_t: 1668058243,
						uploader: 'org-ferrero-france-commerciale'
					},
					'49': {
						sizes: {
							'100': {
								h: 100,
								w: 96
							},
							'400': {
								h: 400,
								w: 385
							},
							full: {
								h: 2554,
								w: 2456
							}
						},
						uploaded_t: 1668772652,
						uploader: 'telperion87'
					},
					'50': {
						sizes: {
							'100': {
								h: 100,
								w: 79
							},
							'400': {
								h: 400,
								w: 318
							},
							full: {
								h: 2690,
								w: 2136
							}
						},
						uploaded_t: 1679858954,
						uploader: 'smoothie-app'
					},
					'51': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 301
							},
							full: {
								h: 1064,
								w: 800
							}
						},
						uploaded_t: 1679954452,
						uploader: 'elcoco'
					},
					'52': {
						sizes: {
							'100': {
								h: 41,
								w: 100
							},
							'400': {
								h: 162,
								w: 400
							},
							full: {
								h: 877,
								w: 2160
							}
						},
						uploaded_t: 1680951684,
						uploader: 'mairoluin'
					},
					'53': {
						sizes: {
							'100': {
								h: 55,
								w: 100
							},
							'400': {
								h: 219,
								w: 400
							},
							full: {
								h: 1182,
								w: 2160
							}
						},
						uploaded_t: 1680951713,
						uploader: 'mairoluin'
					},
					'54': {
						sizes: {
							'100': {
								h: 92,
								w: 100
							},
							'400': {
								h: 368,
								w: 400
							},
							full: {
								h: 1033,
								w: 1123
							}
						},
						uploaded_t: 1680951737,
						uploader: 'mairoluin'
					},
					'55': {
						sizes: {
							'100': {
								h: 100,
								w: 89
							},
							'400': {
								h: 400,
								w: 357
							},
							full: {
								h: 2421,
								w: 2160
							}
						},
						uploaded_t: 1680951779,
						uploader: 'mairoluin'
					},
					'57': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 301
							},
							full: {
								h: 2177,
								w: 1639
							}
						},
						uploaded_t: 1683574187,
						uploader: 'cgfan749'
					},
					'58': {
						sizes: {
							'100': {
								h: 100,
								w: 56
							},
							'400': {
								h: 400,
								w: 225
							},
							full: {
								h: 1280,
								w: 720
							}
						},
						uploaded_t: 1684681399,
						uploader: 'insectproductadd'
					},
					'59': {
						sizes: {
							'100': {
								h: 100,
								w: 75
							},
							'400': {
								h: 400,
								w: 300
							},
							full: {
								h: 1440,
								w: 1080
							}
						},
						uploaded_t: 1688674939,
						uploader: 'smoothie-app'
					},
					'60': {
						sizes: {
							'100': {
								h: 49,
								w: 100
							},
							'400': {
								h: 195,
								w: 400
							},
							full: {
								h: 509,
								w: 1043
							}
						},
						uploaded_t: 1688758818,
						uploader: 'smoothie-app'
					},
					'61': {
						sizes: {
							'100': {
								h: 100,
								w: 60
							},
							'400': {
								h: 400,
								w: 239
							},
							full: {
								h: 1117,
								w: 668
							}
						},
						uploaded_t: 1688758822,
						uploader: 'smoothie-app'
					},
					'62': {
						sizes: {
							'100': {
								h: 100,
								w: 87
							},
							'400': {
								h: 400,
								w: 346
							},
							full: {
								h: 528,
								w: 457
							}
						},
						uploaded_t: 1688758826,
						uploader: 'smoothie-app'
					},
					'63': {
						sizes: {
							'100': {
								h: 100,
								w: 85
							},
							'400': {
								h: 400,
								w: 339
							},
							full: {
								h: 2437,
								w: 2068
							}
						},
						uploaded_t: 1703686542,
						uploader: 'radek'
					},
					'64': {
						sizes: {
							'100': {
								h: 46,
								w: 100
							},
							'400': {
								h: 183,
								w: 400
							},
							full: {
								h: 2112,
								w: 4608
							}
						},
						uploaded_t: 1703686572,
						uploader: 'radek'
					},
					'66': {
						sizes: {
							'100': {
								h: 100,
								w: 82
							},
							'400': {
								h: 400,
								w: 329
							},
							full: {
								h: 2385,
								w: 1964
							}
						},
						uploaded_t: 1706068531,
						uploader: 'org-ferrero-france-commerciale'
					},
					'67': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 4688,
								w: 4688
							}
						},
						uploaded_t: 1710475738,
						uploader: 'org-ferrero-france-commerciale'
					},
					'68': {
						sizes: {
							'100': {
								h: 100,
								w: 100
							},
							'400': {
								h: 400,
								w: 400
							},
							full: {
								h: 1500,
								w: 1500
							}
						},
						uploaded_t: 1715831903,
						uploader: 'org-ferrero-france-commerciale'
					},
					'69': {
						sizes: {
							'100': {
								h: 26,
								w: 100
							},
							'400': {
								h: 105,
								w: 400
							},
							full: {
								h: 835,
								w: 3167
							}
						},
						uploaded_t: 1719508922,
						uploader: 'showmaster'
					},
					'70': {
						sizes: {
							'100': {
								h: 100,
								w: 72
							},
							'400': {
								h: 400,
								w: 286
							},
							full: {
								h: 1600,
								w: 1144
							}
						},
						uploaded_t: 1720622860,
						uploader: 'prepperapp'
					},
					'71': {
						sizes: {
							'100': {
								h: 26,
								w: 100
							},
							'400': {
								h: 106,
								w: 400
							},
							full: {
								h: 422,
								w: 1600
							}
						},
						uploaded_t: 1720622863,
						uploader: 'prepperapp'
					},
					'72': {
						sizes: {
							'100': {
								h: 83,
								w: 100
							},
							'400': {
								h: 332,
								w: 400
							},
							full: {
								h: 970,
								w: 1167
							}
						},
						uploaded_t: 1720622867,
						uploader: 'prepperapp'
					},
					'73': {
						sizes: {
							'100': {
								h: 100,
								w: 80
							},
							'400': {
								h: 400,
								w: 321
							},
							full: {
								h: 3597,
								w: 2883
							}
						},
						uploaded_t: 1720901292,
						uploader: 'professordoc'
					},
					'74': {
						sizes: {
							'100': {
								h: 70,
								w: 100
							},
							'400': {
								h: 279,
								w: 400
							},
							full: {
								h: 2174,
								w: 3113
							}
						},
						uploaded_t: 1721584349,
						uploader: 'professordoc'
					},
					'75': {
						sizes: {
							'100': {
								h: 86,
								w: 100
							},
							'400': {
								h: 343,
								w: 400
							},
							full: {
								h: 1641,
								w: 1915
							}
						},
						uploaded_t: 1721584635,
						uploader: 'professordoc'
					},
					'76': {
						sizes: {
							'100': {
								h: 23,
								w: 100
							},
							'400': {
								h: 90,
								w: 400
							},
							full: {
								h: 918,
								w: 4068
							}
						},
						uploaded_t: 1721600152,
						uploader: 'professordoc'
					},
					'81': {
						sizes: {
							'100': {
								h: 100,
								w: 84
							},
							'400': {
								h: 400,
								w: 337
							},
							full: {
								h: 2539,
								w: 2140
							}
						},
						uploaded_t: 1725368032,
						uploader: 'maryvi'
					},
					'82': {
						sizes: {
							'100': {
								h: 74,
								w: 100
							},
							'400': {
								h: 297,
								w: 400
							},
							full: {
								h: 1352,
								w: 1818
							}
						},
						uploaded_t: 1725368041,
						uploader: 'maryvi'
					},
					'83': {
						sizes: {
							'100': {
								h: 76,
								w: 100
							},
							'400': {
								h: 305,
								w: 400
							},
							full: {
								h: 1415,
								w: 1856
							}
						},
						uploaded_t: 1725368049,
						uploader: 'maryvi'
					},
					'84': {
						sizes: {
							'100': {
								h: 100,
								w: 54
							},
							'400': {
								h: 400,
								w: 217
							},
							full: {
								h: 1628,
								w: 882
							}
						},
						uploaded_t: 1733774607,
						uploader: 'macrofactor'
					},
					'85': {
						sizes: {
							'100': {
								h: 88,
								w: 100
							},
							'400': {
								h: 351,
								w: 400
							},
							full: {
								h: 816,
								w: 930
							}
						},
						uploaded_t: 1733774613,
						uploader: 'macrofactor'
					},
					front_de: {
						angle: '0',
						coordinates_image_size: 'full',
						geometry: '0x0-0-0',
						imgid: '73',
						normalize: 'false',
						rev: '344',
						sizes: {
							'100': {
								h: 100,
								w: 80
							},
							'200': {
								h: 200,
								w: 160
							},
							'400': {
								h: 400,
								w: 321
							},
							full: {
								h: 3597,
								w: 2883
							}
						},
						white_magic: 'false',
						x1: '0',
						x2: '0',
						y1: '0',
						y2: '0'
					},
					front_fr: {
						angle: 0,
						coordinates_image_size: '400',
						geometry: '0x0--3--3',
						imgid: '25',
						normalize: 'false',
						rev: '356',
						sizes: {
							'100': {
								h: 100,
								w: 97
							},
							'200': {
								h: 200,
								w: 194
							},
							'400': {
								h: 400,
								w: 388
							},
							full: {
								h: 1419,
								w: 1376
							}
						},
						white_magic: 'false',
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					front_it: {
						angle: '0',
						coordinates_image_size: 'full',
						geometry: '886x1313-145-96',
						imgid: '59',
						normalize: 'false',
						rev: '346',
						sizes: {
							'100': {
								h: 100,
								w: 67
							},
							'200': {
								h: 200,
								w: 135
							},
							'400': {
								h: 400,
								w: 270
							},
							full: {
								h: 1313,
								w: 886
							}
						},
						white_magic: 'false',
						x1: '145.32000732421875',
						x2: '1031.4',
						y1: '96.89999084472656',
						y2: '1409.0999908447266'
					},
					front_pt: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '81',
						normalize: null,
						rev: '325',
						sizes: {
							'100': {
								h: 100,
								w: 84
							},
							'200': {
								h: 200,
								w: 169
							},
							'400': {
								h: 400,
								w: 337
							},
							full: {
								h: 2539,
								w: 2140
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					ingredients_de: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '76',
						normalize: null,
						rev: '323',
						sizes: {
							'100': {
								h: 23,
								w: 100
							},
							'200': {
								h: 45,
								w: 200
							},
							'400': {
								h: 90,
								w: 400
							},
							full: {
								h: 918,
								w: 4068
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					ingredients_fr: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '71',
						normalize: null,
						rev: '308',
						sizes: {
							'100': {
								h: 26,
								w: 100
							},
							'200': {
								h: 53,
								w: 200
							},
							'400': {
								h: 106,
								w: 400
							},
							full: {
								h: 422,
								w: 1600
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					ingredients_it: {
						angle: 0,
						geometry: '0x0--5--5',
						imgid: '21',
						normalize: null,
						rev: '48',
						sizes: {
							'100': {
								h: 70,
								w: 100
							},
							'200': {
								h: 141,
								w: 200
							},
							'400': {
								h: 282,
								w: 400
							},
							full: {
								h: 1541,
								w: 2187
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					ingredients_pt: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '82',
						normalize: null,
						rev: '327',
						sizes: {
							'100': {
								h: 74,
								w: 100
							},
							'200': {
								h: 149,
								w: 200
							},
							'400': {
								h: 297,
								w: 400
							},
							full: {
								h: 1352,
								w: 1818
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					nutrition_de: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '74',
						normalize: null,
						rev: '316',
						sizes: {
							'100': {
								h: 70,
								w: 100
							},
							'200': {
								h: 140,
								w: 200
							},
							'400': {
								h: 279,
								w: 400
							},
							full: {
								h: 2174,
								w: 3113
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					nutrition_fr: {
						angle: '0',
						coordinates_image_size: 'full',
						geometry: '0x0-0-0',
						imgid: '53',
						normalize: 'false',
						rev: '352',
						sizes: {
							'100': {
								h: 55,
								w: 100
							},
							'200': {
								h: 109,
								w: 200
							},
							'400': {
								h: 219,
								w: 400
							},
							full: {
								h: 1182,
								w: 2160
							}
						},
						white_magic: 'false',
						x1: '0',
						x2: '0',
						y1: '0',
						y2: '0'
					},
					nutrition_it: {
						angle: '0',
						coordinates_image_size: 'full',
						geometry: '1521x1163-239-2464',
						imgid: '12',
						normalize: 'false',
						rev: '182',
						sizes: {
							'100': {
								h: 76,
								w: 100
							},
							'200': {
								h: 153,
								w: 200
							},
							'400': {
								h: 306,
								w: 400
							},
							full: {
								h: 1163,
								w: 1521
							}
						},
						white_magic: 'false',
						x1: '239.48900676955094',
						x2: '1760.7108312119676',
						y1: '2464.376951496362',
						y2: '3627.4277382139335'
					},
					nutrition_pt: {
						angle: 0,
						coordinates_image_size: 'full',
						geometry: '0x0--1--1',
						imgid: '83',
						normalize: null,
						rev: '329',
						sizes: {
							'100': {
								h: 76,
								w: 100
							},
							'200': {
								h: 152,
								w: 200
							},
							'400': {
								h: 305,
								w: 400
							},
							full: {
								h: 1415,
								w: 1856
							}
						},
						white_magic: null,
						x1: '-1',
						x2: '-1',
						y1: '-1',
						y2: '-1'
					},
					packaging_fr: {
						angle: '270',
						coordinates_image_size: 'full',
						geometry: '0x0-0-0',
						imgid: '62',
						normalize: 'false',
						rev: '260',
						sizes: {
							'100': {
								h: 87,
								w: 100
							},
							'200': {
								h: 173,
								w: 200
							},
							'400': {
								h: 346,
								w: 400
							},
							full: {
								h: 457,
								w: 528
							}
						},
						white_magic: 'false',
						x1: '0',
						x2: '0',
						y1: '0',
						y2: '0'
					}
				},
				informers_tags: [
					'openfoodfacts-contributors',
					'yuka.ZTc0d1M2UlFsOTR2c00wZSt4UGwvb2x3eksyWFRFZnBEZTB6SUE9PQ',
					'kiliweb',
					'ferrero',
					'danbernfanck',
					'desan',
					'yuka.U29JTEFmMDlpTXRSc3NJdytnbnM1OUFzNllDdGYzaWFMY000SUE9PQ',
					'scanbot',
					'antonos65',
					'inf',
					'arrotino',
					'org-ferrero-france-commerciale',
					'thaialagata',
					'roland5457',
					'erleje',
					'grumpf',
					'citrullus28',
					'loremily',
					'ztoclo',
					'telperion87',
					'chevalstar',
					'smoothie-app',
					'elcoco',
					'g123k',
					'mairoluin',
					'cgfan749',
					'insectproductadd',
					'monalika9',
					'moncoachigbas',
					'radek',
					'showmaster',
					'maryvi',
					'october-food-facts',
					'professordoc',
					'avdigital',
					'alia',
					'macrofactor'
				],
				ingredients: [
					{
						id: 'en:hazelnut-spread',
						is_in_taxonomy: 1,
						percent_estimate: 50,
						rank: 1,
						text: 'Pâte à tartiner aux NOISETTES'
					},
					{
						ciqual_proxy_food_code: '18100',
						has_sub_ingredients: 'yes',
						id: 'en:cocoa',
						is_in_taxonomy: 1,
						percent: 40,
						percent_estimate: 40,
						rank: 2,
						text: 'au cacao',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_proxy_food_code: '9410',
						ecobalyse_code: 'a2e25aca-1f42-4bc8-bc0e-4d7c751775aa',
						id: 'en:wheat-flour',
						is_in_taxonomy: 1,
						percent: 32.5,
						percent_estimate: 10,
						rank: 3,
						text: 'farine de FROMENT',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						from_palm_oil: 'maybe',
						has_sub_ingredients: 'yes',
						id: 'en:vegetable-fat',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 4,
						text: 'graisses végétales',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_proxy_food_code: '31016',
						ecobalyse_code: '8f075c25-9ebf-430c-b41d-51d165c6e0d8',
						id: 'en:cane-sugar',
						is_in_taxonomy: 1,
						percent: 8.5,
						percent_estimate: 0,
						rank: 5,
						text: 'sucre de canne',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:lactose',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 6,
						text: 'LACTOSE',
						vegan: 'no',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '9621',
						id: 'en:wheat-bran',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 7,
						text: 'son de BLE',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_proxy_food_code: '19044',
						ecobalyse_code: 'b6776a28-ec84-4bf3-988c-07b3c29f6136',
						id: 'en:milk-powder',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 8,
						text: 'LAIT en poudre',
						vegan: 'no',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '31008',
						id: 'en:honey',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 9,
						text: 'miel',
						vegan: 'no',
						vegetarian: 'yes'
					},
					{
						has_sub_ingredients: 'yes',
						id: 'en:raising-agent',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 10,
						text: 'poudres à lever'
					},
					{
						ciqual_food_code: '9550',
						ecobalyse_code: 'a2e25aca-1f42-4bc8-bc0e-4d7c751775aa',
						id: 'en:barley-malt-flour',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 11,
						text: "farine d'ORGE malté",
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '18100',
						id: 'en:fat-reduced-cocoa-powder',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 12,
						text: 'cacao maigre en poudre',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '11058',
						id: 'en:salt',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 13,
						text: 'sel',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:malted-barley',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						processing: 'de:extrahiert,en:powder',
						rank: 14,
						text: "de malt d'ORGE",
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '9200',
						id: 'en:corn',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 15,
						text: 'de maïs',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_proxy_food_code: '9510',
						id: 'en:wheat-starch',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 16,
						text: 'amidon de FROMENT',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						has_sub_ingredients: 'yes',
						id: 'en:emulsifier',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 17,
						text: 'émulsifiants'
					},
					{
						id: 'en:vanillin',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						rank: 18,
						text: 'vanilline'
					},
					{
						ciqual_proxy_food_code: '31016',
						ecobalyse_code: '8f075c25-9ebf-430c-b41d-51d165c6e0d8',
						id: 'en:sugar',
						is_in_taxonomy: 1,
						percent_estimate: 20,
						text: 'sucre',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '16129',
						ecobalyse_code: '45658c32-66d9-4305-a34b-21d6a4cef89c',
						from_palm_oil: 'yes',
						id: 'en:palm-oil',
						is_in_taxonomy: 1,
						percent_estimate: 10,
						text: 'huile de palme',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '15004',
						ecobalyse_code: 'hazelnut-unshelled-non-eu',
						id: 'en:hazelnut',
						is_in_taxonomy: 1,
						percent: 13,
						percent_estimate: 10,
						text: 'NOISETTES',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '19054',
						ecobalyse_code: 'b6776a28-ec84-4bf3-988c-07b3c29f6136',
						id: 'en:skimmed-milk-powder',
						is_in_taxonomy: 1,
						percent: 8.7,
						percent_estimate: 0,
						text: 'LAIT écrémé en poudre',
						vegan: 'no',
						vegetarian: 'yes'
					},
					{
						ciqual_proxy_food_code: '18100',
						id: 'en:fat-reduced-cocoa',
						is_in_taxonomy: 1,
						percent: 7.4,
						percent_estimate: 0,
						text: 'cacao maigre',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						has_sub_ingredients: 'yes',
						id: 'en:emulsifier',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'émulsifiants'
					},
					{
						id: 'en:vanillin',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'vanilline'
					},
					{
						ciqual_food_code: '16129',
						ecobalyse_code: '45658c32-66d9-4305-a34b-21d6a4cef89c',
						from_palm_oil: 'yes',
						id: 'en:palm-oil',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'huile de palme',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						from_palm_oil: 'yes',
						id: 'en:palm-kernel-fat',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'huile de palmiste',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:e450i',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'diphosphate disodique',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:e500ii',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'carbonate acide de sodium',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						id: 'en:e503ii',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: "carbonate acide d'ammonium",
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						has_sub_ingredients: 'yes',
						id: 'en:e322',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'lécithines',
						vegan: 'maybe',
						vegetarian: 'maybe'
					},
					{
						has_sub_ingredients: 'yes',
						id: 'en:e322',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'lécithines',
						vegan: 'maybe',
						vegetarian: 'maybe'
					},
					{
						ciqual_food_code: '42200',
						id: 'en:soya-lecithin',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'lécithines de SOJA',
						vegan: 'yes',
						vegetarian: 'yes'
					},
					{
						ciqual_food_code: '42200',
						id: 'en:soya-lecithin',
						is_in_taxonomy: 1,
						percent_estimate: 0,
						text: 'lécithines de SOJA',
						vegan: 'yes',
						vegetarian: 'yes'
					}
				],
				ingredients_analysis: {
					'en:non-vegan': [
						'en:skimmed-milk-powder',
						'en:lactose',
						'en:milk-powder',
						'en:honey'
					],
					'en:palm-oil': [
						'en:palm-oil',
						'en:palm-oil',
						'en:palm-kernel-fat'
					],
					'en:vegan-status-unknown': [
						'en:hazelnut-spread',
						'en:vanillin',
						'en:vanillin'
					],
					'en:vegetarian-status-unknown': [
						'en:hazelnut-spread',
						'en:vanillin',
						'en:vanillin'
					]
				},
				ingredients_analysis_tags: [
					'en:palm-oil',
					'en:non-vegan',
					'en:vegetarian-status-unknown'
				],
				ingredients_debug: [
					'Pâte à tartiner aux _noisettes_ et au cacao 40% ',
					'(',
					'(',
					null,
					null,
					'sucre',
					',',
					null,
					null,
					null,
					' huile de palme',
					',',
					null,
					null,
					null,
					' _noisettes_ 13%',
					',',
					null,
					null,
					null,
					' _lait_ écrémé en poudre 8',
					',',
					null,
					null,
					null,
					'7%',
					',',
					null,
					null,
					null,
					' cacao maigre 7',
					',',
					null,
					null,
					null,
					'4%',
					',',
					null,
					null,
					null,
					' émulsifiants ',
					':',
					':',
					null,
					null,
					'  lécithines _soja_ ',
					';',
					';',
					null,
					null,
					' vanilline)',
					',',
					null,
					null,
					null,
					' farine de _froment_ 32%',
					',',
					null,
					null,
					null,
					' graisses végétales ',
					'(',
					'(',
					null,
					null,
					'palme',
					',',
					null,
					null,
					null,
					' palmiste)',
					',',
					null,
					null,
					null,
					' sucre de canne 9%',
					',',
					null,
					null,
					null,
					' _lactose_',
					',',
					null,
					null,
					null,
					' son de _blé_',
					',',
					null,
					null,
					null,
					' _lait_ en poudre',
					',',
					null,
					null,
					null,
					" extrait en poudre de malt d'orge et de maïs",
					',',
					null,
					null,
					null,
					' miel',
					',',
					null,
					null,
					null,
					' poudres à lever ',
					':',
					':',
					null,
					null,
					' ',
					'(',
					'(',
					null,
					null,
					'disphosfate disodique',
					',',
					null,
					null,
					null,
					" carbonate acide d'ammonium",
					',',
					null,
					null,
					null,
					' carbonate acide de sodium)',
					',',
					null,
					null,
					null,
					' cacao maigre',
					',',
					null,
					null,
					null,
					' sel',
					',',
					null,
					null,
					null,
					' amidon de _froment_',
					',',
					null,
					null,
					null,
					" farine d'_orge_ malté",
					',',
					null,
					null,
					null,
					' lécithines _soja_ ',
					';',
					';',
					null,
					null,
					' vanilline.'
				],
				ingredients_from_or_that_may_be_from_palm_oil_n: 1,
				ingredients_from_palm_oil_n: 1,
				ingredients_from_palm_oil_tags: ['huile-de-palme'],
				ingredients_hierarchy: [
					'en:hazelnut-spread',
					'en:cocoa',
					'en:plant',
					'en:wheat-flour',
					'en:cereal',
					'en:flour',
					'en:wheat',
					'en:cereal-flour',
					'en:vegetable-fat',
					'en:oil-and-fat',
					'en:vegetable-oil-and-fat',
					'en:cane-sugar',
					'en:added-sugar',
					'en:disaccharide',
					'en:sugar',
					'en:lactose',
					'en:wheat-bran',
					'en:milk-powder',
					'en:dairy',
					'en:honey',
					'en:raising-agent',
					'en:barley-malt-flour',
					'en:barley',
					'en:barley-flour',
					'en:fat-reduced-cocoa-powder',
					'en:cocoa-powder',
					'en:salt',
					'en:malted-barley',
					'en:malt',
					'en:corn',
					'en:wheat-starch',
					'en:starch',
					'en:emulsifier',
					'en:vanillin',
					'en:palm-oil',
					'en:palm-oil-and-fat',
					'en:hazelnut',
					'en:nut',
					'en:tree-nut',
					'en:skimmed-milk-powder',
					'en:fat-reduced-cocoa',
					'en:palm-kernel-fat',
					'en:palm-kernel-oil-and-fat',
					'en:e450i',
					'en:e450',
					'en:e500ii',
					'en:e500',
					'en:e503ii',
					'en:e503',
					'en:e322',
					'en:soya-lecithin',
					'en:e322i'
				],
				ingredients_ids_debug: [
					'pate-a-tartiner-aux-noisettes-et-au-cacao-40',
					'sucre',
					'huile-de-palme',
					'noisettes-13',
					'lait-ecreme-en-poudre-8',
					'7',
					'cacao-maigre-7',
					'4',
					'emulsifiants',
					'lecithines-soja',
					'vanilline',
					'farine-de-froment-32',
					'graisses-vegetales',
					'palme',
					'palmiste',
					'sucre-de-canne-9',
					'lactose',
					'son-de-ble',
					'lait-en-poudre',
					'extrait-en-poudre-de-malt-d-orge-et-de-mais',
					'miel',
					'poudres-a-lever',
					'disphosfate-disodique',
					'carbonate-acide-d-ammonium',
					'carbonate-acide-de-sodium',
					'cacao-maigre',
					'sel',
					'amidon-de-froment',
					'farine-d-orge-malte',
					'lecithines-soja',
					'vanilline'
				],
				ingredients_lc: 'fr',
				ingredients_n: 34,
				ingredients_n_tags: ['34', '31-40'],
				ingredients_non_nutritive_sweeteners_n: 0,
				ingredients_original_tags: [
					'en:hazelnut-spread',
					'en:cocoa',
					'en:wheat-flour',
					'en:vegetable-fat',
					'en:cane-sugar',
					'en:lactose',
					'en:wheat-bran',
					'en:milk-powder',
					'en:honey',
					'en:raising-agent',
					'en:barley-malt-flour',
					'en:fat-reduced-cocoa-powder',
					'en:salt',
					'en:malted-barley',
					'en:corn',
					'en:wheat-starch',
					'en:emulsifier',
					'en:vanillin',
					'en:sugar',
					'en:palm-oil',
					'en:hazelnut',
					'en:skimmed-milk-powder',
					'en:fat-reduced-cocoa',
					'en:emulsifier',
					'en:vanillin',
					'en:palm-oil',
					'en:palm-kernel-fat',
					'en:e450i',
					'en:e500ii',
					'en:e503ii',
					'en:e322',
					'en:e322',
					'en:soya-lecithin',
					'en:soya-lecithin'
				],
				ingredients_percent_analysis: -1,
				ingredients_sweeteners_n: 0,
				ingredients_tags: [
					'en:hazelnut-spread',
					'en:cocoa',
					'en:plant',
					'en:wheat-flour',
					'en:cereal',
					'en:flour',
					'en:wheat',
					'en:cereal-flour',
					'en:vegetable-fat',
					'en:oil-and-fat',
					'en:vegetable-oil-and-fat',
					'en:cane-sugar',
					'en:added-sugar',
					'en:disaccharide',
					'en:sugar',
					'en:lactose',
					'en:wheat-bran',
					'en:milk-powder',
					'en:dairy',
					'en:honey',
					'en:raising-agent',
					'en:barley-malt-flour',
					'en:barley',
					'en:barley-flour',
					'en:fat-reduced-cocoa-powder',
					'en:cocoa-powder',
					'en:salt',
					'en:malted-barley',
					'en:malt',
					'en:corn',
					'en:wheat-starch',
					'en:starch',
					'en:emulsifier',
					'en:vanillin',
					'en:palm-oil',
					'en:palm-oil-and-fat',
					'en:hazelnut',
					'en:nut',
					'en:tree-nut',
					'en:skimmed-milk-powder',
					'en:fat-reduced-cocoa',
					'en:palm-kernel-fat',
					'en:palm-kernel-oil-and-fat',
					'en:e450i',
					'en:e450',
					'en:e500ii',
					'en:e500',
					'en:e503ii',
					'en:e503',
					'en:e322',
					'en:soya-lecithin',
					'en:e322i'
				],
				ingredients_text:
					"Pâte à tartiner aux NOISETTES et au cacao 40% (sucre, huile de palme, NOISETTES 13%**, LAIT écrémé en poudre 8,7%**, cacao maigre 7,4%**, émulsifiants : lécithines [SOJA]; vanilline), farine de FROMENT 32,5%, graisses végétales (palme, palmiste), sucre de canne (contient BLE) 8,5%, LACTOSE, son de BLE, LAIT en poudre, miel, poudres à lever (diphosphate disodique, carbonate acide de sodium, carbonate acide d'ammonium), farine d'ORGE malté, cacao maigre en poudre, sel, extrait en poudre de malt d'ORGE et de maïs, amidon de FROMENT, émulsifiants: lécithines [SOJA]; vanilline.",
				ingredients_text_de:
					'Nuss-Nugat-Creme 40 % (Zucker, Palmöl, _HASELNÜSSE_ 13 %, _MAGERMILCHPULVER_ 8.7%, fettarmer Kakao 7,4 %, Emulgator Lecithine (_SOJA_), Vanillin), _WEIZENMEHL_ (32,5 %), pflanzliche Fette (Palm, Palmkern), Rohrzucker 8,5 % (enthält _WEIZEN_), _MILCHZUCKER_, _WEIZENKLEIE_, _VOLLMILCHPULVER_, _GERSTENMALZ_ - und Maisextraktpulver, Honig, Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, _WEIZENSTÄRKE_, _GERSTENMALZMEHL_, Emulgator Lecithine (_SOJA_), Vanillin',
				ingredients_text_de_ocr_1648897071:
					'Nuss-Nougat-Creme 40% (Zucker, Palmöl, _Haselnüsse_ 13%, _Magermilchpulver_ 8,7%, fettarmer Kakao 7,4%, Emulgator Lecithine (_Soja_), Vanillin), _Weizenmehl_ 32,5%, pflanzliche Fette (Palm, Palmkern), Rohrzucker 8,5% (enthält _Weizen_), _Milchzucker_, _Weizenkleie_, _Vollmilchpulver_, _Gerstenmalz_- und Maisextraktpulver, Honig, Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, _Weizenstärke_, _Gerstenmalzmehl_, Emulgator Lecithine (_Soja_), Vanillin',
				ingredients_text_de_ocr_1648897071_result:
					'Nuss-Nougat-Creme 40% (Zucker, Palmöl, _Haselnüsse_ 13%, _Magermilchpulver_ 8,7%, fettarmer Kakao 7,4%, Emulgator Lecithine (_Soja_), Vanillin), _Weizenmehl_ 32,5%, pflanzliche Fette (Palm, Palmkern), Rohrzucker 8,5% (enthält _Weizen_), _Milchzucker_, _Weizenkleie_, _Vollmilchpulver_, _Gerstenmalz_ - und Maisextraktpulver, Honig, Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, _Weizenstärke_, _Gerstenmalzmehl_, Emulgator Lecithine (_Soja_), Vanillin',
				ingredients_text_de_ocr_1648990410:
					'Kekse mit Nuss - Nugat- Creme - Füllung: Nuss-Nugat-Creme 40% (Zucker, Palmöl, HASELNÜSSE  Magermilchpulver, fettarmer Kakao, Emulgator Lecithine (S0JA), Vanillin, Weizenmehl, pflanzliche Fette ( Palm, Palmkern), Rohrzucker, Milchzucker, Weizenkleie, VOLLMILCHPULVER, GERSTENMALZ-und Maisextraktpulver, Honig. Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, Weizenstärke, Gerstenmalzmehl, Emulgator Lecithine (Soja), Vanillin',
				ingredients_text_de_ocr_1648990410_result:
					'Kekse mit Nuss - Nugat - Creme - Füllung: Nuss-Nugat-Creme 40% (Zucker, Palmöl, HASELNÜSSE  Magermilchpulver, fettarmer Kakao, Emulgator Lecithine (S0JA), Vanillin, Weizenmehl, pflanzliche Fette ( Palm, Palmkern), Rohrzucker, Milchzucker, Weizenkleie, VOLLMILCHPULVER, GERSTENMALZ-und Maisextraktpulver, Honig. Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, Weizenstärke, Gerstenmalzmehl, Emulgator Lecithine (Soja), Vanillin',
				ingredients_text_debug:
					"Pâte à tartiner aux _noisettes_ et au cacao 40% (sucre, huile de palme, _noisettes_ 13%, _lait_ écrémé en poudre 8,7%, cacao maigre 7,4%, émulsifiants :  lécithines _soja_ ; vanilline), farine de _froment_ 32%, graisses végétales (palme, palmiste), sucre de canne 9%, _lactose_, son de _blé_, _lait_ en poudre, extrait en poudre de malt d'orge et de maïs, miel, poudres à lever : (disphosfate disodique, carbonate acide d'ammonium, carbonate acide de sodium), cacao maigre, sel, amidon de _froment_, farine d'_orge_ malté, lécithines _soja_ ; vanilline.",
				ingredients_text_en: '',
				ingredients_text_es:
					'Crema de avellanas y cacao 40% (azúcar, manteca de palma, avellanas 13%, leche desnatada en polvo 8,7%, cacao desgrasado 7.4%, emulgentes (lecitinas (soja), vainillina), harina de trigo 32,5%, grasas vegetales (palma, palmiste), azúcar de caña 8,5% (trigo), lactosa, salvado de trigo, leche entera en polvo, extracto en polvo de malta de cebada y maíz, miel, gasificantes (difosfato disódico, carbonato ácido de sodio, carbonato ácido de amonio), cacao desgrasado, sal, almidón de trigo, harina de cebada, malteada, emulsionantes (lecitinas (soja), vainillina.',
				ingredients_text_fr:
					"Pâte à tartiner aux NOISETTES et au cacao 40% (sucre, huile de palme, NOISETTES 13%**, LAIT écrémé en poudre 8,7%**, cacao maigre 7,4%**, émulsifiants : lécithines [SOJA]; vanilline), farine de FROMENT 32,5%, graisses végétales (palme, palmiste), sucre de canne (contient BLE) 8,5%, LACTOSE, son de BLE, LAIT en poudre, miel, poudres à lever (diphosphate disodique, carbonate acide de sodium, carbonate acide d'ammonium), farine d'ORGE malté, cacao maigre en poudre, sel, extrait en poudre de malt d'ORGE et de maïs, amidon de FROMENT, émulsifiants: lécithines [SOJA]; vanilline.",
				ingredients_text_fr_imported:
					"Pâte à tartiner aux NOISETTES et au cacao 40% (sucre, huile de palme, NOISETTES 13%, LAIT écrémé en poudre 8,7%, cacao maigre 7,4%, émulsifiants : lécithines [SOJA] ; vanilline), farine de FROMENT 32%, graisses végétales (palme, palmiste), sucre de canne 8,5%, LACTOSE, son de BLE, LAIT en poudre, extrait en poudre de malt d'ORGE et de maïs, miel, poudres à lever (disphosphate disodique, carbonate acide d'ammonium, carbonate acide de sodium), cacao maigre, sel, amidon de FROMENT, farine d'ORGE malté, émulsifiants : lécithines [SOJA] ; vanilline.",
				ingredients_text_it:
					"crema alle NOCCIOLE e al cacao 40% (zucchero, olio di palma, NOCCIOLE 13%, LATTE Scremato in polvere 8.7%, cacao magro 7,4%, emulsionanti: lecitine (SOIA): vanillina), farina di FRUMENTO (32%), grassi vegetali (palma, palmisto), zucchero di canna (9%), LATTOSIO, crusca di FRUMENTO, LATTE intero in polvere, estratto in polvere di malto d'ORZO e mais, miele, agenti lievitanti (difosfato disodico. carbonato acido di ammonio, carbonato acido di sodio), cacao magro, sale, amido di FRUMENTO, farina di ORZO maltato, emulsionanti: lecitine (SOIA), vanillina.",
				ingredients_text_pl: '',
				ingredients_text_pt:
					'Creme para barrar de AVELAS e cacau 40% (açúcar, gordura de palma, AVELAS (13%), LEITE desnatado em pó (8,7%), cacau magro (7,4%), emulsionantes: lecitinas (SOJA), vanilina), farinha de TRIGO (32,5%), gorduras vegetais (palma, palmiste), açúcar de cana (contém TRIGO) (8,5%), LACTOSE, farelo de TRIGO, LEITE inteiro em pó, mel, levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio, hidrogenocarbonato de amónio), farinha de CEVADA maltada, cacau magro, sal, extrato em pó de malte de CEVADA e milho, amido de TRIGO, emulsionantes: lecitinas (SOJA), vanilina.',
				ingredients_text_ro: '',
				ingredients_text_with_allergens:
					'Pâte à tartiner aux <span class="allergen">NOISETTES</span> </span>et au cacao 40% (sucre, huile de palme, <span class="allergen">NOISETTES</span> </span>13%**, <span class="allergen">LAIT</span> </span>écrémé en poudre 8,7%**, cacao maigre 7,4%**, émulsifiants : lécithines [<span class="allergen">SOJA</span>]; vanilline), farine de <span class="allergen">FROMENT</span> </span>32,5%, graisses végétales (palme, palmiste), sucre de canne (contient <span class="allergen">BLE</span>) 8,5%, <span class="allergen">LACTOSE</span>, son de <span class="allergen">BLE</span>, <span class="allergen">LAIT</span> </span>en poudre, miel, poudres à lever (diphosphate disodique, carbonate acide de sodium, carbonate acide d\'ammonium), farine d\'<span class="allergen">ORGE</span> </span>malté, cacao maigre en poudre, sel, extrait en poudre de malt d\'<span class="allergen">ORGE</span> </span>et de maïs, amidon de <span class="allergen">FROMENT</span>, émulsifiants: lécithines [<span class="allergen">SOJA</span>]; vanilline.',
				ingredients_text_with_allergens_de:
					'Nuss-Nugat-Creme 40 % (Zucker, Palmöl, <span class="allergen">HASELNÜSSE</span> 13 %, <span class="allergen">MAGERMILCHPULVER</span> 8.7%, fettarmer Kakao 7,4 %, Emulgator Lecithine (<span class="allergen">SOJA</span>), Vanillin), <span class="allergen">WEIZENMEHL</span> (32,5 %), pflanzliche Fette (Palm, Palmkern), Rohrzucker 8,5 % (enthält <span class="allergen">WEIZEN</span>), <span class="allergen">MILCHZUCKER</span>, <span class="allergen">WEIZENKLEIE</span>, <span class="allergen">VOLLMILCHPULVER</span>, <span class="allergen">GERSTENMALZ</span> - und Maisextraktpulver, Honig, Backtriebmittel: Dinatriumdiphosphat, Natriumhydrogencarbonat, Ammoniumhydrogencarbonat; fettarmer Kakao, Salz, <span class="allergen">WEIZENSTÄRKE</span>, <span class="allergen">GERSTENMALZMEHL</span>, Emulgator Lecithine (<span class="allergen">SOJA</span>), Vanillin',
				ingredients_text_with_allergens_es:
					'Crema de avellanas y cacao 40% (azúcar, manteca de palma, <span class="allergen">avellanas</span> 13%, leche desnatada en polvo 8,7%, cacao desgrasado 7.4%, emulgentes (lecitinas (<span class="allergen">soja</span>), vainillina), <span class="allergen">harina de trigo</span> 32,5%, grasas vegetales (palma, palmiste), azúcar de caña 8,5% (<span class="allergen">trigo</span>), <span class="allergen">lactosa</span>, salvado de trigo, leche entera en polvo, extracto en polvo de malta de cebada y maíz, miel, gasificantes (difosfato disódico, carbonato ácido de sodio, carbonato ácido de amonio), cacao desgrasado, sal, almidón de trigo, harina de cebada, malteada, emulsionantes (lecitinas (<span class="allergen">soja</span>), vainillina.',
				ingredients_text_with_allergens_fr:
					'Pâte à tartiner aux <span class="allergen">NOISETTES</span> </span>et au cacao 40% (sucre, huile de palme, <span class="allergen">NOISETTES</span> </span>13%**, <span class="allergen">LAIT</span> </span>écrémé en poudre 8,7%**, cacao maigre 7,4%**, émulsifiants : lécithines [<span class="allergen">SOJA</span>]; vanilline), farine de <span class="allergen">FROMENT</span> </span>32,5%, graisses végétales (palme, palmiste), sucre de canne (contient <span class="allergen">BLE</span>) 8,5%, <span class="allergen">LACTOSE</span>, son de <span class="allergen">BLE</span>, <span class="allergen">LAIT</span> </span>en poudre, miel, poudres à lever (diphosphate disodique, carbonate acide de sodium, carbonate acide d\'ammonium), farine d\'<span class="allergen">ORGE</span> </span>malté, cacao maigre en poudre, sel, extrait en poudre de malt d\'<span class="allergen">ORGE</span> </span>et de maïs, amidon de <span class="allergen">FROMENT</span>, émulsifiants: lécithines [<span class="allergen">SOJA</span>]; vanilline.',
				ingredients_text_with_allergens_it:
					'crema alle <span class="allergen">NOCCIOLE</span> </span>e al cacao 40% (zucchero, olio di palma, <span class="allergen">NOCCIOLE</span> </span>13%, <span class="allergen">LATTE</span> </span>Scremato in polvere 8.7%, cacao magro 7,4%, emulsionanti: lecitine (<span class="allergen">SOIA</span>): vanillina), farina di <span class="allergen">FRUMENTO</span> (32%), grassi vegetali (palma, palmisto), zucchero di canna (9%), <span class="allergen">LATTOSIO</span>, crusca di <span class="allergen">FRUMENTO</span>, <span class="allergen">LATTE</span> </span>intero in polvere, estratto in polvere di malto d\'<span class="allergen">ORZO</span> </span>e mais, miele, agenti lievitanti (difosfato disodico. carbonato acido di ammonio, carbonato acido di sodio), cacao magro, sale, amido di <span class="allergen">FRUMENTO</span>, farina di <span class="allergen">ORZO</span> </span>maltato, emulsionanti: lecitine (<span class="allergen">SOIA</span>), vanillina.',
				ingredients_text_with_allergens_pt:
					'Creme para barrar de <span class="allergen">AVELAS</span> </span>e cacau 40% (açúcar, gordura de palma, <span class="allergen">AVELAS</span> (13%), <span class="allergen">LEITE</span> </span>desnatado em pó (8,7%), cacau magro (7,4%), emulsionantes: lecitinas (<span class="allergen">SOJA</span>), vanilina), farinha de <span class="allergen">TRIGO</span> (32,5%), gorduras vegetais (palma, palmiste), açúcar de cana (contém <span class="allergen">TRIGO</span>) (8,5%), <span class="allergen">LACTOSE</span>, farelo de <span class="allergen">TRIGO</span>, <span class="allergen">LEITE</span> </span>inteiro em pó, mel, levedantes químicos (difosfato dissódico, hidrogenocarbonato de sódio, hidrogenocarbonato de amónio), farinha de <span class="allergen">CEVADA</span> </span>maltada, cacau magro, sal, extrato em pó de malte de <span class="allergen">CEVADA</span> </span>e milho, amido de <span class="allergen">TRIGO</span>, emulsionantes: lecitinas (<span class="allergen">SOJA</span>), vanilina.',
				ingredients_that_may_be_from_palm_oil_n: 0,
				ingredients_that_may_be_from_palm_oil_tags: [],
				ingredients_with_specified_percent_n: 5,
				ingredients_with_specified_percent_sum: 70.1,
				ingredients_with_unspecified_percent_n: 22,
				ingredients_with_unspecified_percent_sum: 80,
				ingredients_without_ciqual_codes: [
					'en:e322',
					'en:e450i',
					'en:e500ii',
					'en:e503ii',
					'en:emulsifier',
					'en:hazelnut-spread',
					'en:lactose',
					'en:malted-barley',
					'en:palm-kernel-fat',
					'en:raising-agent',
					'en:vanillin',
					'en:vegetable-fat'
				],
				ingredients_without_ciqual_codes_n: 12,
				ingredients_without_ecobalyse_ids: [
					'en:cocoa',
					'en:corn',
					'en:e322',
					'en:e450i',
					'en:e500ii',
					'en:e503ii',
					'en:emulsifier',
					'en:fat-reduced-cocoa',
					'en:fat-reduced-cocoa-powder',
					'en:hazelnut-spread',
					'en:honey',
					'en:lactose',
					'en:malted-barley',
					'en:palm-kernel-fat',
					'en:raising-agent',
					'en:salt',
					'en:soya-lecithin',
					'en:vanillin',
					'en:vegetable-fat',
					'en:wheat-bran',
					'en:wheat-starch'
				],
				ingredients_without_ecobalyse_ids_n: 21,
				interface_version_created: '20120622',
				interface_version_modified: '20150316.jqm2',
				known_ingredients_n: 34,
				labels: 'Ponto Verde',
				labels_hierarchy: ['en:green-dot'],
				labels_lc: 'pt',
				labels_old: '',
				labels_tags: ['en:green-dot'],
				lang: 'fr',
				lang_imported: 'fr',
				languages: {
					'en:french': 9,
					'en:german': 6,
					'en:italian': 5,
					'en:portuguese': 6,
					'en:spanish': 1
				},
				languages_codes: {
					de: 6,
					es: 1,
					fr: 9,
					it: 5,
					pt: 6
				},
				languages_hierarchy: [
					'en:french',
					'en:german',
					'en:italian',
					'en:portuguese',
					'en:spanish'
				],
				languages_tags: [
					'en:french',
					'en:german',
					'en:italian',
					'en:portuguese',
					'en:spanish',
					'en:5',
					'en:multilingual'
				],
				last_edit_dates_tags: ['2025-04-15', '2025-04', '2025'],
				last_editor: 'org-ferrero-france-commerciale',
				last_image_dates_tags: ['2024-12-09', '2024-12', '2024'],
				last_image_t: 1733774614,
				last_modified_by: 'org-ferrero-france-commerciale',
				last_modified_t: 1744689443,
				last_updated_t: 1744689443,
				lc: 'fr',
				lc_imported: 'fr',
				link: 'https://www.nutella.com/de/de/produkte/nutella-biscuits',
				main_countries_tags: [],
				manufacturing_places: '',
				manufacturing_places_tags: [],
				max_imgid: '85',
				minerals_prev_tags: [],
				minerals_tags: [],
				misc_tags: [
					'en:at-least-5-ingredients-with-specified-percent',
					'en:environmental-score-changed',
					'en:environmental-score-computed',
					'en:environmental-score-missing-data-labels',
					'en:environmental-score-missing-data-origins',
					'en:environmental-score-missing-data-packagings',
					'en:environmental-score-missing-data-warning',
					'en:nutriscore-2021-e-2023-e',
					'en:nutriscore-2021-same-as-2023',
					'en:nutriscore-computed',
					'en:nutrition-fruits-vegetables-legumes-estimate-from-ingredients',
					'en:nutrition-fruits-vegetables-nuts-estimate-from-ingredients',
					'en:nutrition-no-fiber',
					'en:nutrition-no-fiber-or-fruits-vegetables-nuts',
					'en:packagings-complete',
					'en:packagings-not-empty',
					'en:packagings-number-of-components-2',
					'en:packagings-with-some-but-not-all-weights',
					'en:packagings-with-weights',
					'en:some-ingredients-with-specified-percent',
					'en:main-countries-ma-unexpectedly-low-scans',
					'en:main-countries-ma-unexpectedly-low-scans-10-20-percent-of-expected',
					'en:main-countries-ro-product-name-not-in-country-language',
					'en:main-countries-ro-ingredients-not-in-country-language',
					'en:main-countries-ro-no-data-in-country-language',
					'en:main-countries-es-product-name-not-in-country-language',
					'en:main-countries-es-only-1-field-in-country-language'
				],
				no_nutrition_data: '',
				no_nutrition_data_imported: 'false',
				nova_group: 4,
				nova_group_debug: '',
				nova_groups: '4',
				nova_groups_markers: {
					'3': [
						['ingredients', 'en:honey'],
						['ingredients', 'en:salt'],
						['ingredients', 'en:starch'],
						['ingredients', 'en:sugar'],
						['ingredients', 'en:vegetable-fat'],
						['categories', 'en:sweet-snacks'],
						['ingredients', 'en:milk-powder']
					],
					'4': [
						['additives', 'en:e322'],
						['additives', 'en:e450'],
						['ingredients', 'en:emulsifier'],
						['ingredients', 'en:lactose']
					]
				},
				nova_groups_tags: [
					'en:4-ultra-processed-food-and-drink-products'
				],
				nucleotides_prev_tags: [],
				nucleotides_tags: [],
				nutrient_levels: {
					fat: 'high',
					salt: 'moderate',
					'saturated-fat': 'high',
					sugars: 'high'
				},
				nutrient_levels_tags: [
					'en:fat-in-high-quantity',
					'en:saturated-fat-in-high-quantity',
					'en:sugars-in-high-quantity',
					'en:salt-in-moderate-quantity'
				],
				nutriments: {
					carbohydrates: 64,
					carbohydrates_100g: 64,
					carbohydrates_serving: 8.83,
					carbohydrates_unit: 'g',
					carbohydrates_value: 64,
					'carbon-footprint-from-known-ingredients_100g': 50.1,
					'carbon-footprint-from-known-ingredients_product': 152,
					'carbon-footprint-from-known-ingredients_serving': 6.91,
					energy: 2158,
					'energy-kcal': 515,
					'energy-kcal_100g': 515,
					'energy-kcal_serving': 71.1,
					'energy-kcal_unit': 'kcal',
					'energy-kcal_value': 515,
					'energy-kcal_value_computed': 510.8,
					'energy-kj': 2158,
					'energy-kj_100g': 2158,
					'energy-kj_serving': 298,
					'energy-kj_unit': 'kJ',
					'energy-kj_value': 2158,
					'energy-kj_value_computed': 2139.9,
					energy_100g: 2158,
					energy_serving: 298,
					energy_unit: 'kJ',
					energy_value: 2158,
					fat: 24.8,
					fat_100g: 24.8,
					fat_serving: 3.42,
					fat_unit: 'g',
					fat_value: 24.8,
					'fruits-vegetables-legumes-estimate-from-ingredients_100g': 0,
					'fruits-vegetables-legumes-estimate-from-ingredients_serving': 0,
					'fruits-vegetables-nuts-estimate-from-ingredients_100g': 13,
					'fruits-vegetables-nuts-estimate-from-ingredients_serving': 13,
					'nova-group': 4,
					'nova-group_100g': 4,
					'nova-group_serving': 4,
					'nutrition-score-fr': 28,
					'nutrition-score-fr_100g': 28,
					proteins: 7.9,
					proteins_100g: 7.9,
					proteins_serving: 1.09,
					proteins_unit: 'g',
					proteins_value: 7.9,
					salt: 0.559,
					salt_100g: 0.559,
					salt_serving: 0.0771,
					salt_unit: 'g',
					salt_value: 0.559,
					'saturated-fat': 11.5,
					'saturated-fat_100g': 11.5,
					'saturated-fat_serving': 1.59,
					'saturated-fat_unit': 'g',
					'saturated-fat_value': 11.5,
					sodium: 0.2236,
					sodium_100g: 0.2236,
					sodium_serving: 0.0309,
					sodium_unit: 'g',
					sodium_value: 0.2236,
					sugars: 35.8,
					sugars_100g: 35.8,
					sugars_serving: 4.94,
					sugars_unit: 'g',
					sugars_value: 35.8
				},
				nutriscore: {
					'2021': {
						category_available: 1,
						data: {
							energy: 2158,
							energy_points: 6,
							energy_value: 2158,
							fiber: 0,
							fiber_points: 0,
							fiber_value: 0,
							fruits_vegetables_nuts_colza_walnut_olive_oils: 13,
							fruits_vegetables_nuts_colza_walnut_olive_oils_points: 0,
							fruits_vegetables_nuts_colza_walnut_olive_oils_value: 13,
							is_beverage: 0,
							is_cheese: 0,
							is_fat: 0,
							is_water: 0,
							negative_points: 25,
							positive_points: 0,
							proteins: 7.9,
							proteins_points: 4,
							proteins_value: 7.9,
							saturated_fat: 11.5,
							saturated_fat_points: 10,
							saturated_fat_value: 11.5,
							sodium: 223.6,
							sodium_points: 2,
							sodium_value: 223.6,
							sugars: 35.8,
							sugars_points: 7,
							sugars_value: 35.8
						},
						grade: 'e',
						nutrients_available: 1,
						nutriscore_applicable: 1,
						nutriscore_computed: 1,
						score: 25
					},
					'2023': {
						category_available: 1,
						data: {
							components: {
								negative: [
									{
										id: 'energy',
										points: 6,
										points_max: 10,
										unit: 'kJ',
										value: 2158
									},
									{
										id: 'sugars',
										points: 10,
										points_max: 15,
										unit: 'g',
										value: 35.8
									},
									{
										id: 'saturated_fat',
										points: 10,
										points_max: 10,
										unit: 'g',
										value: 11.5
									},
									{
										id: 'salt',
										points: 2,
										points_max: 20,
										unit: 'g',
										value: 0.56
									}
								],
								positive: [
									{
										id: 'fiber',
										points: 0,
										points_max: 5,
										unit: 'g',
										value: null
									},
									{
										id: 'fruits_vegetables_legumes',
										points: 0,
										points_max: 5,
										unit: '%',
										value: 0
									}
								]
							},
							count_proteins: 0,
							count_proteins_reason:
								'negative_points_greater_than_or_equal_to_11',
							is_beverage: 0,
							is_cheese: 0,
							is_fat_oil_nuts_seeds: 0,
							is_red_meat_product: 0,
							is_water: 0,
							negative_points: 28,
							negative_points_max: 55,
							positive_nutrients: [
								'fiber',
								'fruits_vegetables_legumes'
							],
							positive_points: 0,
							positive_points_max: 10
						},
						grade: 'e',
						nutrients_available: 1,
						nutriscore_applicable: 1,
						nutriscore_computed: 1,
						score: 28
					}
				},
				nutriscore_2021_tags: ['e'],
				nutriscore_2023_tags: ['e'],
				nutriscore_data: {
					components: {
						negative: [
							{
								id: 'energy',
								points: 6,
								points_max: 10,
								unit: 'kJ',
								value: 2158
							},
							{
								id: 'sugars',
								points: 10,
								points_max: 15,
								unit: 'g',
								value: 35.8
							},
							{
								id: 'saturated_fat',
								points: 10,
								points_max: 10,
								unit: 'g',
								value: 11.5
							},
							{
								id: 'salt',
								points: 2,
								points_max: 20,
								unit: 'g',
								value: 0.56
							}
						],
						positive: [
							{
								id: 'fiber',
								points: 0,
								points_max: 5,
								unit: 'g',
								value: null
							},
							{
								id: 'fruits_vegetables_legumes',
								points: 0,
								points_max: 5,
								unit: '%',
								value: 0
							}
						]
					},
					count_proteins: 0,
					count_proteins_reason:
						'negative_points_greater_than_or_equal_to_11',
					grade: 'e',
					is_beverage: 0,
					is_cheese: 0,
					is_fat_oil_nuts_seeds: 0,
					is_red_meat_product: 0,
					is_water: 0,
					negative_points: 28,
					negative_points_max: 55,
					positive_nutrients: ['fiber', 'fruits_vegetables_legumes'],
					positive_points: 0,
					positive_points_max: 10,
					score: 28
				},
				nutriscore_grade: 'e',
				nutriscore_score: 28,
				nutriscore_score_opposite: -28,
				nutriscore_tags: ['e'],
				nutriscore_version: '2023',
				nutrition_data: 'on',
				nutrition_data_per: '100g',
				nutrition_data_per_imported: '100g',
				nutrition_data_prepared: '',
				nutrition_data_prepared_per: '100g',
				nutrition_grade_fr: 'e',
				nutrition_grades: 'e',
				nutrition_grades_tags: ['e'],
				nutrition_score_beverage: 0,
				nutrition_score_debug: '',
				nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: 1,
				nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: 0,
				nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: 1,
				nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: 13,
				nutrition_score_warning_no_fiber: 1,
				obsolete: '',
				obsolete_imported: '0',
				obsolete_since_date: '',
				origin: '',
				origin_de: '',
				origin_en: '',
				origin_es: '',
				origin_fr: '',
				origin_it: '',
				origin_pl: '',
				origin_pt: '',
				origin_ro: '',
				origins: '',
				origins_hierarchy: [],
				origins_lc: 'pt',
				origins_old: '',
				origins_tags: [],
				other_nutritional_substances_prev_tags: [],
				other_nutritional_substances_tags: [],
				owner: 'org-ferrero-france-commerciale',
				owner_fields: {
					abbreviated_product_name_fr: 1744689415,
					allergens: 1744689415,
					brands: 1744689415,
					carbohydrates: 1744689415,
					conservation_conditions_fr: 1744689415,
					countries: 1744689415,
					customer_service_fr: 1744689415,
					data_sources: 1744689415,
					energy: 1612330240,
					'energy-kcal': 1744689415,
					'energy-kj': 1744689415,
					fat: 1744689415,
					generic_name_fr: 1744689415,
					ingredients_text_fr: 1744689415,
					lang: 1744689415,
					lc: 1744689415,
					no_nutrition_data: 1744689415,
					nutrition_data_per: 1744689415,
					obsolete: 1744689415,
					owner: 1744689415,
					packaging: 1744689415,
					producer_version_id: 1744689415,
					product_name_fr: 1744689415,
					proteins: 1744689415,
					quantity: 1744689415,
					salt: 1744689415,
					'saturated-fat': 1744689415,
					serving_size: 1744689415,
					sodium: 1744689415,
					sugars: 1744689415
				},
				owner_imported: 'org-ferrero-france-commerciale',
				owners_tags: 'org-ferrero-france-commerciale',
				packaging: 'Plastique,O 7 - Autres plastiques',
				packaging_hierarchy: ['en:plastic', 'en:o-7-other-plastics'],
				packaging_imported: 'Enveloppe',
				packaging_lc: 'fr',
				packaging_materials_tags: ['en:o-7-other-plastics'],
				packaging_old: 'Plastic, Envelope, Mixed plastic-packet',
				packaging_old_before_taxonomization:
					'Plastique,en:mixed plastic-packet,Enveloppe',
				packaging_recycling_tags: ['en:recycle'],
				packaging_shapes_tags: ['en:bag', 'en:envelope'],
				packaging_tags: ['en:plastic', 'en:o-7-other-plastics'],
				packaging_text: '',
				packaging_text_de: '',
				packaging_text_en: '',
				packaging_text_es: '',
				packaging_text_fr: '',
				packaging_text_it: '',
				packaging_text_pl: '',
				packaging_text_pt: '',
				packaging_text_ro: '',
				packagings: [
					{
						material: 'en:o-7-other-plastics',
						number_of_units: '1',
						quantity_per_unit: '304 g',
						quantity_per_unit_unit: 'g',
						quantity_per_unit_value: '304',
						recycling: 'en:recycle',
						shape: 'en:bag',
						weight_measured: 10.8
					},
					{
						shape: 'en:envelope'
					}
				],
				packagings_complete: 1,
				packagings_materials: {
					all: {
						weight: 10.8,
						weight_100g: 3.55263157894737,
						weight_percent: 100
					},
					'en:plastic': {
						weight: 10.8,
						weight_100g: 3.55263157894737,
						weight_percent: 100
					},
					'en:unknown': {}
				},
				packagings_materials_main: 'en:plastic',
				packagings_n: 2,
				photographers_tags: [
					'openfoodfacts-contributors',
					'kiliweb',
					'antonos65',
					'arrotino',
					'org-ferrero-france-commerciale',
					'date-limite-app',
					'roland5457',
					'thaialagata',
					'grumpf',
					'heuwerk',
					'foodvisor',
					'prepperapp',
					'ztoclo',
					'telperion87',
					'smoothie-app',
					'elcoco',
					'mairoluin',
					'cgfan749',
					'insectproductadd',
					'radek',
					'showmaster',
					'professordoc',
					'maryvi',
					'macrofactor'
				],
				pnns_groups_1: 'Sugary snacks',
				pnns_groups_1_tags: ['sugary-snacks', 'known'],
				pnns_groups_2: 'Biscuits and cakes',
				pnns_groups_2_tags: ['biscuits-and-cakes', 'known'],
				popularity_key: 22999950570,
				popularity_tags: [
					'top-10-scans-2019',
					'top-50-scans-2019',
					'top-100-scans-2019',
					'top-500-scans-2019',
					'top-1000-scans-2019',
					'top-5000-scans-2019',
					'top-10000-scans-2019',
					'top-50000-scans-2019',
					'top-100000-scans-2019',
					'at-least-5-scans-2019',
					'at-least-10-scans-2019',
					'top-75-percent-scans-2019',
					'top-80-percent-scans-2019',
					'top-85-percent-scans-2019',
					'top-90-percent-scans-2019',
					'top-10-fr-scans-2019',
					'top-50-fr-scans-2019',
					'top-100-fr-scans-2019',
					'top-500-fr-scans-2019',
					'top-1000-fr-scans-2019',
					'top-5000-fr-scans-2019',
					'top-10000-fr-scans-2019',
					'top-50000-fr-scans-2019',
					'top-100000-fr-scans-2019',
					'top-country-fr-scans-2019',
					'at-least-5-fr-scans-2019',
					'at-least-10-fr-scans-2019',
					'top-10-it-scans-2019',
					'top-50-it-scans-2019',
					'top-100-it-scans-2019',
					'top-500-it-scans-2019',
					'top-1000-it-scans-2019',
					'top-5000-it-scans-2019',
					'top-10000-it-scans-2019',
					'top-50000-it-scans-2019',
					'top-100000-it-scans-2019',
					'at-least-5-it-scans-2019',
					'at-least-10-it-scans-2019',
					'top-500-ch-scans-2019',
					'top-1000-ch-scans-2019',
					'top-5000-ch-scans-2019',
					'top-10000-ch-scans-2019',
					'top-50000-ch-scans-2019',
					'top-100000-ch-scans-2019',
					'at-least-5-ch-scans-2019',
					'at-least-10-ch-scans-2019',
					'top-5000-be-scans-2019',
					'top-10000-be-scans-2019',
					'top-50000-be-scans-2019',
					'top-100000-be-scans-2019',
					'at-least-5-be-scans-2019',
					'at-least-10-be-scans-2019',
					'top-10-lu-scans-2019',
					'top-50-lu-scans-2019',
					'top-100-lu-scans-2019',
					'top-500-lu-scans-2019',
					'top-1000-lu-scans-2019',
					'top-5000-lu-scans-2019',
					'top-10000-lu-scans-2019',
					'top-50000-lu-scans-2019',
					'top-100000-lu-scans-2019',
					'at-least-5-lu-scans-2019',
					'at-least-10-lu-scans-2019',
					'top-500-re-scans-2019',
					'top-1000-re-scans-2019',
					'top-5000-re-scans-2019',
					'top-10000-re-scans-2019',
					'top-50000-re-scans-2019',
					'top-100000-re-scans-2019',
					'at-least-5-re-scans-2019',
					'top-50-mq-scans-2019',
					'top-100-mq-scans-2019',
					'top-500-mq-scans-2019',
					'top-1000-mq-scans-2019',
					'top-5000-mq-scans-2019',
					'top-10000-mq-scans-2019',
					'top-50000-mq-scans-2019',
					'top-100000-mq-scans-2019',
					'at-least-5-mq-scans-2019',
					'top-10000-es-scans-2019',
					'top-50000-es-scans-2019',
					'top-100000-es-scans-2019',
					'at-least-5-es-scans-2019',
					'top-100-gb-scans-2019',
					'top-500-gb-scans-2019',
					'top-1000-gb-scans-2019',
					'top-5000-gb-scans-2019',
					'top-10000-gb-scans-2019',
					'top-50000-gb-scans-2019',
					'top-100000-gb-scans-2019',
					'at-least-5-gb-scans-2019',
					'top-10-sm-scans-2019',
					'top-50-sm-scans-2019',
					'top-100-sm-scans-2019',
					'top-500-sm-scans-2019',
					'top-1000-sm-scans-2019',
					'top-5000-sm-scans-2019',
					'top-10000-sm-scans-2019',
					'top-50000-sm-scans-2019',
					'top-100000-sm-scans-2019',
					'top-10000-de-scans-2019',
					'top-50000-de-scans-2019',
					'top-100000-de-scans-2019',
					'top-100-ci-scans-2019',
					'top-500-ci-scans-2019',
					'top-1000-ci-scans-2019',
					'top-5000-ci-scans-2019',
					'top-10000-ci-scans-2019',
					'top-50000-ci-scans-2019',
					'top-100000-ci-scans-2019',
					'top-500-sn-scans-2019',
					'top-1000-sn-scans-2019',
					'top-5000-sn-scans-2019',
					'top-10000-sn-scans-2019',
					'top-50000-sn-scans-2019',
					'top-100000-sn-scans-2019',
					'top-100-dk-scans-2019',
					'top-500-dk-scans-2019',
					'top-1000-dk-scans-2019',
					'top-5000-dk-scans-2019',
					'top-10000-dk-scans-2019',
					'top-50000-dk-scans-2019',
					'top-100000-dk-scans-2019',
					'top-5000-gp-scans-2019',
					'top-10000-gp-scans-2019',
					'top-50000-gp-scans-2019',
					'top-100000-gp-scans-2019',
					'top-500-il-scans-2019',
					'top-1000-il-scans-2019',
					'top-5000-il-scans-2019',
					'top-10000-il-scans-2019',
					'top-50000-il-scans-2019',
					'top-100000-il-scans-2019',
					'top-1000-tn-scans-2019',
					'top-5000-tn-scans-2019',
					'top-10000-tn-scans-2019',
					'top-50000-tn-scans-2019',
					'top-100000-tn-scans-2019',
					'top-5000-us-scans-2019',
					'top-10000-us-scans-2019',
					'top-50000-us-scans-2019',
					'top-100000-us-scans-2019',
					'top-500-mc-scans-2019',
					'top-1000-mc-scans-2019',
					'top-5000-mc-scans-2019',
					'top-10000-mc-scans-2019',
					'top-50000-mc-scans-2019',
					'top-100000-mc-scans-2019',
					'top-100-ly-scans-2019',
					'top-500-ly-scans-2019',
					'top-1000-ly-scans-2019',
					'top-5000-ly-scans-2019',
					'top-10000-ly-scans-2019',
					'top-50000-ly-scans-2019',
					'top-100000-ly-scans-2019',
					'top-5000-pl-scans-2019',
					'top-10000-pl-scans-2019',
					'top-50000-pl-scans-2019',
					'top-100000-pl-scans-2019',
					'top-1000-br-scans-2019',
					'top-5000-br-scans-2019',
					'top-10000-br-scans-2019',
					'top-50000-br-scans-2019',
					'top-100000-br-scans-2019',
					'top-10-scans-2020',
					'top-50-scans-2020',
					'top-100-scans-2020',
					'top-500-scans-2020',
					'top-1000-scans-2020',
					'top-5000-scans-2020',
					'top-10000-scans-2020',
					'top-50000-scans-2020',
					'top-100000-scans-2020',
					'at-least-5-scans-2020',
					'at-least-10-scans-2020',
					'top-75-percent-scans-2020',
					'top-80-percent-scans-2020',
					'top-85-percent-scans-2020',
					'top-90-percent-scans-2020',
					'top-50-fr-scans-2020',
					'top-100-fr-scans-2020',
					'top-500-fr-scans-2020',
					'top-1000-fr-scans-2020',
					'top-5000-fr-scans-2020',
					'top-10000-fr-scans-2020',
					'top-50000-fr-scans-2020',
					'top-100000-fr-scans-2020',
					'top-country-fr-scans-2020',
					'at-least-5-fr-scans-2020',
					'at-least-10-fr-scans-2020',
					'top-10-it-scans-2020',
					'top-50-it-scans-2020',
					'top-100-it-scans-2020',
					'top-500-it-scans-2020',
					'top-1000-it-scans-2020',
					'top-5000-it-scans-2020',
					'top-10000-it-scans-2020',
					'top-50000-it-scans-2020',
					'top-100000-it-scans-2020',
					'at-least-5-it-scans-2020',
					'at-least-10-it-scans-2020',
					'top-500-ch-scans-2020',
					'top-1000-ch-scans-2020',
					'top-5000-ch-scans-2020',
					'top-10000-ch-scans-2020',
					'top-50000-ch-scans-2020',
					'top-100000-ch-scans-2020',
					'at-least-5-ch-scans-2020',
					'at-least-10-ch-scans-2020',
					'top-50-re-scans-2020',
					'top-100-re-scans-2020',
					'top-500-re-scans-2020',
					'top-1000-re-scans-2020',
					'top-5000-re-scans-2020',
					'top-10000-re-scans-2020',
					'top-50000-re-scans-2020',
					'top-100000-re-scans-2020',
					'at-least-5-re-scans-2020',
					'at-least-10-re-scans-2020',
					'top-50-mq-scans-2020',
					'top-100-mq-scans-2020',
					'top-500-mq-scans-2020',
					'top-1000-mq-scans-2020',
					'top-5000-mq-scans-2020',
					'top-10000-mq-scans-2020',
					'top-50000-mq-scans-2020',
					'top-100000-mq-scans-2020',
					'at-least-5-mq-scans-2020',
					'at-least-10-mq-scans-2020',
					'top-1000-be-scans-2020',
					'top-5000-be-scans-2020',
					'top-10000-be-scans-2020',
					'top-50000-be-scans-2020',
					'top-100000-be-scans-2020',
					'at-least-5-be-scans-2020',
					'at-least-10-be-scans-2020',
					'top-5000-de-scans-2020',
					'top-10000-de-scans-2020',
					'top-50000-de-scans-2020',
					'top-100000-de-scans-2020',
					'at-least-5-de-scans-2020',
					'top-50-lu-scans-2020',
					'top-100-lu-scans-2020',
					'top-500-lu-scans-2020',
					'top-1000-lu-scans-2020',
					'top-5000-lu-scans-2020',
					'top-10000-lu-scans-2020',
					'top-50000-lu-scans-2020',
					'top-100000-lu-scans-2020',
					'at-least-5-lu-scans-2020',
					'top-1000-ma-scans-2020',
					'top-5000-ma-scans-2020',
					'top-10000-ma-scans-2020',
					'top-50000-ma-scans-2020',
					'top-100000-ma-scans-2020',
					'at-least-5-ma-scans-2020',
					'top-500-dz-scans-2020',
					'top-1000-dz-scans-2020',
					'top-5000-dz-scans-2020',
					'top-10000-dz-scans-2020',
					'top-50000-dz-scans-2020',
					'top-100000-dz-scans-2020',
					'at-least-5-dz-scans-2020',
					'top-50000-es-scans-2020',
					'top-100000-es-scans-2020',
					'top-500-tn-scans-2020',
					'top-1000-tn-scans-2020',
					'top-5000-tn-scans-2020',
					'top-10000-tn-scans-2020',
					'top-50000-tn-scans-2020',
					'top-100000-tn-scans-2020',
					'top-500-nl-scans-2020',
					'top-1000-nl-scans-2020',
					'top-5000-nl-scans-2020',
					'top-10000-nl-scans-2020',
					'top-50000-nl-scans-2020',
					'top-100000-nl-scans-2020',
					'top-500-nc-scans-2020',
					'top-1000-nc-scans-2020',
					'top-5000-nc-scans-2020',
					'top-10000-nc-scans-2020',
					'top-50000-nc-scans-2020',
					'top-100000-nc-scans-2020',
					'top-100-jp-scans-2020',
					'top-500-jp-scans-2020',
					'top-1000-jp-scans-2020',
					'top-5000-jp-scans-2020',
					'top-10000-jp-scans-2020',
					'top-50000-jp-scans-2020',
					'top-100000-jp-scans-2020',
					'top-100-tr-scans-2020',
					'top-500-tr-scans-2020',
					'top-1000-tr-scans-2020',
					'top-5000-tr-scans-2020',
					'top-10000-tr-scans-2020',
					'top-50000-tr-scans-2020',
					'top-100000-tr-scans-2020',
					'top-5000-gb-scans-2020',
					'top-10000-gb-scans-2020',
					'top-50000-gb-scans-2020',
					'top-100000-gb-scans-2020',
					'top-50-mc-scans-2020',
					'top-100-mc-scans-2020',
					'top-500-mc-scans-2020',
					'top-1000-mc-scans-2020',
					'top-5000-mc-scans-2020',
					'top-10000-mc-scans-2020',
					'top-50000-mc-scans-2020',
					'top-100000-mc-scans-2020',
					'top-1000-gp-scans-2020',
					'top-5000-gp-scans-2020',
					'top-10000-gp-scans-2020',
					'top-50000-gp-scans-2020',
					'top-100000-gp-scans-2020',
					'top-50-dk-scans-2020',
					'top-100-dk-scans-2020',
					'top-500-dk-scans-2020',
					'top-1000-dk-scans-2020',
					'top-5000-dk-scans-2020',
					'top-10000-dk-scans-2020',
					'top-50000-dk-scans-2020',
					'top-100000-dk-scans-2020',
					'top-10000-at-scans-2020',
					'top-50000-at-scans-2020',
					'top-100000-at-scans-2020',
					'top-5000-us-scans-2020',
					'top-10000-us-scans-2020',
					'top-50000-us-scans-2020',
					'top-100000-us-scans-2020',
					'top-500-gf-scans-2020',
					'top-1000-gf-scans-2020',
					'top-5000-gf-scans-2020',
					'top-10000-gf-scans-2020',
					'top-50000-gf-scans-2020',
					'top-100000-gf-scans-2020',
					'top-1000-mu-scans-2020',
					'top-5000-mu-scans-2020',
					'top-10000-mu-scans-2020',
					'top-50000-mu-scans-2020',
					'top-100000-mu-scans-2020',
					'top-10000-pt-scans-2020',
					'top-50000-pt-scans-2020',
					'top-100000-pt-scans-2020',
					'top-1000-sn-scans-2020',
					'top-5000-sn-scans-2020',
					'top-10000-sn-scans-2020',
					'top-50000-sn-scans-2020',
					'top-100000-sn-scans-2020',
					'top-5000-ad-scans-2020',
					'top-10000-ad-scans-2020',
					'top-50000-ad-scans-2020',
					'top-100000-ad-scans-2020',
					'top-5000-ci-scans-2020',
					'top-10000-ci-scans-2020',
					'top-50000-ci-scans-2020',
					'top-100000-ci-scans-2020',
					'top-5000-pf-scans-2020',
					'top-10000-pf-scans-2020',
					'top-50000-pf-scans-2020',
					'top-100000-pf-scans-2020',
					'top-500-ae-scans-2020',
					'top-1000-ae-scans-2020',
					'top-5000-ae-scans-2020',
					'top-10000-ae-scans-2020',
					'top-50000-ae-scans-2020',
					'top-100000-ae-scans-2020',
					'top-1000-ca-scans-2020',
					'top-5000-ca-scans-2020',
					'top-10000-ca-scans-2020',
					'top-50000-ca-scans-2020',
					'top-100000-ca-scans-2020',
					'top-10000-ro-scans-2020',
					'top-50000-ro-scans-2020',
					'top-100000-ro-scans-2020',
					'top-10-scans-2021',
					'top-50-scans-2021',
					'top-100-scans-2021',
					'top-500-scans-2021',
					'top-1000-scans-2021',
					'top-5000-scans-2021',
					'top-10000-scans-2021',
					'top-50000-scans-2021',
					'top-100000-scans-2021',
					'at-least-5-scans-2021',
					'at-least-10-scans-2021',
					'top-75-percent-scans-2021',
					'top-80-percent-scans-2021',
					'top-85-percent-scans-2021',
					'top-90-percent-scans-2021',
					'top-50-fr-scans-2021',
					'top-100-fr-scans-2021',
					'top-500-fr-scans-2021',
					'top-1000-fr-scans-2021',
					'top-5000-fr-scans-2021',
					'top-10000-fr-scans-2021',
					'top-50000-fr-scans-2021',
					'top-100000-fr-scans-2021',
					'top-country-fr-scans-2021',
					'at-least-5-fr-scans-2021',
					'at-least-10-fr-scans-2021',
					'top-10-it-scans-2021',
					'top-50-it-scans-2021',
					'top-100-it-scans-2021',
					'top-500-it-scans-2021',
					'top-1000-it-scans-2021',
					'top-5000-it-scans-2021',
					'top-10000-it-scans-2021',
					'top-50000-it-scans-2021',
					'top-100000-it-scans-2021',
					'at-least-5-it-scans-2021',
					'at-least-10-it-scans-2021',
					'top-5000-es-scans-2021',
					'top-10000-es-scans-2021',
					'top-50000-es-scans-2021',
					'top-100000-es-scans-2021',
					'at-least-5-es-scans-2021',
					'at-least-10-es-scans-2021',
					'top-500-ch-scans-2021',
					'top-1000-ch-scans-2021',
					'top-5000-ch-scans-2021',
					'top-10000-ch-scans-2021',
					'top-50000-ch-scans-2021',
					'top-100000-ch-scans-2021',
					'at-least-5-ch-scans-2021',
					'at-least-10-ch-scans-2021',
					'top-1000-be-scans-2021',
					'top-5000-be-scans-2021',
					'top-10000-be-scans-2021',
					'top-50000-be-scans-2021',
					'top-100000-be-scans-2021',
					'at-least-5-be-scans-2021',
					'top-500-ro-scans-2021',
					'top-1000-ro-scans-2021',
					'top-5000-ro-scans-2021',
					'top-10000-ro-scans-2021',
					'top-50000-ro-scans-2021',
					'top-100000-ro-scans-2021',
					'at-least-5-ro-scans-2021',
					'top-50-mq-scans-2021',
					'top-100-mq-scans-2021',
					'top-500-mq-scans-2021',
					'top-1000-mq-scans-2021',
					'top-5000-mq-scans-2021',
					'top-10000-mq-scans-2021',
					'top-50000-mq-scans-2021',
					'top-100000-mq-scans-2021',
					'at-least-5-mq-scans-2021',
					'top-10000-de-scans-2021',
					'top-50000-de-scans-2021',
					'top-100000-de-scans-2021',
					'at-least-5-de-scans-2021',
					'top-500-re-scans-2021',
					'top-1000-re-scans-2021',
					'top-5000-re-scans-2021',
					'top-10000-re-scans-2021',
					'top-50000-re-scans-2021',
					'top-100000-re-scans-2021',
					'at-least-5-re-scans-2021',
					'top-500-us-scans-2021',
					'top-1000-us-scans-2021',
					'top-5000-us-scans-2021',
					'top-10000-us-scans-2021',
					'top-50000-us-scans-2021',
					'top-100000-us-scans-2021',
					'at-least-5-us-scans-2021',
					'top-1000-pt-scans-2021',
					'top-5000-pt-scans-2021',
					'top-10000-pt-scans-2021',
					'top-50000-pt-scans-2021',
					'top-100000-pt-scans-2021',
					'top-100-nc-scans-2021',
					'top-500-nc-scans-2021',
					'top-1000-nc-scans-2021',
					'top-5000-nc-scans-2021',
					'top-10000-nc-scans-2021',
					'top-50000-nc-scans-2021',
					'top-100000-nc-scans-2021',
					'top-5000-ma-scans-2021',
					'top-10000-ma-scans-2021',
					'top-50000-ma-scans-2021',
					'top-100000-ma-scans-2021',
					'top-1000-dz-scans-2021',
					'top-5000-dz-scans-2021',
					'top-10000-dz-scans-2021',
					'top-50000-dz-scans-2021',
					'top-100000-dz-scans-2021',
					'top-5000-gb-scans-2021',
					'top-10000-gb-scans-2021',
					'top-50000-gb-scans-2021',
					'top-100000-gb-scans-2021',
					'top-500-lu-scans-2021',
					'top-1000-lu-scans-2021',
					'top-5000-lu-scans-2021',
					'top-10000-lu-scans-2021',
					'top-50000-lu-scans-2021',
					'top-100000-lu-scans-2021',
					'top-500-mu-scans-2021',
					'top-1000-mu-scans-2021',
					'top-5000-mu-scans-2021',
					'top-10000-mu-scans-2021',
					'top-50000-mu-scans-2021',
					'top-100000-mu-scans-2021',
					'top-500-sn-scans-2021',
					'top-1000-sn-scans-2021',
					'top-5000-sn-scans-2021',
					'top-10000-sn-scans-2021',
					'top-50000-sn-scans-2021',
					'top-100000-sn-scans-2021',
					'top-50-gf-scans-2021',
					'top-100-gf-scans-2021',
					'top-500-gf-scans-2021',
					'top-1000-gf-scans-2021',
					'top-5000-gf-scans-2021',
					'top-10000-gf-scans-2021',
					'top-50000-gf-scans-2021',
					'top-100000-gf-scans-2021',
					'top-50-sg-scans-2021',
					'top-100-sg-scans-2021',
					'top-500-sg-scans-2021',
					'top-1000-sg-scans-2021',
					'top-5000-sg-scans-2021',
					'top-10000-sg-scans-2021',
					'top-50000-sg-scans-2021',
					'top-100000-sg-scans-2021',
					'top-500-gp-scans-2021',
					'top-1000-gp-scans-2021',
					'top-5000-gp-scans-2021',
					'top-10000-gp-scans-2021',
					'top-50000-gp-scans-2021',
					'top-100000-gp-scans-2021',
					'top-500-ci-scans-2021',
					'top-1000-ci-scans-2021',
					'top-5000-ci-scans-2021',
					'top-10000-ci-scans-2021',
					'top-50000-ci-scans-2021',
					'top-100000-ci-scans-2021',
					'top-5000-mx-scans-2021',
					'top-10000-mx-scans-2021',
					'top-50000-mx-scans-2021',
					'top-100000-mx-scans-2021',
					'top-500-ph-scans-2021',
					'top-1000-ph-scans-2021',
					'top-5000-ph-scans-2021',
					'top-10000-ph-scans-2021',
					'top-50000-ph-scans-2021',
					'top-100000-ph-scans-2021',
					'top-100-cr-scans-2021',
					'top-500-cr-scans-2021',
					'top-1000-cr-scans-2021',
					'top-5000-cr-scans-2021',
					'top-10000-cr-scans-2021',
					'top-50000-cr-scans-2021',
					'top-100000-cr-scans-2021',
					'top-10000-at-scans-2021',
					'top-50000-at-scans-2021',
					'top-100000-at-scans-2021',
					'top-5000-ca-scans-2021',
					'top-10000-ca-scans-2021',
					'top-50000-ca-scans-2021',
					'top-100000-ca-scans-2021',
					'top-1000-ga-scans-2021',
					'top-5000-ga-scans-2021',
					'top-10000-ga-scans-2021',
					'top-50000-ga-scans-2021',
					'top-100000-ga-scans-2021',
					'top-1000-si-scans-2021',
					'top-5000-si-scans-2021',
					'top-10000-si-scans-2021',
					'top-50000-si-scans-2021',
					'top-100000-si-scans-2021',
					'top-1000-sa-scans-2021',
					'top-5000-sa-scans-2021',
					'top-10000-sa-scans-2021',
					'top-50000-sa-scans-2021',
					'top-100000-sa-scans-2021',
					'top-500-mt-scans-2021',
					'top-1000-mt-scans-2021',
					'top-5000-mt-scans-2021',
					'top-10000-mt-scans-2021',
					'top-50000-mt-scans-2021',
					'top-100000-mt-scans-2021',
					'top-5000-tn-scans-2021',
					'top-10000-tn-scans-2021',
					'top-50000-tn-scans-2021',
					'top-100000-tn-scans-2021',
					'top-5000-se-scans-2021',
					'top-10000-se-scans-2021',
					'top-50000-se-scans-2021',
					'top-100000-se-scans-2021',
					'top-500-dk-scans-2021',
					'top-1000-dk-scans-2021',
					'top-5000-dk-scans-2021',
					'top-10000-dk-scans-2021',
					'top-50000-dk-scans-2021',
					'top-100000-dk-scans-2021',
					'top-100-ve-scans-2021',
					'top-500-ve-scans-2021',
					'top-1000-ve-scans-2021',
					'top-5000-ve-scans-2021',
					'top-10000-ve-scans-2021',
					'top-50000-ve-scans-2021',
					'top-100000-ve-scans-2021',
					'top-1000-lb-scans-2021',
					'top-5000-lb-scans-2021',
					'top-10000-lb-scans-2021',
					'top-50000-lb-scans-2021',
					'top-100000-lb-scans-2021',
					'top-1000-ae-scans-2021',
					'top-5000-ae-scans-2021',
					'top-10000-ae-scans-2021',
					'top-50000-ae-scans-2021',
					'top-100000-ae-scans-2021',
					'top-500-uy-scans-2021',
					'top-1000-uy-scans-2021',
					'top-5000-uy-scans-2021',
					'top-10000-uy-scans-2021',
					'top-50000-uy-scans-2021',
					'top-100000-uy-scans-2021',
					'top-10-scans-2022',
					'top-50-scans-2022',
					'top-100-scans-2022',
					'top-500-scans-2022',
					'top-1000-scans-2022',
					'top-5000-scans-2022',
					'top-10000-scans-2022',
					'top-50000-scans-2022',
					'top-100000-scans-2022',
					'at-least-5-scans-2022',
					'at-least-10-scans-2022',
					'top-75-percent-scans-2022',
					'top-80-percent-scans-2022',
					'top-85-percent-scans-2022',
					'top-90-percent-scans-2022',
					'top-50-fr-scans-2022',
					'top-100-fr-scans-2022',
					'top-500-fr-scans-2022',
					'top-1000-fr-scans-2022',
					'top-5000-fr-scans-2022',
					'top-10000-fr-scans-2022',
					'top-50000-fr-scans-2022',
					'top-100000-fr-scans-2022',
					'top-country-fr-scans-2022',
					'at-least-5-fr-scans-2022',
					'at-least-10-fr-scans-2022',
					'top-100-de-scans-2022',
					'top-500-de-scans-2022',
					'top-1000-de-scans-2022',
					'top-5000-de-scans-2022',
					'top-10000-de-scans-2022',
					'top-50000-de-scans-2022',
					'top-100000-de-scans-2022',
					'at-least-5-de-scans-2022',
					'at-least-10-de-scans-2022',
					'top-10-it-scans-2022',
					'top-50-it-scans-2022',
					'top-100-it-scans-2022',
					'top-500-it-scans-2022',
					'top-1000-it-scans-2022',
					'top-5000-it-scans-2022',
					'top-10000-it-scans-2022',
					'top-50000-it-scans-2022',
					'top-100000-it-scans-2022',
					'at-least-5-it-scans-2022',
					'at-least-10-it-scans-2022',
					'top-5000-es-scans-2022',
					'top-10000-es-scans-2022',
					'top-50000-es-scans-2022',
					'top-100000-es-scans-2022',
					'at-least-5-es-scans-2022',
					'top-1000-ma-scans-2022',
					'top-5000-ma-scans-2022',
					'top-10000-ma-scans-2022',
					'top-50000-ma-scans-2022',
					'top-100000-ma-scans-2022',
					'at-least-5-ma-scans-2022',
					'top-1000-ch-scans-2022',
					'top-5000-ch-scans-2022',
					'top-10000-ch-scans-2022',
					'top-50000-ch-scans-2022',
					'top-100000-ch-scans-2022',
					'at-least-5-ch-scans-2022',
					'top-500-ro-scans-2022',
					'top-1000-ro-scans-2022',
					'top-5000-ro-scans-2022',
					'top-10000-ro-scans-2022',
					'top-50000-ro-scans-2022',
					'top-100000-ro-scans-2022',
					'at-least-5-ro-scans-2022',
					'top-5000-be-scans-2022',
					'top-10000-be-scans-2022',
					'top-50000-be-scans-2022',
					'top-100000-be-scans-2022',
					'top-100-re-scans-2022',
					'top-500-re-scans-2022',
					'top-1000-re-scans-2022',
					'top-5000-re-scans-2022',
					'top-10000-re-scans-2022',
					'top-50000-re-scans-2022',
					'top-100000-re-scans-2022',
					'top-500-us-scans-2022',
					'top-1000-us-scans-2022',
					'top-5000-us-scans-2022',
					'top-10000-us-scans-2022',
					'top-50000-us-scans-2022',
					'top-100000-us-scans-2022',
					'top-500-at-scans-2022',
					'top-1000-at-scans-2022',
					'top-5000-at-scans-2022',
					'top-10000-at-scans-2022',
					'top-50000-at-scans-2022',
					'top-100000-at-scans-2022',
					'top-100-pf-scans-2022',
					'top-500-pf-scans-2022',
					'top-1000-pf-scans-2022',
					'top-5000-pf-scans-2022',
					'top-10000-pf-scans-2022',
					'top-50000-pf-scans-2022',
					'top-100000-pf-scans-2022',
					'top-50-mu-scans-2022',
					'top-100-mu-scans-2022',
					'top-500-mu-scans-2022',
					'top-1000-mu-scans-2022',
					'top-5000-mu-scans-2022',
					'top-10000-mu-scans-2022',
					'top-50000-mu-scans-2022',
					'top-100000-mu-scans-2022',
					'top-500-ca-scans-2022',
					'top-1000-ca-scans-2022',
					'top-5000-ca-scans-2022',
					'top-10000-ca-scans-2022',
					'top-50000-ca-scans-2022',
					'top-100000-ca-scans-2022',
					'top-5000-pt-scans-2022',
					'top-10000-pt-scans-2022',
					'top-50000-pt-scans-2022',
					'top-100000-pt-scans-2022',
					'top-500-hr-scans-2022',
					'top-1000-hr-scans-2022',
					'top-5000-hr-scans-2022',
					'top-10000-hr-scans-2022',
					'top-50000-hr-scans-2022',
					'top-100000-hr-scans-2022',
					'top-5000-nl-scans-2022',
					'top-10000-nl-scans-2022',
					'top-50000-nl-scans-2022',
					'top-100000-nl-scans-2022',
					'top-1000-si-scans-2022',
					'top-5000-si-scans-2022',
					'top-10000-si-scans-2022',
					'top-50000-si-scans-2022',
					'top-100000-si-scans-2022',
					'top-500-ae-scans-2022',
					'top-1000-ae-scans-2022',
					'top-5000-ae-scans-2022',
					'top-10000-ae-scans-2022',
					'top-50000-ae-scans-2022',
					'top-100000-ae-scans-2022',
					'top-100-gf-scans-2022',
					'top-500-gf-scans-2022',
					'top-1000-gf-scans-2022',
					'top-5000-gf-scans-2022',
					'top-10000-gf-scans-2022',
					'top-50000-gf-scans-2022',
					'top-100000-gf-scans-2022',
					'top-100-is-scans-2022',
					'top-500-is-scans-2022',
					'top-1000-is-scans-2022',
					'top-5000-is-scans-2022',
					'top-10000-is-scans-2022',
					'top-50000-is-scans-2022',
					'top-100000-is-scans-2022',
					'top-1000-ba-scans-2022',
					'top-5000-ba-scans-2022',
					'top-10000-ba-scans-2022',
					'top-50000-ba-scans-2022',
					'top-100000-ba-scans-2022',
					'top-500-cy-scans-2022',
					'top-1000-cy-scans-2022',
					'top-5000-cy-scans-2022',
					'top-10000-cy-scans-2022',
					'top-50000-cy-scans-2022',
					'top-100000-cy-scans-2022',
					'top-5000-tn-scans-2022',
					'top-10000-tn-scans-2022',
					'top-50000-tn-scans-2022',
					'top-100000-tn-scans-2022',
					'top-500-mq-scans-2022',
					'top-1000-mq-scans-2022',
					'top-5000-mq-scans-2022',
					'top-10000-mq-scans-2022',
					'top-50000-mq-scans-2022',
					'top-100000-mq-scans-2022',
					'top-1000-mt-scans-2022',
					'top-5000-mt-scans-2022',
					'top-10000-mt-scans-2022',
					'top-50000-mt-scans-2022',
					'top-100000-mt-scans-2022',
					'top-5000-ua-scans-2022',
					'top-10000-ua-scans-2022',
					'top-50000-ua-scans-2022',
					'top-100000-ua-scans-2022',
					'top-500-nc-scans-2022',
					'top-1000-nc-scans-2022',
					'top-5000-nc-scans-2022',
					'top-10000-nc-scans-2022',
					'top-50000-nc-scans-2022',
					'top-100000-nc-scans-2022',
					'top-5000-fi-scans-2022',
					'top-10000-fi-scans-2022',
					'top-50000-fi-scans-2022',
					'top-100000-fi-scans-2022',
					'top-50-dj-scans-2022',
					'top-100-dj-scans-2022',
					'top-500-dj-scans-2022',
					'top-1000-dj-scans-2022',
					'top-5000-dj-scans-2022',
					'top-10000-dj-scans-2022',
					'top-50000-dj-scans-2022',
					'top-100000-dj-scans-2022',
					'top-1000-ci-scans-2022',
					'top-5000-ci-scans-2022',
					'top-10000-ci-scans-2022',
					'top-50000-ci-scans-2022',
					'top-100000-ci-scans-2022',
					'top-5000-gp-scans-2022',
					'top-10000-gp-scans-2022',
					'top-50000-gp-scans-2022',
					'top-100000-gp-scans-2022',
					'top-5000-dz-scans-2022',
					'top-10000-dz-scans-2022',
					'top-50000-dz-scans-2022',
					'top-100000-dz-scans-2022',
					'top-50-scans-2023',
					'top-100-scans-2023',
					'top-500-scans-2023',
					'top-1000-scans-2023',
					'top-5000-scans-2023',
					'top-10000-scans-2023',
					'top-50000-scans-2023',
					'top-100000-scans-2023',
					'at-least-5-scans-2023',
					'at-least-10-scans-2023',
					'top-75-percent-scans-2023',
					'top-80-percent-scans-2023',
					'top-85-percent-scans-2023',
					'top-90-percent-scans-2023',
					'top-100-fr-scans-2023',
					'top-500-fr-scans-2023',
					'top-1000-fr-scans-2023',
					'top-5000-fr-scans-2023',
					'top-10000-fr-scans-2023',
					'top-50000-fr-scans-2023',
					'top-100000-fr-scans-2023',
					'top-country-fr-scans-2023',
					'at-least-5-fr-scans-2023',
					'at-least-10-fr-scans-2023',
					'top-100-de-scans-2023',
					'top-500-de-scans-2023',
					'top-1000-de-scans-2023',
					'top-5000-de-scans-2023',
					'top-10000-de-scans-2023',
					'top-50000-de-scans-2023',
					'top-100000-de-scans-2023',
					'at-least-5-de-scans-2023',
					'at-least-10-de-scans-2023',
					'top-100-it-scans-2023',
					'top-500-it-scans-2023',
					'top-1000-it-scans-2023',
					'top-5000-it-scans-2023',
					'top-10000-it-scans-2023',
					'top-50000-it-scans-2023',
					'top-100000-it-scans-2023',
					'at-least-5-it-scans-2023',
					'at-least-10-it-scans-2023',
					'top-1000-ro-scans-2023',
					'top-5000-ro-scans-2023',
					'top-10000-ro-scans-2023',
					'top-50000-ro-scans-2023',
					'top-100000-ro-scans-2023',
					'at-least-5-ro-scans-2023',
					'at-least-10-ro-scans-2023',
					'top-5000-es-scans-2023',
					'top-10000-es-scans-2023',
					'top-50000-es-scans-2023',
					'top-100000-es-scans-2023',
					'at-least-5-es-scans-2023',
					'at-least-10-es-scans-2023',
					'top-5000-ma-scans-2023',
					'top-10000-ma-scans-2023',
					'top-50000-ma-scans-2023',
					'top-100000-ma-scans-2023',
					'at-least-5-ma-scans-2023',
					'top-1000-ch-scans-2023',
					'top-5000-ch-scans-2023',
					'top-10000-ch-scans-2023',
					'top-50000-ch-scans-2023',
					'top-100000-ch-scans-2023',
					'at-least-5-ch-scans-2023',
					'top-1000-be-scans-2023',
					'top-5000-be-scans-2023',
					'top-10000-be-scans-2023',
					'top-50000-be-scans-2023',
					'top-100000-be-scans-2023',
					'at-least-5-be-scans-2023',
					'top-500-ua-scans-2023',
					'top-1000-ua-scans-2023',
					'top-5000-ua-scans-2023',
					'top-10000-ua-scans-2023',
					'top-50000-ua-scans-2023',
					'top-100000-ua-scans-2023',
					'top-50000-gb-scans-2023',
					'top-100000-gb-scans-2023',
					'top-1000-dz-scans-2023',
					'top-5000-dz-scans-2023',
					'top-10000-dz-scans-2023',
					'top-50000-dz-scans-2023',
					'top-100000-dz-scans-2023',
					'top-5000-pt-scans-2023',
					'top-10000-pt-scans-2023',
					'top-50000-pt-scans-2023',
					'top-100000-pt-scans-2023',
					'top-100-gp-scans-2023',
					'top-500-gp-scans-2023',
					'top-1000-gp-scans-2023',
					'top-5000-gp-scans-2023',
					'top-10000-gp-scans-2023',
					'top-50000-gp-scans-2023',
					'top-100000-gp-scans-2023',
					'top-500-mq-scans-2023',
					'top-1000-mq-scans-2023',
					'top-5000-mq-scans-2023',
					'top-10000-mq-scans-2023',
					'top-50000-mq-scans-2023',
					'top-100000-mq-scans-2023',
					'top-100-my-scans-2023',
					'top-500-my-scans-2023',
					'top-1000-my-scans-2023',
					'top-5000-my-scans-2023',
					'top-10000-my-scans-2023',
					'top-50000-my-scans-2023',
					'top-100000-my-scans-2023',
					'top-500-hr-scans-2023',
					'top-1000-hr-scans-2023',
					'top-5000-hr-scans-2023',
					'top-10000-hr-scans-2023',
					'top-50000-hr-scans-2023',
					'top-100000-hr-scans-2023',
					'top-5000-pl-scans-2023',
					'top-10000-pl-scans-2023',
					'top-50000-pl-scans-2023',
					'top-100000-pl-scans-2023',
					'top-50-mu-scans-2023',
					'top-100-mu-scans-2023',
					'top-500-mu-scans-2023',
					'top-1000-mu-scans-2023',
					'top-5000-mu-scans-2023',
					'top-10000-mu-scans-2023',
					'top-50000-mu-scans-2023',
					'top-100000-mu-scans-2023',
					'top-5000-at-scans-2023',
					'top-10000-at-scans-2023',
					'top-50000-at-scans-2023',
					'top-100000-at-scans-2023',
					'top-5000-bg-scans-2023',
					'top-10000-bg-scans-2023',
					'top-50000-bg-scans-2023',
					'top-100000-bg-scans-2023',
					'top-100-ae-scans-2023',
					'top-500-ae-scans-2023',
					'top-1000-ae-scans-2023',
					'top-5000-ae-scans-2023',
					'top-10000-ae-scans-2023',
					'top-50000-ae-scans-2023',
					'top-100000-ae-scans-2023',
					'top-10000-re-scans-2023',
					'top-50000-re-scans-2023',
					'top-100000-re-scans-2023',
					'top-500-md-scans-2023',
					'top-1000-md-scans-2023',
					'top-5000-md-scans-2023',
					'top-10000-md-scans-2023',
					'top-50000-md-scans-2023',
					'top-100000-md-scans-2023',
					'top-5000-gr-scans-2023',
					'top-10000-gr-scans-2023',
					'top-50000-gr-scans-2023',
					'top-100000-gr-scans-2023',
					'top-500-nc-scans-2023',
					'top-1000-nc-scans-2023',
					'top-5000-nc-scans-2023',
					'top-10000-nc-scans-2023',
					'top-50000-nc-scans-2023',
					'top-100000-nc-scans-2023',
					'top-100-je-scans-2023',
					'top-500-je-scans-2023',
					'top-1000-je-scans-2023',
					'top-5000-je-scans-2023',
					'top-10000-je-scans-2023',
					'top-50000-je-scans-2023',
					'top-100000-je-scans-2023',
					'top-500-pr-scans-2023',
					'top-1000-pr-scans-2023',
					'top-5000-pr-scans-2023',
					'top-10000-pr-scans-2023',
					'top-50000-pr-scans-2023',
					'top-100000-pr-scans-2023',
					'top-5000-in-scans-2023',
					'top-10000-in-scans-2023',
					'top-50000-in-scans-2023',
					'top-100000-in-scans-2023',
					'top-50000-us-scans-2023',
					'top-100000-us-scans-2023',
					'top-5000-cz-scans-2023',
					'top-10000-cz-scans-2023',
					'top-50000-cz-scans-2023',
					'top-100000-cz-scans-2023',
					'top-5000-se-scans-2023',
					'top-10000-se-scans-2023',
					'top-50000-se-scans-2023',
					'top-100000-se-scans-2023',
					'top-500-ly-scans-2023',
					'top-1000-ly-scans-2023',
					'top-5000-ly-scans-2023',
					'top-10000-ly-scans-2023',
					'top-50000-ly-scans-2023',
					'top-100000-ly-scans-2023',
					'top-5000-hu-scans-2023',
					'top-10000-hu-scans-2023',
					'top-50000-hu-scans-2023',
					'top-100000-hu-scans-2023',
					'top-5000-lu-scans-2023',
					'top-10000-lu-scans-2023',
					'top-50000-lu-scans-2023',
					'top-100000-lu-scans-2023',
					'top-500-mg-scans-2023',
					'top-1000-mg-scans-2023',
					'top-5000-mg-scans-2023',
					'top-10000-mg-scans-2023',
					'top-50000-mg-scans-2023',
					'top-100000-mg-scans-2023',
					'top-500-me-scans-2023',
					'top-1000-me-scans-2023',
					'top-5000-me-scans-2023',
					'top-10000-me-scans-2023',
					'top-50000-me-scans-2023',
					'top-100000-me-scans-2023',
					'top-5000-mt-scans-2023',
					'top-10000-mt-scans-2023',
					'top-50000-mt-scans-2023',
					'top-100000-mt-scans-2023',
					'top-1000-si-scans-2023',
					'top-5000-si-scans-2023',
					'top-10000-si-scans-2023',
					'top-50000-si-scans-2023',
					'top-100000-si-scans-2023',
					'top-10000-nl-scans-2023',
					'top-50000-nl-scans-2023',
					'top-100000-nl-scans-2023',
					'top-5000-sa-scans-2023',
					'top-10000-sa-scans-2023',
					'top-50000-sa-scans-2023',
					'top-100000-sa-scans-2023',
					'top-5000-lt-scans-2023',
					'top-10000-lt-scans-2023',
					'top-50000-lt-scans-2023',
					'top-100000-lt-scans-2023'
				],
				producer_version_id: '2021-01-25T13:53:49+01:00',
				producer_version_id_imported: '2021-01-25T13:53:49+01:00',
				product: {},
				product_name:
					'Biscuits croquants au coeur onctueux de Nutella®',
				product_name_de:
					'Knusprige Kekse mit einem cremigen Herz aus Nutella®',
				product_name_en: '',
				product_name_es: '',
				product_name_fr:
					'Biscuits croquants au coeur onctueux de Nutella®',
				product_name_fr_imported:
					'Biscuits Nutella x22 biscuits fourrés - 304g',
				product_name_it:
					'Croccanti biscotti con coure cremoso di Nutella®',
				product_name_pl: '',
				product_name_pt:
					'Crocantes bolachas com um coração cremoso de Nutella®',
				product_name_ro: '',
				product_quantity: '304',
				product_quantity_unit: 'g',
				product_type: 'food',
				purchase_places: 'Italien,France,Lacaune,Portugal',
				purchase_places_tags: [
					'italien',
					'france',
					'lacaune',
					'portugal'
				],
				quantity: '304 g',
				quantity_imported: '304 g',
				removed_countries_tags: [],
				rev: 415,
				scans_n: 606,
				schema_version: 996,
				scores: {},
				selected_images: {
					front: {
						display: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_de.344.400.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.400.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_it.346.400.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_pt.325.400.jpg'
						},
						small: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_de.344.200.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.200.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_it.346.200.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_pt.325.200.jpg'
						},
						thumb: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_de.344.100.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_fr.356.100.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_it.346.100.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/front_pt.325.100.jpg'
						}
					},
					ingredients: {
						display: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_de.323.400.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.400.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_it.48.400.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_pt.327.400.jpg'
						},
						small: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_de.323.200.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.200.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_it.48.200.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_pt.327.200.jpg'
						},
						thumb: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_de.323.100.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_fr.308.100.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_it.48.100.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/ingredients_pt.327.100.jpg'
						}
					},
					nutrition: {
						display: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_de.316.400.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.400.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_it.182.400.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_pt.329.400.jpg'
						},
						small: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_de.316.200.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.200.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_it.182.200.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_pt.329.200.jpg'
						},
						thumb: {
							de: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_de.316.100.jpg',
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_fr.352.100.jpg',
							it: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_it.182.100.jpg',
							pt: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/nutrition_pt.329.100.jpg'
						}
					},
					packaging: {
						display: {
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.400.jpg'
						},
						small: {
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.200.jpg'
						},
						thumb: {
							fr: 'https://images.openfoodfacts.org/images/products/800/050/031/0427/packaging_fr.260.100.jpg'
						}
					}
				},
				serving_quantity: 13.8,
				serving_quantity_unit: 'g',
				serving_size: '13,8 g',
				serving_size_imported: '13.8 g (1)',
				sortkey: 1610688704,
				sources: [
					{
						fields: [
							'lc',
							'product_name_fr',
							'brands',
							'allergens',
							'ingredients_text_fr'
						],
						id: 'ferrero',
						images: [],
						import_t: 1552319278,
						manufacturer: '1',
						name: 'Ferrero',
						url: 'https://www.ferrero.fr'
					},
					{
						fields: ['brands', 'ingredients_text_fr'],
						id: 'ferrero',
						images: [],
						import_t: 1558962485,
						manufacturer: '1',
						name: 'Ferrero',
						url: 'https://www.ferrero.fr'
					},
					{
						fields: [
							'product_name_fr',
							'generic_name_fr',
							'quantity',
							'brands',
							'producer_version_id',
							'conservation_conditions_fr',
							'customer_service_fr',
							'data_sources',
							'no_nutrition_data',
							'nutrition_data_per',
							'allergens',
							'ingredients_text_fr',
							'nutrients.energy-kcal_unit',
							'nutrients.energy-kcal_value'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1606408309,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: ['product_name_fr', 'producer_version_id'],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1610688704,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: ['producer_version_id'],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1612330639,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [
							'abbreviated_product_name_fr',
							'packaging',
							'customer_service_fr',
							'data_sources',
							'serving_size'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1636522231,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1643175090,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: ['generic_name_fr'],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1643261431,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: ['product_name_fr'],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1645594313,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [
							'product_name_fr',
							'nutrients.energy-kcal_value',
							'nutrients.fat_value',
							'nutrients.proteins_value',
							'nutrients.salt_value',
							'nutrients.saturated-fat_value',
							'nutrients.sugars_value'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1655353907,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [
							'nutrients.energy-kcal_value',
							'nutrients.fat_value',
							'nutrients.proteins_value',
							'nutrients.salt_value',
							'nutrients.saturated-fat_value',
							'nutrients.sugars_value'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1668058240,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [
							'product_name_fr',
							'nutrients.carbohydrates_value',
							'nutrients.energy-kcal_value',
							'nutrients.fat_value',
							'nutrients.proteins_value',
							'nutrients.salt_value',
							'nutrients.saturated-fat_value',
							'nutrients.sugars_value'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1672983110,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1673674260,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: ['ingredients_text_fr', 'nutrients.salt_value'],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1677130236,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [
							'nutrients.energy-kcal_value',
							'nutrients.fat_value',
							'nutrients.proteins_value',
							'nutrients.salt_value',
							'nutrients.saturated-fat_value',
							'nutrients.sugars_value'
						],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1683779439,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1685766644,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1696048226,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1703304840,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1704342311,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1706068528,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1708491343,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1709094394,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1709869431,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1710475729,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1710820856,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1712636202,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1713327936,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1715831900,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1718077604,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1725507888,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					},
					{
						fields: [],
						id: 'org-ferrero-france-commerciale',
						images: [],
						import_t: 1744689443,
						manufacturer: 1,
						name: 'ferrero-france-commerciale',
						url: null
					}
				],
				sources_fields: {
					'org-gs1': {
						gln: '3010176200101',
						gpcCategoryCode: '10000161',
						gpcCategoryName:
							'Gâteaux Secs/Biscuits (Longue Conservation)',
						isAllergenRelevantDataProvided: 'true',
						lastChangeDateTime: '2025-04-15T00:57:42+02:00',
						partyName: 'FERRERO FRANCE COMMERCIALE',
						productionVariantDescription: '',
						publicationDateTime: '2025-04-15T00:57:42+02:00'
					}
				},
				states: 'en:to-be-completed, en:nutrition-facts-completed, en:ingredients-completed, en:expiration-date-completed, en:packaging-code-to-be-completed, en:characteristics-to-be-completed, en:origins-to-be-completed, en:categories-completed, en:brands-completed, en:packaging-completed, en:quantity-completed, en:product-name-completed, en:photos-validated, en:packaging-photo-selected, en:nutrition-photo-selected, en:ingredients-photo-selected, en:front-photo-selected, en:photos-uploaded',
				states_hierarchy: [
					'en:to-be-completed',
					'en:nutrition-facts-completed',
					'en:ingredients-completed',
					'en:expiration-date-completed',
					'en:packaging-code-to-be-completed',
					'en:characteristics-to-be-completed',
					'en:origins-to-be-completed',
					'en:categories-completed',
					'en:brands-completed',
					'en:packaging-completed',
					'en:quantity-completed',
					'en:product-name-completed',
					'en:photos-validated',
					'en:packaging-photo-selected',
					'en:nutrition-photo-selected',
					'en:ingredients-photo-selected',
					'en:front-photo-selected',
					'en:photos-uploaded'
				],
				states_tags: [
					'en:to-be-completed',
					'en:nutrition-facts-completed',
					'en:ingredients-completed',
					'en:expiration-date-completed',
					'en:packaging-code-to-be-completed',
					'en:characteristics-to-be-completed',
					'en:origins-to-be-completed',
					'en:categories-completed',
					'en:brands-completed',
					'en:packaging-completed',
					'en:quantity-completed',
					'en:product-name-completed',
					'en:photos-validated',
					'en:packaging-photo-selected',
					'en:nutrition-photo-selected',
					'en:ingredients-photo-selected',
					'en:front-photo-selected',
					'en:photos-uploaded'
				],
				stores: '',
				stores_tags: [],
				taxonomies_enhancer_tags: [
					'ingredients-de-nuss-nugat-creme-is-new-translation-for-en-hazelnut-spread',
					'ingredients-es-crema-de-avellanas-is-new-translation-for-en-hazelnut-spread'
				],
				teams: 'pain-au-chocolat,shark-attack,swipe-studio,stakano,chocolatine,italy,feat',
				teams_tags: [
					'pain-au-chocolat',
					'shark-attack',
					'swipe-studio',
					'stakano',
					'chocolatine',
					'italy',
					'feat'
				],
				traces: 'en:mustard',
				traces_from_ingredients: '',
				traces_from_user: '(pt) en:mustard',
				traces_hierarchy: ['en:mustard'],
				traces_lc: 'pt',
				traces_tags: ['en:mustard'],
				unique_scans_n: 562,
				unknown_ingredients_n: 0,
				unknown_nutrients_tags: [],
				update_key: 'brands',
				vitamins_prev_tags: [],
				vitamins_tags: [],
				weighers_tags: [
					'mairoluin',
					'org-ferrero-france-commerciale',
					'professordoc'
				],
				weighters_tags: []
			},
			status: 1,
			status_verbose: 'product found'
		}
	};

	const parentDiv = ref(props.parentDiv);

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
</script>

<style lang="scss">
	.scan-result-overlay-content {
		width: 100%;
		height: 100%;
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
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
		.title {
			p {
				font-size: 0.8rem;
				font-weight: 300;
			}
			h1 {
				font-size: 1.5em;
				font-weight: 800;
			}
			h2 {
				font-size: 0.9em;
				font-weight: 400;
			}
		}
	}
</style>
