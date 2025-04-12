export type TCarCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';


export type TProduct = {
    _id: string;
    name: string;
    brand: string; //BMW
    price: number; //30k
    model: string; //Hybrid
    year: number;
    category: TCarCategory;
    stock: number;
    inStock: boolean;
    isFeatured: boolean;
    image: string;
    productDetails: string;
};