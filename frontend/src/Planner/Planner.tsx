import React from "react";
import { Button, Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { motion } from "framer-motion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FlightCard } from "./FlightCard/FlightCard";
import { HotelCard } from "./HotelCard/HotelCard";

export const Planner: React.FC = () => {
    const [currentValue, setCurrentValue] = React.useState<string>("flight");
    const plan: { [key: string]: { type: string; destination?: string; date?: string; hotel?: string; checkIn?: string; checkOut?: string } } = {
        1: {
            "type": "flight",
            "destination": "New York",
            "date": "2022-12-01"
        },
        2: {
            "type": "hotel",
            "hotel": "Hotel A",
            "checkIn": "2022-12-01",
            "checkOut": "2022-12-05"
        },
        3: {
            "type": "flight",
            "destination": "Paris",
            "date": "2022-12-05"
        },
    }
    const [yourPlan, setYourPlan] = React.useState<{ [key: string]: { type: string; destination?: string; date?: string; hotel?: string; checkIn?: string; checkOut?: string } }>(plan);
    const onAddToPlan = () => {
        if (currentValue === "flight") {
            yourPlan[Object.keys(yourPlan).length + 1] = { type: currentValue, destination: "", date: "" };
        } else {
            yourPlan[Object.keys(yourPlan).length + 1] = { type: currentValue, hotel: "", checkIn: "", checkOut: "" };
        }
        setYourPlan({ ...yourPlan });
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto grid gap-4"
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <h1 className="text-3xl font-bold mb-4">Dynamic Trip Planner</h1>
                    {
                        Object.keys(yourPlan).map((key, index) => {
                            const plan = yourPlan[key];
                            return (
                                <Card key={index}>
                                    <CardContent>
                                        {plan.type === "flight" ? (
                                            <FlightCard currentDestination={plan.destination || ""} date={plan.date || ""} />
                                        ) : (
                                            <HotelCard hotelName={plan.hotel || ""} checkInDate={plan.checkIn || ""} checkOutDate={plan.checkOut || ""} />
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })
                    }




                    <Card>
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-2">Add to Plan</h2>
                            <FormControl fullWidth>
                                <Select value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}>
                                    <MenuItem value="flight">Flight</MenuItem>
                                    <MenuItem value="hotel">Hotel</MenuItem>
                                </Select>
                            </FormControl>
                            <Button onClick={() => onAddToPlan()} className="w-full bg-blue-500 text-white hover:bg-blue-600">Add</Button>
                        </CardContent>
                    </Card>
                </LocalizationProvider>
            </motion.div>
        </div>
    );
};