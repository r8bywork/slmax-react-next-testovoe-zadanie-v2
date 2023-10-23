import { UnsplashPhoto } from "@/types/types";
import axios from "axios";
const UNSPLASH_ACCESS_KEY = "TZRQEy-SLTJNw1_UX9xxLKHI1l_orjSRA-9ShnC1zag";

export type UnsplashResponse = {
	data: UnsplashPhoto[];
};

export const getPhotos = async ({
	page,
	per_page,
}: {
	page?: number;
	per_page?: number;
}): Promise<UnsplashResponse> => {
	const response = await axios.get(
		`https://api.unsplash.com/photos?client_id=${UNSPLASH_ACCESS_KEY}&page=${page}&per_page=${per_page}`
	);
	return response;
};
