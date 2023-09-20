export type UserInfo = {
	country: string;
	display_name: string;
	email: string;
	explicit_content: ExplicitContent;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	product: string;
	type: string;
	uri: string;
};

type ExplicitContent = {
	filter_enabled: boolean;
	filter_locked: boolean;
};

type ExternalUrls = {
	spotify: string;
};

type Image = {
	url: string;
	height?: number;
	width?: number;
};
