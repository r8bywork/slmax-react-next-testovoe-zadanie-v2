import { UnsplashPhoto } from "@/types/types";
import axios from "axios";

const UNSPLASH_ACCESS_KEY = "TZRQEy-SLTJNw1_UX9xxLKHI1l_orjSRA-9ShnC1zag";
export type UnsplashResponse = {
	data: UnsplashPhoto[];
};

export const getPhotos = async ({
	page,
	per_page,
	order_by,
	category,
}: {
	page?: number;
	per_page?: number;
	order_by?: string;
	category?: string;
}): Promise<UnsplashResponse> => {
	const response = await axios.get(
		`https://api.unsplash.com/topics/${category}/photos`,
		{
			params: {
				category,
				client_id: UNSPLASH_ACCESS_KEY,
				page,
				per_page,
				order_by,
			},
		}
	);

	return response;
};
