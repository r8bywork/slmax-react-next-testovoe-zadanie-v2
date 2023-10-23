export type UnsplashPhoto = {
	id: string;
	urls: {
		regular: string;
	};
	user: {
		name: string;
		profile_image: {small: string, medium:string, large: string}
	}
	alt_description: string;
	categories: string[];
	description: string;
	created_at: string;
	links: { html: string; }
};

export type UnsplashTopics = {
	id: string;
	slug: string;
	title: string;
}