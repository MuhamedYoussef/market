"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/app/store";
import { UserType } from "@/app/types";
import { useRouter } from 'next/navigation'

async function loginUser(email: string, password: string, toast: any) {
	const response = await fetch("http://127.0.0.1:8000/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: email, password: password }),
	});

	if (!response.ok) {
		toast({
			variant: "destructive",
			title: "Uh oh! Something went wrong.",
			description: "Make sure to use the right email and password.",
		});

		throw new Error("Login failed");
	}

	const data = await response.json();
	return data;
}

export default function Login() {
	const { toast } = useToast();
  const {user, setUser} = useStore()
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const router = useRouter()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const user: UserType = await loginUser(email, password, toast);
		localStorage.setItem("token", user.token);
    setUser(user)
		console.log(user);
    router.push("/products")
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Card className="w-[450px]">
				<form onSubmit={handleLogin}>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>Welcome back.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									placeholder="joe@email.com"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									placeholder="*********"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between">
						<Button className="w-full" type="submit">
							Login
						</Button>
					</CardFooter>
				</form>
			</Card>

			<Link href={"/signup"} className="text-left mt-10 text-blue-500">
				Create a new account
			</Link>
		</div>
	);
}
