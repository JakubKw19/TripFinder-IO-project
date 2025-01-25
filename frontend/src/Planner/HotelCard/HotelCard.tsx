import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export const HotelCard: React.FC<{ hotelName: string, checkInDate: string, checkOutDate: string }> = ({ hotelName, checkInDate, checkOutDate }) => {
    const hotels = ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"];
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Hotel</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel>Hotel</InputLabel>
                        <Select value={hotelName}>
                            {hotels.map((hotel, index) => (
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
                    <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                        Search Hotels
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}