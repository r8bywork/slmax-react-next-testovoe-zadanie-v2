"use client"
import Bar from "@/components/Bar";
import {useEffect, useState} from "react";
import PhotosPage from "@/app/photos/page";
import {getTopics, UnsplashResponseTopics} from "@/api/topics";
import {UnsplashPhoto, UnsplashTopics} from "@/types/types";
import {getPhotos, UnsplashResponse} from "@/api/photos";
import {Pagination} from "antd";

export default function PhotosLayout () {
    const [categories, setCategories] = useState<UnsplashTopics[]>([]);
    const [category, setCategory] = useState("animals");
    const [order_by, setOrderBy] = useState("")

    //photos
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [loading, setLoading] = useState(true)

    //pagination
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

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
                per_page: pageSize,
                category,
                order_by,
            });
            setTotal(parseInt(response.headers.get("X-Total") || "0"));
            setPhotos(response.data);
            setLoading(false);
        };
        fetchPhotos()
    }, [page, category, order_by, pageSize]);

    const handlePaginationChange = (page: number, pageSize: number | undefined) => {
        setPage(page);
        setPageSize(pageSize || 10);
        console.log(page, pageSize);
    };
    return (
    <div className={'mt-10 mb-10'}>
        <div className={'mb-10'}>
            <Bar onSortChange={(order_by) => setOrderBy(order_by)} categories={categories} onCategoryChange={(category) => {setCategory(category); setPage(1)}}/>
        </div>
        <div className={'mb-10'}>
            <PhotosPage photos={photos} category={category} loading={loading}/>
        </div>
        <Pagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={handlePaginationChange}
            showSizeChanger
            onShowSizeChange={handlePaginationChange}
            pageSizeOptions={[5,10,20,30]}
        />

    </div>)
}