"use client"
import React, { useState} from 'react';
import {Button, Menu} from 'antd';
import {UnsplashTopics} from "@/types/types";
import {redirect} from "next/navigation";
import {sortOptions} from "@/menuConfigs";

interface iBar {
    onCategoryChange: (category: string) => void;
    onSortChange: (order_by: string) => void;
    categories: UnsplashTopics[];
}
const Bar: React.FC<iBar> = ({onCategoryChange, categories, onSortChange}) => {
    const [current, setCurrent] = useState<string>("animals");
    const [currentSort, setCurrentSort] = useState<string>("latest");
    const handleLogout = () => {
        console.log("asd")
        localStorage.removeItem(`token`) // Функция redirect() не работает, потому что она вызывается в контексте компонента React, а не в контексте браузера
        window.location.href = "/auth";
    }
    return (
        <div>
            <Menu onClick={(e) => { setCurrent(e.key);onCategoryChange(e.key) }} items={categories.map((category) => ({
                key: category.slug,
                label: category.title,
            }))} selectedKeys={[current]} mode="horizontal" className={'mb-5'} />

            <Menu items={sortOptions} onClick={(e) => { setCurrentSort(e.key); onSortChange(e.key) }} selectedKeys={[currentSort]} mode="horizontal" />
            <Button key={"logout"} onClick={handleLogout}>Log Out</Button>
        </div>
    );
};

export default Bar;
