import { UnsplashPhoto } from "@/types/types";
import React from "react";
import {Avatar, Card } from "antd";
import "./photos.css"

interface iPhotos {
    photos: UnsplashPhoto[];
    loading: boolean;
}
const PhotosPage: React.FC<iPhotos>= ({ photos, loading}) => {
    const {Meta} = Card;
    return (
        <div className="grid">
            {photos?.map((photo: UnsplashPhoto) => (
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
