export interface Product {
        id: number;
        name: string;
        pictureUrl?: string;
        type?: string;
        brand?: string;
        description?: string;
        inventory: number;
        price: number;
    }