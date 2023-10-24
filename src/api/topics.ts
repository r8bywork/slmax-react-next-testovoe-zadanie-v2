import {UnsplashTopics} from "@/types/types";
import axios from "axios";

export type UnsplashResponseTopics = {
    data: UnsplashTopics[];
};

const UNSPLASH_ACCESS_KEY = "TZRQEy-SLTJNw1_UX9xxLKHI1l_orjSRA-9ShnC1zag";
export const getTopics = async (): Promise<UnsplashResponseTopics> => {
    const response = await axios.get(
        `https://api.unsplash.com/topics?client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response;
};
