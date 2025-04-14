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

export type TUser = {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    image?: string;
    phone: string;
    address: string;
    city: string;
    status: 'active' | 'deactive'; //will be handled by admin
};



export type TOrderProduct = {
    product: string; // This is the product ID
    quantity: number;
    _id: string;
  };


export type TTransaction = {
    id: string;
    transaction_status: 'Initiated' | 'Completed' | 'Failed' | 'Refunded'; // Add other possible statuses
};

export type TOrder = {
    _id: string;
    user: TUser;
    products: TOrderProduct[];
    deliveryStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'; // Add other possible statuses
    totalPrice: number;
    status: string; // General order status
    transaction: TTransaction;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
};

