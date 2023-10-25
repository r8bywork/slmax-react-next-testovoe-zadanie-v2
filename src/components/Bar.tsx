"use client";
import { sortOptions } from "@/menuConfigs";
import { UnsplashTopics } from "@/types/types";
import { Button, Menu } from "antd";
import React, { useState } from "react";

interface iBar {
	onCategoryChange: (category: string) => void;
	onSortChange: (order_by: string) => void;
	categories: UnsplashTopics[];
	onFavoritesTabClick: () => void;
	disabled?: boolean;
}
const Bar: React.FC<iBar> = ({
	onCategoryChange,
	categories,
	onSortChange,
	onFavoritesTabClick,
	disabled,
}) => {
	const [current, setCurrent] = useState<string>("animals");
	const [currentSort, setCurrentSort] = useState<string>("latest");
	const handleLogout = () => {
		localStorage.removeItem(`token`);
		window.location.href = "/auth";
	};
	return (
		<div>
			<Menu
				disabled={disabled}
				onClick={(e) => {
					setCurrent(e.key);
					onCategoryChange(e.key);
				}}
				items={categories.map((category) => ({
					key: category.slug,
					label: category.title,
				}))}
				selectedKeys={[current]}
				mode="horizontal"
				className={"mb-5"}
			/>

			<Menu
				disabled={disabled}
				items={sortOptions}
				onClick={(e) => {
					setCurrentSort(e.key);
					onSortChange(e.key);
				}}
				selectedKeys={[currentSort]}
				mode="horizontal"
			/>
			<div className="mt-5">
				<Button key={"logout"} className="mr-5" danger onClick={handleLogout}>
					Log Out
				</Button>
				<Button key={"favorites"} onClick={onFavoritesTabClick}>
					Favorites
				</Button>
			</div>
		</div>
	);
};

export default Bar;
