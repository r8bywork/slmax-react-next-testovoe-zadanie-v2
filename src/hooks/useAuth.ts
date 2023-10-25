import { User } from "@/interfaces";
import { createHmac } from "crypto";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const token = useLocalStorage<string | null>("token", "");
	const [registeredUsers, setRegisteredUsers] = useLocalStorage<User[]>(
		"users",
		[]
	);

	const generateToken = (email: string, password: string): string => {
		const salt = "secret123";
		const hash = createHmac("sha256", salt)
			.update(email + password)
			.digest("hex");
		return salt + "." + hash;
	};

	const fetchUserData = async () => {
		if (localStorage.getItem("token") !== null) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	};
	useEffect(() => {
		fetchUserData().catch((error) => {
			throw new Error(error);
		});
	}, [token]);

	const register = async (email: string, password: string) => {
		const hashedPassword = generateToken(email, password);
		const existingUser = registeredUsers?.find((user) => user.email === email);

		if (existingUser) {
			alert("Пользователь уже существует");
			return;
		}

		const newUser: User = {
			email,
			password: hashedPassword,
		};

		setRegisteredUsers((prevRegisteredUsers) => {
			return [...(prevRegisteredUsers ?? []), newUser];
		});

		localStorage.setItem("token", hashedPassword);
		setIsAuthenticated(true);
	};

	const login = async (email: string, password: string) => {
		const user = registeredUsers?.find(
			(user) =>
				user.email === email && user.password === generateToken(email, password)
		);
		if (user) {
			localStorage.setItem("token", user.password);
			setIsAuthenticated(true);
		} else {
			alert("Неверные данные для входа");
		}
	};

	return {
		isAuthenticated,
		token,
		fetchUserData,
		login,
		register,
	};
};
