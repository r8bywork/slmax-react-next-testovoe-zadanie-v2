import {UnsplashTopics} from "@/types/types";
import axios from "axios";
const UNSPLASH_ACCESS_KEY = "TZRQEy-SLTJNw1_UX9xxLKHI1l_orjSRA-9ShnC1zag";

export type UnsplashResponseTopics = {
    data: UnsplashTopics[];
};

export const getTopics = async (): Promise<UnsplashResponseTopics> => {
    const response = await axios.get(
        `https://api.unsplash.com/topics?client_id=TZRQEy-SLTJNw1_UX9xxLKHI1l_orjSRA-9ShnC1zag`
    );
    return response;
};
