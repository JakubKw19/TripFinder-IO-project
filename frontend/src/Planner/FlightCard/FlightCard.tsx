import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export const FlightCard: React.FC<{ currentDestination: string, date: string }> = ({ currentDestination, date }) => {
    const destinations = ["New York", "Tokyo", "Paris", "London", "Sydney"];
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Flight</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel>Destination</InputLabel>
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
                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Search Flights
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}