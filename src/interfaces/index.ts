import { UnsplashPhoto, UnsplashTopics } from "@/types/types";
export interface User {
	email: string;
	password: string;
}

export interface iPhotos {
	photos: UnsplashPhoto[];
	loading?: boolean;
	showFavorites?: boolean;
}

export interface iBar {
	onCategoryChange: (category: string) => void;
	onSortChange: (order_by: string) => void;
	categories: UnsplashTopics[];
	onFavoritesTabClick: () => void;
	disabled?: boolean;
}
