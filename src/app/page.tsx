"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
	useEffect(() => {
		if (localStorage.getItem("token") !== null) {
			redirect("/photos");
		} else {
			redirect("/auth");
		}
	}, []);
};

export default HomePage;
