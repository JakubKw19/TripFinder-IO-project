import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { fetchTransport } from "../../api";
import { Transport } from "../../types/plannerTypes";

export const FlightCard: React.FC<{ from: string, currentDestination: string, date: string }> = ({ from, currentDestination, date }) => {
    const destinations = ["New York", "Tokyo", "Paris", "London", "Sydney", "Warsaw"];
    const [transport, setTransport] = useState<Transport[]>([]); // Specify type here
    const [error, setError] = useState<string>("");

    const searchTransport = () => {
        const fetchData = async () => {
            try {
                const hotelsData = await fetchTransport();
                setTransport(hotelsData); // Type now matches
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };
        fetchData();
        if (transport.length > 0) {
            console.log(error);
        }

    }
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Flight</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel>Destination</InputLabel>
                        <Select value={from}>
                            {destinations.map((destination, index) => (
                                <MenuItem key={index} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select value={currentDestination}>
                            {destinations.map((destination, index) => (
                                <MenuItem key={index} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        date !== "" ? (
                            <DatePicker label="Pick date" defaultValue={dayjs(date)} />
                        ) : (
                            <DatePicker label="Pick date" />
                        )
                    }
                </div>

                <div className="mt-4">

                    {transport.length > 0 ? (
                        <ul className="list-disc pl-6">
                            {transport.map((item) => (
                                <li key={item._id}>
                                    {item.departureCity} → {item.destinationCity} ({item.price} USD)
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={() => searchTransport()}>
                            Search Flights
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}