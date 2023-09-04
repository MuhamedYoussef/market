export interface UserType {
	id: number;
	email: string;
	token: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
};