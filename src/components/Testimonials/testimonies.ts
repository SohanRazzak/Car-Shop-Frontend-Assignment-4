// src/data/testimonials.ts
export type TTestimonial = {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar: string;
}

const testimonials: TTestimonial[] = [
    {
        id: 1,
        name: "Alex Johnson",
        role: "Car Enthusiast",
        content: "Found my dream car at an amazing price. The whole process was smooth and transparent.",
        rating: 5,
        avatar: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
    },
    {
        id: 2,
        name: "Sam Wilson",
        role: "First-time Buyer",
        content: "The team was patient and helped me understand everything. No pressure, just great service.",
        rating: 4,
        avatar: "https://img.freepik.com/premium-vector/portrait-middle-age-male-man-with-ball-hidden_684058-2608.jpg"
    },
    {
        id: 3,
        name: "Jordan Smith",
        role: "Business Owner",
        content: "Reliable vehicles and professional service. Will definitely come back for our company fleet.",
        rating: 5,
        avatar: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"
    }
];

export default testimonials;