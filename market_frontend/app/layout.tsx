"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user, setUser } = useStore();
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		async function getUser() {
			const response = await fetch("http://127.0.0.1:8000/me", {
				method: "GET",
				cache: "no-store",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!response.ok) {
				router.push("/login");
				throw new Error("Login failed");
			}

			const data = await response.json();
			return data;
		}

		getUser().then((user) => {
			user["token"] = token;
			setUser(user);
			router.push("/products");
		});
	}, []);

	async function handleLogout() {
		localStorage.removeItem("token");
		setUser(undefined);
		router.push("/login");
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				{user && (
					<div className="flex justify-end items-center p-3">
						<p>{user ? user.email : "guest"}</p>
						<Button
							variant="link"
							className="text-red-500"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				)}

				{children}
				<Toaster />
			</body>
		</html>
	);
}
