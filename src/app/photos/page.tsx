"use client";
import { getPhotos } from "@/api/photos";
import { getTopics } from "@/api/topics";
import Bar from "@/components/Bar";
import PhotoCard from "@/components/PhotoCard";
import { UnsplashPhoto, UnsplashTopics } from "@/types/types";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";

const PhotosPage: React.FC = () => {
	const [categories, setCategories] = useState<UnsplashTopics[]>([]);
	const [category, setCategory] = useState("animals");
	const [order_by, setOrderBy] = useState("latest");
	const [showFavorites, setShowFavorites] = useState(false);

	//pages
	const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
	const [loading, setLoading] = useState(true);

	//pagination
	const [pageSize, setPageSize] = useState(10);
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		getTopics()
			.then((response) => setCategories(response.data))
			.catch((error) => {
				throw new Error(error.message);
			});
	}, []);

	useEffect(() => {
		getPhotos({
			page,
			per_page: pageSize,
			category,
			order_by,
		})
			.then((response) => {
				setTotal(parseInt(response.headers.get("X-Total") || "0"));
				setPhotos(response.data);
				setLoading(false);
			})
			.catch((error) => {
				throw new Error(error.message);
			});
	}, [page, category, order_by, pageSize]);

	const handlePaginationChange = (
		page: number,
		pageSize: number | undefined
	) => {
		setPage(page);
		setPageSize(pageSize ?? 10);
	};

	const handleFavoritesTabClick = () => {
		setShowFavorites((prevShowFavorites) => !prevShowFavorites);
	};

	return (
		<div className={"mt-10 mb-10"}>
			<div className={"mb-10"}>
				<Bar
					disabled={showFavorites ?? false}
					onSortChange={(order_by) => setOrderBy(order_by)}
					categories={categories}
					onCategoryChange={(category) => {
						setCategory(category);
						setPage(1);
					}}
					onFavoritesTabClick={handleFavoritesTabClick}
				/>
			</div>
			<div className={"mb-10"}>
				<PhotoCard
					photos={photos}
					loading={loading}
					showFavorites={showFavorites}
				/>
			</div>
			<Pagination
				disabled={showFavorites ?? false}
				current={page}
				pageSize={pageSize}
				total={total}
				onChange={handlePaginationChange}
				showSizeChanger
				onShowSizeChange={handlePaginationChange}
				pageSizeOptions={[5, 10, 20, 30]}
			/>
		</div>
	);
};
export default PhotosPage;

// import {getServerSideProps} from "@/app/photos/index2"; rename index2 to index if u wanna server side
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
