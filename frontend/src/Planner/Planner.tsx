import React from "react";
import { Button, Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { motion } from "framer-motion";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FlightCard } from "./FlightCard/FlightCard";
import { HotelCard } from "./HotelCard/HotelCard";
import { UserPlan } from "../types/plannerTypes";
import dayjs from "dayjs";

export const Planner: React.FC = () => {
    const [currentValue, setCurrentValue] = React.useState<string>("flight");
    const [userPlan, setUserPlan] = React.useState<UserPlan>({ 1: null, 2: null, 3: null });
    const plan: { [key: string]: { type: string; departure?: string; destination?: string; date?: string; hotel?: string; checkIn?: string; checkOut?: string } } = {
        1: {
            "type": "flight",
            "departure": "Warsaw",
            "destination": "Paris",
            "date": "2025-01-25",
        },
        2: {
            "type": "hotel",
            "hotel": "Hotel A",
            "checkIn": "2025-01-25",
            "checkOut": "2025-01-30"
        },
        3: {
            "type": "flight",
            "departure": "Paris",
            "destination": "Warsaw",
            "date": "2025-01-30"
        },
    }
    const [yourPlan, setYourPlan] = React.useState<{ [key: string]: { type: string; departure?: string; destination?: string; date?: string; hotel?: string; checkIn?: string; checkOut?: string } }>(plan);
    const onAddToPlan = () => {
        if (currentValue === "flight") {
            yourPlan[Object.keys(yourPlan).length + 1] = { type: currentValue, destination: "", date: "" };
        } else {
            yourPlan[Object.keys(yourPlan).length + 1] = { type: currentValue, hotel: "", checkIn: "", checkOut: "" };
        }
        setYourPlan({ ...yourPlan });
        userPlan[Object.keys(userPlan).length + 1] = null;
        setUserPlan({ ...userPlan });
    }
    const savePlan = () => {
        console.log("User Plan", userPlan);
    }
    return (
        <div className="p-4 bg-gray-100 flex">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-w-60 min-h-60 m-5"
            >
                <Card>
                    <CardContent>
                        <h2 className="text-xl font-semibold mb-2">Your Plan</h2>
                        {
                            Object.keys(userPlan).map((key, index) => {
                                return (
                                    <div key={index} className="mb-2">
                                        {
                                            userPlan[key] ? (
                                                userPlan[key]?.type === "transport" ? (
                                                    <div className="m-2 mb-5">
                                                        <span className="font-light">{dayjs(userPlan[key]?.object.departureDate).format('YYYY-MM-DD')} - {dayjs(userPlan[key]?.object.arrivalDate).format('YYYY-MM-DD')}</span>
                                                        <p>{userPlan[key]?.object.departureCity} → {userPlan[key]?.object.destinationCity} ({userPlan[key]?.object.price} USD)</p>
                                                    </div>
                                                ) : (
                                                    <div className="m-2 mb-5">
                                                        <span className="font-light">{dayjs(userPlan[key]?.checkInDate).format('YYYY-MM-DD')} - {dayjs(userPlan[key]?.checkOutDate).format('YYYY-MM-DD')}</span>
                                                        <p>{userPlan[key]?.object.name} in {userPlan[key]?.object.city} ({userPlan[key]?.object.pricePerNight} USD/night)</p>
                                                    </div>

                                                )
                                            ) : (
                                                <p>No plan available.</p>
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                        <Button onClick={() => savePlan()} className="w-full bg-blue-500 text-white hover:bg-blue-600">Save</Button>
                    </CardContent>
                </Card>
            </motion.div>
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
                                            <FlightCard objectKey={key} userPlan={userPlan} setUserPlan={setUserPlan} departure={plan.departure || ""} currentDestination={plan.destination || ""} date={plan.date || ""} />
                                        ) : (
                                            <HotelCard objectKey={key} userPlan={userPlan} setUserPlan={setUserPlan} hotelName={plan.hotel || ""} checkInDate={plan.checkIn || ""} checkOutDate={plan.checkOut || ""} />
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