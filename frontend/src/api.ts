import axios from "axios";
import { Hotel, Transport } from "./types/plannerTypes";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});



export const fetchHotels = async (): Promise<Hotel[]> => {
    const response = await API.get<Hotel[]>("/hotels");
    return response.data;
};

export const fetchTransport = async (): Promise<Transport[]> => {
    const response = await API.get<Transport[]>("/transport");
    return response.data;
};
