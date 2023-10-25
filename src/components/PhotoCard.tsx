import { UnsplashPhoto } from "@/types/types";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import React, { useEffect, useState } from "react";
import "../app/photos/photos.css";

interface iPhotos {
	photos: UnsplashPhoto[];
	loading?: boolean;
	showFavorites?: boolean;
}
const PhotoCard: React.FC<iPhotos> = ({ photos, loading, showFavorites }) => {
	const [favorites, setFavorites] = useState<
		{ id: string; regularUrl: string }[]
	>([]);
	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	const toggleFavorite = (id: string, regularUrl: string) => {
		const favoriteItem = { id, regularUrl };
		const existingIndex = favorites.findIndex((item) => item.id === id);
		if (existingIndex !== -1) {
			const updatedFavorites = [...favorites];
			updatedFavorites.splice(existingIndex, 1);
			setFavorites(updatedFavorites);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		} else {
			const updatedFavorites = [...favorites, favoriteItem];
			setFavorites(updatedFavorites);
			localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
		}
	};

	const { Meta } = Card;

	return (
		<div className="grid">
			{photos.map((photo: UnsplashPhoto) => {
				const isFavorite = favorites.some((item) => item.id === photo.id);
				if (showFavorites && !isFavorite) {
					return null;
				}
				return (
					<Card
						loading={loading}
						key={photo.id}
						hoverable
						actions={[
							isFavorite ? (
								<StarFilled
									key="favorites"
									onClick={() => toggleFavorite(photo.id, photo.urls.regular)}
								/>
							) : (
								<StarOutlined
									key="favorites"
									onClick={() => toggleFavorite(photo.id, photo.urls.regular)}
								/>
							),
						]}
						style={{ width: 400, minHeight: 400 }}
						cover={
							<img
								alt={photo.alt_description}
								src={photo.urls.regular}
								style={{ height: 300 }}
							/>
						}
					>
						<Meta
							avatar={<Avatar src={photo.user.profile_image.small} />}
							title={photo.user.name}
							description={photo.created_at}
						/>
					</Card>
				);
			})}
		</div>
	);
};
export default PhotoCard;
