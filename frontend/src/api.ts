import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

type Hotel = {
    _id: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    arrivalDate: string;
    price: string;
    airline: string;
    type: string;
};

type Transport = {
    _id: string;
    city: string;
    name: string;
    pricePerNight: number;
    amenities: string[];
    stars: number;
};

export const fetchHotels = async (): Promise<Hotel[]> => {
    const response = await API.get<Hotel[]>("/hotels");
    return response.data;
};

export const fetchTransport = async (): Promise<Transport[]> => {
    const response = await API.get<Transport[]>("/transport");
    return response.data;
};
