import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { fetchHotels } from "../../api";
import { Hotel } from "../../types/plannerTypes";

export const HotelCard: React.FC<{ hotelName: string, checkInDate: string, checkOutDate: string }> = ({ hotelName, checkInDate, checkOutDate }) => {
    const hotelNames = ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"];
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [error, setError] = useState<string>("");
    // useEffect(() => {

    //     }, []);

    const searchHotels = () => {
        const fetchData = async () => {
            try {
                const hotelsData = await fetchHotels();
                setHotels(hotelsData); // Type now matches
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };
        fetchData();
        if (hotels.length > 0) {
            console.log(error);
        }
    }
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Hotel</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel>Hotel</InputLabel>
                        <Select value={hotelName}>
                            {hotelNames.map((hotel, index) => (
                                <MenuItem key={index} value={hotel}>
                                    {hotel}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        checkInDate !== "" ? (
                            <DatePicker label="Check-in-Date" defaultValue={dayjs(checkInDate)} />
                        ) : (
                            <DatePicker label="Check-in-Date" />
                        )
                    }
                    {
                        checkOutDate !== "" ? (
                            <DatePicker label="Check-out-Date" defaultValue={dayjs(checkOutDate)} />
                        ) : (
                            <DatePicker label="Check-out-Date" />
                        )
                    }
                </div>

                <div className="mt-4">

                    {hotels.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {hotels.map((hotel) => (
                                <li key={hotel._id}>
                                    {hotel.name} in {hotel.city} ({hotel.pricePerNight} USD/night)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={() => searchHotels()}>
                            Search Hotels
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}