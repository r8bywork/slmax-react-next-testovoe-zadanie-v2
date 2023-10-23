"use client";
import { UnsplashPhoto } from "@/types/types";
import { useEffect, useState } from "react";
import { UnsplashResponse, getPhotos } from "./api/photos";

const PhotosPage = () => {
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
	const [page, setPage] = useState(1);
	const [categories, setCategories] = useState([]);
	// const [sortBy, setSortBy] = useState("popularity");
	useEffect(() => {
		const fetchPhotos = async () => {
			const response: UnsplashResponse = await getPhotos({
				page,
				per_page: 12,
			});
			console.log(response);
			setPhotos(response.data);
		};

		fetchPhotos();
	}, [page]);

	return (
		<div>
			<h1>Photos</h1>

			{photos?.map((photo: UnsplashPhoto) => (
				<img
					key={photo.id}
					src={photo.urls.regular}
					alt={photo.alt_description}
				/>
			))}
		</div>
	);
};

export default PhotosPage;
