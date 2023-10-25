"use client"
import Bar from "@/components/Bar";
import React, {useEffect, useState} from "react";
import {getTopics} from "@/api/topics";
import {UnsplashPhoto, UnsplashTopics} from "@/types/types";
import {getPhotos} from "@/api/photos";
import {Pagination} from "antd";
import PhotoCard from "@/components/PhotoCard";
// import {getServerSideProps} from "@/app/photos/index";

const PhotosPage:React.FC = () =>{
    const [categories, setCategories] = useState<UnsplashTopics[]>([]);
    const [category, setCategory] = useState("animals");
    const [order_by, setOrderBy] = useState("latest")

    //pages
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [loading, setLoading] = useState(true)

    //pagination
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);


    // Check if getServerSideProps is server side function === true
    // function isServerSide() {
    //     return !window.location.href.includes("getInitialProps");
    // }

    //Server Side getServerSideProps in index2.tsx
    // useEffect(() => {
    //     const fetchPhotos = async () => {
    //         const [categoriesResponse,photos] = await getServerSideProps(category, page, pageSize, order_by);
    //         setCategories(categoriesResponse.data);
    //         setPhotos(photos.data);
    //         setTotal(parseInt(photos.headers.get("X-Total") || "0"));
    //         setLoading(false);
    //     };
    //
    //     fetchPhotos();
    // }, [page, category, order_by, pageSize]);

    useEffect(() => {
        const fetchTopics = () => {
            getTopics()
                .then((response) => setCategories(response.data))
                .catch(error => {throw new Error(error.message)});
        };
        console.log("Topics")
        fetchTopics();
    }, []);

    useEffect(() => {
        const fetchPhotos = () => {
            getPhotos({
                page,
                per_page: pageSize,
                category,
                order_by,
            }).then((response) => {
                setTotal(parseInt(response.headers.get("X-Total") || "0"));
                setPhotos(response.data);
                setLoading(false);
            }).catch((error) => {
                throw new Error(error.message);
            });

        };
        console.log("Photos")
        fetchPhotos()
    }, [page, category, order_by, pageSize]);

    const handlePaginationChange = (page: number, pageSize: number | undefined) => {
        setPage(page);
        setPageSize(pageSize || 10);
    };

    return (
        <div className={'mt-10 mb-10'}>
            <div className={'mb-10'}>
                <Bar onSortChange={(order_by) => setOrderBy(order_by)}
                     categories={categories}
                     onCategoryChange={(category) => {setCategory(category); setPage(1)}}/>
            </div>
            <div className={'mb-10'}>
                <PhotoCard photos={photos} loading={loading}/>
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
export default PhotosPage