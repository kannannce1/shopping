export interface User {
    firstName: string;
    email: string;
    gender: string;
    address: string;
    mobile: string;
    username: string;
    password: string;
    acceptTerms: boolean;
    id: number;
}
export interface CurrentUser {
    name: string;
    id: number;
    gender: string;
    cart: [];
}

export interface Brand {
    name: string;
    id: number;
    checked: boolean;
}
export interface CardItems {
    id: number;
    userId: number;
    username: string;
    brand: string;
    productName: string;
    price: string;
    address: string;
    mobile: string;
    email: string;
    quantity: string;
}
export interface Product {
    id: number;
    brand: string;
    name: string;
    description: string;
    ram: number;
    memory: number;
    rearCamera: number;
    frontCamera: number;
    color: string;
    price: number;
    sim: string;
    networkType: string;
    supportedNetworks: string;
    batteryCapacity: string;
    type: string;
    image: string;
    quantity: number;
}

