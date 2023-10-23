"use client";
import { UnsplashPhoto } from "@/types/types";
import { useEffect, useState } from "react";
import { UnsplashResponse, getPhotos } from "@/api/photos";
import {Avatar, Card } from "antd";
import "./photos.css"
const PhotosPage = () => {
    const {Meta} = Card;
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [page, setPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    // const [sortBy, setSortBy] = useState("popularity");
    useEffect(() => {
        const fetchPhotos = async () => {

            const response: UnsplashResponse = await getPhotos({
                page,
                per_page: 12,
            });
            console.log(response);
            setPhotos(response.data);
            setLoading(false);
        };

        fetchPhotos();
    }, [page]);

    return (
        <div className="grid">
            {photos?.map((photo: UnsplashPhoto, index) => (
                <Card
                    loading={loading}
                    key={photo.id}
                    hoverable
                    style={{ width: 400, height: 400 }}
                    cover={
                        <img alt={photo.alt_description} src={photo.urls.regular} style={{ height: 300}}/>
                    }
                >
                    <Meta avatar={<Avatar src={photo.user.profile_image.small} />}
                          title={photo.user.name}
                          description={photo.created_at}
                    />
                </Card>
            ))}
        </div>
    );
};

export default PhotosPage;
