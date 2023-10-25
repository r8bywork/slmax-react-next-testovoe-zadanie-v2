"use client"
import React, { useState} from 'react';
import {Button, Menu} from 'antd';
import {UnsplashTopics} from "@/types/types";
import {redirect} from "next/navigation";

interface iBar {
    onCategoryChange: (category: string) => void;
    onSortChange: (order_by: string) => void;
    categories: UnsplashTopics[];
}
const Bar: React.FC<iBar> = ({onCategoryChange, categories, onSortChange}) => {
    const [current, setCurrent] = useState("animals");
    const [currentSort, setCurrentSort] = useState("latest");
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/";
    }
    return (
        <div>
            <Menu onClick={(e) => { setCurrent(e.key);onCategoryChange(e.key) } }
            selectedKeys={[current]} mode="horizontal" className={'mb-5'}>
                {categories?.map((category) => (
                    <Menu.Item key={category.slug}>{category.title}</Menu.Item>
                ))}
            </Menu>
            <Menu onClick={(e) => { setCurrentSort(e.key); onSortChange(e.key) }}
                selectedKeys={[currentSort]} mode="horizontal" >
                <Menu.Item key="latest">Latest</Menu.Item>
                <Menu.Item key="oldest">Oldest</Menu.Item>
                <Menu.Item key="popular">Popular</Menu.Item>
                <Menu.Item key="logout">

                </Menu.Item>
            </Menu>
            <Button key={"logout"} onClick={handleLogout}>Log Out</Button>

        </div>
    );
};

export default Bar;
