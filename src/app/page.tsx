"use client"
import {useEffect} from "react";
import {redirect} from "next/navigation";

const HomePage = () => {

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			redirect('/photos');
		} else {
			redirect('/auth');
		}
	}, []);
};

export default HomePage;