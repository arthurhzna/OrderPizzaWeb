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

export interface CartItemProps {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface FormData {
    customer: string;
    phone: string;
    address: string;
    priority: string;
    cart: string;
    position: string;
}
export interface Order extends Omit<FormData, 'cart' | 'priority'> {
    cart: CartItemProps[];
    priority: boolean;
}

export interface CartState {
    cart: CartItemProps[];
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

// export interface ButtonProps {
//     children: ReactNode;
//     disabled?: boolean;
//     to?: string;
//     onClick?: () => void;
// }

export interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    to?: string;
    onClick?: () => void;
    type?: 'primary' | 'small' | 'round' | 'secondary';
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

export interface FormErrors{
    phone?: string;
}

export interface OrderProps {
    item: CartItemProps;
    isLoadingIngredients: Boolean;
    ingredients: string[];
}

export interface OrderData {
    id: string;
    status: string;
    priority: boolean;
    priorityPrice: number;
    orderPrice: number;
    estimatedDelivery: string;
    cart: CartItemProps[];  // Make sure CartItemProps is imported from your types
}

