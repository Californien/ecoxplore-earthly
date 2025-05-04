export {};

declare global {
	// Strapi
	interface StrapiPagination {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	}
	interface StrapiMeta {
		pagination: StrapiPagination;
	}
	interface StrapiBase<T> {
		id: number;
		attributes: T;
	}
	interface StrapiResponse<T> {
		data: StrapiBase<T>[];
		meta: StrapiMeta;
	}
	interface StrapiAttributes {
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
	}
	interface StrapiUser {
		id: number;
		username: string;
		email: string;
		password: string;
		resetPasswordToken: string | null;
		confirmationToken: string | null;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: string;
		updatedAt: string;
	}
	interface StrapiAuthResponse {
		jwt: string;
		user: StrapiUser;
	}

	// OpenFoodFacts API
	interface OpenFoodFactsProduct {
		code: string;
		product: {
			_id: string;
			_keywords: string[];
			abbreviated_product_name: string;
			abbreviated_product_name_fr: string;
			abbreviated_product_name_fr_imported: string;
			added_countries_tags: string[];
			additives_n: number;
			additives_original_tags: string[];
			additives_tags: string[];
			allergens: string;
			allergens_from_ingredients: string;
			allergens_from_user: string;
			allergens_hierarchy: string[];
			allergens_imported: string;
			allergens_lc: string;
			allergens_tags: string[];
			amino_acids_prev_tags: string[];
			amino_acids_tags: string[];
			brands: string;
			brands_imported: string;
			brands_old: string;
			brands_tags: string[];
			carbon_footprint_from_known_ingredients_debug: string;
			carbon_footprint_percent_of_known_ingredients: number;
			categories: string;
			categories_hierarchy: string[];
			categories_lc: string;
			categories_old: string;
			categories_properties: {
				[key: string]: string;
			};
			categories_properties_tags: string[];
			categories_tags: string[];
			category_properties: Record<string, unknown>;
			checkers_tags: string[];
			ciqual_food_name_tags: string[];
			cities_tags: string[];
			code: string;
			codes_tags: string[];
			compared_to_category: string;
			complete: number;
			completeness: number;
			conservation_conditions: string;
			conservation_conditions_fr: string;
			conservation_conditions_fr_imported: string;
			correctors_tags: string[];
			countries: string;
			countries_beforescanbot: string;
			countries_hierarchy: string[];
			countries_imported: string;
			countries_lc: string;
			countries_tags: string[];
			created_t: number;
			creator: string;
			customer_service: string;
			customer_service_fr: string;
			customer_service_fr_imported: string;
			data_quality_bugs_tags: string[];
			data_quality_errors_tags: string[];
			data_quality_info_tags: string[];
			data_quality_tags: string[];
			data_quality_warnings_tags: string[];
			data_sources: string;
			data_sources_imported: string;
			data_sources_tags: string[];
			debug_param_sorted_langs: string[];
			ecoscore_data: {
				adjustments: {
					origins_of_ingredients: {
						aggregated_origins: Array<{
							epi_score: string;
							origin: string;
							percent: number;
							transportation_score: number;
						}>;
						epi_score: number;
						epi_value: number;
						origins_from_categories: string[];
						origins_from_origins_field: string[];
						transportation_score: number;
						transportation_scores: Record<string, number>;
						transportation_value: number;
						transportation_values: Record<string, number>;
						value: number;
						values: Record<string, number>;
						warning?: string;
					};
					packaging: {
						non_recyclable_and_non_biodegradable_materials: number;
						packagings: Array<{
							environmental_score_material_score?: number;
							environmental_score_shape_ratio?: number;
							material?: string;
							non_recyclable_and_non_biodegradable?: string;
							number_of_units?: string;
							quantity_per_unit?: string;
							quantity_per_unit_unit?: string;
							quantity_per_unit_value?: string;
							recycling?: string;
							shape?: string;
							weight_measured?: number;
						}>;
						score: number;
						value: number;
						warning: string;
					};
					production_system: {
						labels: string[];
						value: number;
						warning: string;
					};
					threatened_species: {
						ingredient?: string;
						value?: number;
					};
				};
				agribalyse: {
					agribalyse_proxy_food_code: string;
					co2_agriculture: number;
					co2_consumption: number;
					co2_distribution: number;
					co2_packaging: number;
					co2_processing: number;
					co2_total: number;
					co2_transportation: number;
					code: string;
					dqr: string;
					ef_agriculture: number;
					ef_consumption: number;
					ef_distribution: number;
					ef_packaging: number;
					ef_processing: number;
					ef_total: number;
					ef_transportation: number;
					is_beverage: number;
					name_en: string;
					name_fr: string;
					score: number;
					version: string;
				};
				grade: string;
				grades: Record<string, string>;
				missing: {
					labels: number;
					origins: number;
					packagings: number;
				};
				missing_data_warning: number;
				previous_data?: {
					agribalyse: {
						agribalyse_proxy_food_code: string;
						co2_agriculture: number;
						co2_consumption: number;
						co2_distribution: number;
						co2_packaging: number;
						co2_processing: number;
						co2_total: number;
						co2_transportation: number;
						code: string;
						dqr: string;
						ef_agriculture: number;
						ef_consumption: number;
						ef_distribution: number;
						ef_packaging: number;
						ef_processing: number;
						ef_total: number;
						ef_transportation: number;
						is_beverage: number;
						name_en: string;
						name_fr: string;
						score: number;
					};
					grade: string;
					score: number;
				};
				score: number;
				scores: Record<string, number>;
				status: string;
			};
			ecoscore_grade: string;
			ecoscore_score: number;
			ecoscore_tags: string[];
			editors_tags: string[];
			emb_codes: string;
			emb_codes_orig: string;
			emb_codes_tags: string[];
			entry_dates_tags: string[];
			environment_impact_level: string;
			environment_impact_level_tags: string[];
			expiration_date: string;
			food_groups: string;
			food_groups_tags: string[];
			generic_name: string;
			generic_name_de: string;
			generic_name_en: string;
			generic_name_es: string;
			generic_name_fr: string;
			generic_name_fr_imported: string;
			generic_name_it: string;
			generic_name_pl: string;
			generic_name_pt: string;
			generic_name_ro: string;
			grades: Record<string, unknown>;
			id: string;
			image_front_small_url: string;
			image_front_thumb_url: string;
			image_front_url: string;
			image_ingredients_small_url: string;
			image_ingredients_thumb_url: string;
			image_ingredients_url: string;
			image_nutrition_small_url: string;
			image_nutrition_thumb_url: string;
			image_nutrition_url: string;
			image_packaging_small_url: string;
			image_packaging_thumb_url: string;
			image_packaging_url: string;
			image_small_url: string;
			image_thumb_url: string;
			image_url: string;
			images: {
				[key: string]: {
					sizes: {
						[size: string]: {
							h: number;
							w: number;
						};
						full?: {
							h: number;
							w: number;
						};
					};
					uploaded_t?: number | string;
					uploader?: string;
					angle?: string | number;
					coordinates_image_size?: string;
					geometry?: string;
					imgid?: string;
					normalize?: string | null;
					rev?: string;
					white_magic?: string | null;
					x1?: string;
					x2?: string;
					y1?: string;
					y2?: string;
				};
			};
			informers_tags: string[];
			ingredients: Array<{
				id: string;
				is_in_taxonomy?: number;
				percent_estimate?: number;
				rank?: number;
				text: string;
				ciqual_proxy_food_code?: string;
				has_sub_ingredients?: string;
				percent?: number;
				vegan?: string;
				vegetarian?: string;
				ciqual_food_code?: string;
				ecobalyse_code?: string;
				from_palm_oil?: string;
				processing?: string;
			}>;
			ingredients_analysis: {
				[key: string]: string[];
			};
			ingredients_analysis_tags: string[];
			ingredients_debug: Array<string | null>;
			ingredients_from_or_that_may_be_from_palm_oil_n: number;
			ingredients_from_palm_oil_n: number;
			ingredients_from_palm_oil_tags: string[];
			ingredients_hierarchy: string[];
			ingredients_ids_debug: string[];
			ingredients_lc: string;
			ingredients_n: number;
			ingredients_n_tags: string[];
			ingredients_non_nutritive_sweeteners_n: number;
			ingredients_original_tags: string[];
			ingredients_percent_analysis: number;
			ingredients_sweeteners_n: number;
			ingredients_tags: string[];
			ingredients_text: string;
			ingredients_text_de: string;
			ingredients_text_de_ocr_1648897071: string;
			ingredients_text_de_ocr_1648897071_result: string;
			ingredients_text_de_ocr_1648990410: string;
			ingredients_text_de_ocr_1648990410_result: string;
			ingredients_text_debug: string;
			ingredients_text_en: string;
			ingredients_text_es: string;
			ingredients_text_fr: string;
			ingredients_text_fr_imported: string;
			ingredients_text_it: string;
			ingredients_text_pl: string;
			ingredients_text_pt: string;
			ingredients_text_ro: string;
			ingredients_text_with_allergens: string;
			ingredients_text_with_allergens_de: string;
			ingredients_text_with_allergens_es: string;
			ingredients_text_with_allergens_fr: string;
			ingredients_text_with_allergens_it: string;
			ingredients_text_with_allergens_pt: string;
			ingredients_that_may_be_from_palm_oil_n: number;
			ingredients_that_may_be_from_palm_oil_tags: string[];
			ingredients_with_specified_percent_n: number;
			ingredients_with_specified_percent_sum: number;
			ingredients_with_unspecified_percent_n: number;
			ingredients_with_unspecified_percent_sum: number;
			ingredients_without_ciqual_codes: string[];
			ingredients_without_ciqual_codes_n: number;
			ingredients_without_ecobalyse_ids: string[];
			ingredients_without_ecobalyse_ids_n: number;
			interface_version_created: string;
			interface_version_modified: string;
			known_ingredients_n: number;
			labels: string;
			labels_hierarchy: string[];
			labels_lc: string;
			labels_old: string;
			labels_tags: string[];
			lang: string;
			lang_imported: string;
			languages: {
				[key: string]: number;
			};
			languages_codes: {
				[key: string]: number;
			};
			languages_hierarchy: string[];
			languages_tags: string[];
			last_edit_dates_tags: string[];
			last_editor: string;
			last_image_dates_tags: string[];
			last_image_t: number;
			last_modified_by: string;
			last_modified_t: number;
			last_updated_t: number;
			lc: string;
			lc_imported: string;
			link: string;
			main_countries_tags: string[];
			manufacturing_places: string;
			manufacturing_places_tags: string[];
			max_imgid: string;
			minerals_prev_tags: string[];
			minerals_tags: string[];
			misc_tags: string[];
			no_nutrition_data: string;
			no_nutrition_data_imported: string;
			nova_group: number;
			nova_group_debug: string;
			nova_groups: string;
			nova_groups_markers: {
				[key: string]: Array<[string, string]>;
			};
			nova_groups_tags: string[];
			nucleotides_prev_tags: string[];
			nucleotides_tags: string[];
			nutrient_levels: {
				fat: string;
				salt: string;
				'saturated-fat': string;
				sugars: string;
			};
			nutrient_levels_tags: string[];
			nutriments: {
				[key: string]: unknown; // More specific typing possible here
			};
			nutriscore: {
				[key: string]: {
					category_available: number;
					data: {
						energy?: number;
						energy_points?: number;
						energy_value?: number;
						fiber?: number;
						fiber_points?: number;
						fiber_value?: number;
						fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
						fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
						fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
						is_beverage?: number;
						is_cheese?: number;
						is_fat?: number;
						is_water?: number;
						negative_points?: number;
						positive_points?: number;
						proteins?: number;
						proteins_points?: number;
						proteins_value?: number;
						saturated_fat?: number;
						saturated_fat_points?: number;
						saturated_fat_value?: number;
						sodium?: number;
						sodium_points?: number;
						sodium_value?: number;
						sugars?: number;
						sugars_points?: number;
						sugars_value?: number;
						components?: {
							negative?: Array<{
								id: string;
								points: number;
								points_max: number;
								unit: string;
								value: number;
							}>;
							positive?: Array<{
								id: string;
								points: number;
								points_max: number;
								unit: string;
								value: number | null;
							}>;
						};
						count_proteins?: number;
						count_proteins_reason?: string;
						is_fat_oil_nuts_seeds?: number;
						is_red_meat_product?: number;
						is_water?: number;
						negative_points_max?: number;
						positive_nutrients?: string[];
						positive_points_max?: number;
					};
					grade: string;
					nutrients_available: number;
					nutriscore_applicable: number;
					nutriscore_computed: number;
					score: number;
				};
			};
			nutriscore_2021_tags: string[];
			nutriscore_2023_tags: string[];
			nutriscore_data: {
				components: {
					negative: Array<{
						id: string;
						points: number;
						points_max: number;
						unit: string;
						value: number;
					}>;
					positive: Array<{
						id: string;
						points: number;
						points_max: number;
						unit: string;
						value: number | null;
					}>;
				};
				count_proteins: number;
				count_proteins_reason: string;
				grade: string;
				is_beverage: number;
				is_cheese: number;
				is_fat_oil_nuts_seeds: number;
				is_red_meat_product: number;
				is_water: number;
				negative_points: number;
				negative_points_max: number;
				positive_nutrients: string[];
				positive_points: number;
				positive_points_max: number;
				score: number;
			};
			nutriscore_grade: string;
			nutriscore_score: number;
			nutriscore_score_opposite: number;
			nutriscore_tags: string[];
			nutriscore_version: string;
			nutrition_data: string;
			nutrition_data_per: string;
			nutrition_data_per_imported: string;
			nutrition_data_prepared: string;
			nutrition_data_prepared_per: string;
			nutrition_grade_fr: string;
			nutrition_grades: string;
			nutrition_grades_tags: string[];
			nutrition_score_beverage: number;
			nutrition_score_debug: string;
			nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: number;
			nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: number;
			nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
			nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
			nutrition_score_warning_no_fiber: number;
			obsolete: string;
			obsolete_imported: string;
			obsolete_since_date: string;
			origin: string;
			origin_de: string;
			origin_en: string;
			origin_es: string;
			origin_fr: string;
			origin_it: string;
			origin_pl: string;
			origin_pt: string;
			origin_ro: string;
			origins: string;
			origins_hierarchy: string[];
			origins_lc: string;
			origins_old: string;
			origins_tags: string[];
			other_nutritional_substances_prev_tags: string[];
			other_nutritional_substances_tags: string[];
			owner: string;
			owner_fields: {
				[key: string]: number;
			};
			owner_imported: string;
			owners_tags: string;
			packaging: string;
			packaging_hierarchy: string[];
			packaging_imported: string;
			packaging_lc: string;
			packaging_materials_tags: string[];
			packaging_old: string;
			packaging_old_before_taxonomization: string;
			packaging_recycling_tags: string[];
			packaging_shapes_tags: string[];
			packaging_tags: string[];
			packaging_text: string;
			packaging_text_de: string;
			packaging_text_en: string;
			packaging_text_es: string;
			packaging_text_fr: string;
			packaging_text_it: string;
			packaging_text_pl: string;
			packaging_text_pt: string;
			packaging_text_ro: string;
			packagings: Array<{
				material?: string;
				number_of_units?: string;
				quantity_per_unit?: string;
				quantity_per_unit_unit?: string;
				quantity_per_unit_value?: string;
				recycling?: string;
				shape?: string;
				weight_measured?: number;
			}>;
			packagings_complete: number;
			packagings_materials: {
				all?: {
					weight: number;
					weight_100g: number;
					weight_percent: number;
				};
				[key: string]: {
					weight?: number;
					weight_100g?: number;
					weight_percent?: number;
				};
			};
			packagings_materials_main: string;
			packagings_n: number;
			photographers_tags: string[];
			pnns_groups_1: string;
			pnns_groups_1_tags: string[];
			pnns_groups_2: string;
			pnns_groups_2_tags: string[];
			popularity_key: number;
			popularity_tags: string[];
			producer_version_id: string;
			producer_version_id_imported: string;
			product: object;
			product_name: string;
			product_name_de: string;
			product_name_en: string;
			product_name_es: string;
			product_name_fr: string;
			product_name_fr_imported: string;
			product_name_it: string;
			product_name_pl: string;
			product_name_pt: string;
			product_name_ro: string;
			product_quantity: string;
			product_quantity_unit: string;
			product_type: string;
			purchase_places: string;
			purchase_places_tags: string[];
			quantity: string;
			quantity_imported: string;
			removed_countries_tags: string[];
			rev: number;
			scans_n: number;
			schema_version: number;
			scores: Record<string, unknown>;
			selected_images: {
				[key: string]: {
					[size: string]: {
						[lang: string]: string;
					};
				};
			};
			serving_quantity: number;
			serving_quantity_unit: string;
			serving_size: string;
			serving_size_imported: string;
			sortkey: number;
			sources: Array<{
				fields: string[];
				id: string;
				images: string[];
				import_t: number;
				manufacturer: number | string;
				name: string;
				url: string | null;
			}>;
			sources_fields: {
				[key: string]: {
					gln: string;
					gpcCategoryCode: string;
					gpcCategoryName: string;
					isAllergenRelevantDataProvided: string;
					lastChangeDateTime: string;
					partyName: string;
					productionVariantDescription: string;
					publicationDateTime: string;
				};
			};
			states: string;
			states_hierarchy: string[];
			states_tags: string[];
			stores: string;
			stores_tags: string[];
			taxonomies_enhancer_tags: string[];
			teams: string;
			teams_tags: string[];
			traces: string;
			traces_from_ingredients: string;
			traces_from_user: string;
			traces_hierarchy: string[];
			traces_lc: string;
			traces_tags: string[];
			unique_scans_n: number;
			unknown_ingredients_n: number;
			unknown_nutrients_tags: string[];
			update_key: string;
			vitamins_prev_tags: string[];
			vitamins_tags: string[];
			weighers_tags: string[];
			weighters_tags: string[];
		};
		status: number;
		status_verbose: string;
	}
	interface OpenFoodFactsProductRef {
		value: OpenFoodFactsProduct | null | undefined;
	}
}
