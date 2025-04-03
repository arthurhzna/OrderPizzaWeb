import { ReactNode } from 'react';

export interface RouterError{
    data?: string;
    message?: string;
    statusText?: string;
    status?: number;
}

export interface LinkButtonProps{
    children: React.ReactNode;
    to: string;
}

export interface CartItem {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface CartState {
    cart: CartItem[];
}

export interface Position {
    latitude: number;
    longitude: number;
}

export interface UserState {
    username: string;
    status: string;
    position: Position;
    address: string;
    error: string;
}

export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    to?: string;
    onClick?: () => void;
}

export interface PizzaProps {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
}

export interface MenuData {
    status: string;
    data: PizzaProps[];
}