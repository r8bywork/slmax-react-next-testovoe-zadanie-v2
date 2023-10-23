"use client"
import React, {useEffect, useState} from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {getTopics, UnsplashResponse} from "@/api/topics";
import {UnsplashTopics} from "@/types/types";

const Bar: React.FC = () => {
    const [current, setCurrent] = useState("");
    const [categories, setCategories] = useState<UnsplashTopics[]>([]);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    useEffect(() => {
        const fetchTopics = async () => {
            const response: UnsplashResponse = await getTopics();
            setCategories(response.data);
        };
        fetchTopics();
    }, []);

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" >
            {categories.map((category) => (
                <Menu.Item key={category.slug}>{category.title}</Menu.Item>
            ))}
        </Menu>
    );
};

export default Bar;
