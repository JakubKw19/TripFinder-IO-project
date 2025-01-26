export type Transport = {
    _id: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    arrivalDate: string;
    price: string;
    airline: string;
    type: string;
};

export type Hotel = {
    _id: string;
    city: string;
    name: string;
    pricePerNight: number;
    amenities: string[];
    stars: number;
};