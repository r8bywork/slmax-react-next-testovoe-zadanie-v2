"use client"
import type { PropsWithChildren } from "react";
import Bar from "@/components/Bar";
import {useEffect, useState} from "react";
import PhotosPage from "@/app/photos/page";
import {getTopics, UnsplashResponseTopics} from "@/api/topics";
import {UnsplashPhoto, UnsplashTopics} from "@/types/types";
import {getPhotos, UnsplashResponse} from "@/api/photos";
export default function PhotosLayout ({children}: PropsWithChildren<unknown>) {
    const sortByOptions = ["popularity", "date"];
    const [categories, setCategories] = useState<UnsplashTopics[]>([]);
    const [category, setCategory] = useState("animals");

    //photos
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true)
    const [order_by, setOrderBy] = useState("")
    // latest, oldest, popular; default: latest
    useEffect(() => {
        const fetchTopics = async () => {
            const response: UnsplashResponseTopics = await getTopics();
            setCategories(response.data);
        };
        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchPhotos = async () => {
            const response: UnsplashResponse = await getPhotos({
                page,
                per_page: 5,
                category,
                order_by,
            });
            setPhotos(response.data);
            setLoading(false);
        };
        fetchPhotos()
    }, [page, category, order_by]);

    const handleCategoryChange = (category: string) => {
        setCategory(category);
    };
    const handleSortChange = (order_by: string) => {
        setOrderBy(order_by);
    };

    return (
        <div className={'mt-10 mb-10'}>
            <div className={'mb-10'}>
                <Bar onSortChange={handleSortChange} categories={categories} onCategoryChange={handleCategoryChange}/>
            </div>
            <PhotosPage photos={photos} category={category} loading={loading}/>
        </div>)
}