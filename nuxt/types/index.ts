declare global {
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
}

export {};
