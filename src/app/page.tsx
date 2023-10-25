"use client"
import React, {useEffect, useRef, useState} from "react";
import { useAuth } from "@/hooks/useAuth";
import { Form, Button, Input } from "antd";
import {redirect} from "next/navigation";

const IndexPage: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {
		isAuthenticated,
		token,
		fetchUserData,
		login,
		register,
	} = useAuth()

	const handleLogin = async () => {
		await login(email, password);
	};

	const handleRegister = async () => {
		await register(email, password);
	};
	return (
		<div>
			 {isAuthenticated && redirect("/photos")}
			<h1>Авторизация</h1>
			<Form onFinish={handleLogin} className={'mb-14'}>
				<Form.Item label="Логин">
					<Input value={email} onChange={(e) => setEmail(e.target.value)} />
				</Form.Item>
				<Form.Item label="Пароль">
					<Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				<Button type="default" htmlType="submit">
					Авторизоваться
				</Button>
			</Form>

			<h1>Регистрация</h1>
			<Form onFinish={handleRegister}>
				<Form.Item label="Логин">
					<Input value={email} onChange={(e) => setEmail(e.target.value)} />
				</Form.Item>
				<Form.Item label="Пароль">
					<Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
				</Form.Item>
				<Button type="default" htmlType="submit">
					Зарегистрироваться
				</Button>
			</Form>
		</div>
	);
};

export default IndexPage;
