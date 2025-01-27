import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { fetchTransport } from "../../api";
import { Transport, UserPlan } from "../../types/plannerTypes";

export const FlightCard: React.FC<{
    objectKey: string,
    userPlan: UserPlan, setUserPlan: (userPlan: UserPlan) => void, departure: string, currentDestination: string, date: string
}> = ({ objectKey, userPlan, setUserPlan, departure, currentDestination, date }) => {
    const [destinations, setDestinations] = useState<string[]>([]);
    const [transport, setTransport] = useState<Transport[]>([]);
    const [error, setError] = useState<string>("");
    const [currentTransport, setCurrentTransport] = useState<string | null>(null);
    const [departureCity, setDepartureCity] = useState<string>(departure);
    const [destinationCity, setDestinationCity] = useState<string>(currentDestination);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const transportData = await fetchTransport();
                setTransport(transportData);
                const destinationNames = transportData.map((transport) => transport.destinationCity);
                setDestinations(destinationNames);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };
        fetchData();
    }, []);
    // const searchTransport = () => {
    //     const fetchData = async () => {
    //         try {
    //             const hotelsData = await fetchTransport();
    //             setTransport(hotelsData);
    //         } catch (err: unknown) {
    //             if (err instanceof Error) {
    //                 setError(err.message);
    //             } else {
    //                 setError("An unknown error occurred.");
    //             }
    //         }
    //     };
    //     fetchData();
    //     if (transport.length > 0) {
    //         console.log(error);
    //     }

    // }
    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Flight</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel id="departure-label">Departure</InputLabel>
                        <Select label="Departure" labelId="departure-label" value={departureCity} onChange={(e) => {
                            setIsOpened(false);
                            setDepartureCity(e.target.value as string)
                        }}>
                            {destinations.map((destination, index) => (
                                <MenuItem key={index} value={destination}>
                                    {destination}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="destination-label">Destination</InputLabel>
                        <Select label="Destination" labelId="destination-label" value={destinationCity} onChange={(e) => {
                            setIsOpened(false);
                            setDestinationCity(e.target.value as string)
                        }}>
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
                    {isOpened ? (
                        <>
                            {
                                transport.length > 0 ? (
                                    <ul className="list-disc pl-6">
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Flights</FormLabel>
                                            <RadioGroup aria-label="transports" name="transports" value={currentTransport} onChange={(e) => {
                                                setCurrentTransport(e.target.value)
                                                const selectedTransport = transport.find(transport => transport._id === e.target.value) || null;
                                                if (selectedTransport) {
                                                    userPlan[objectKey] = {
                                                        type: "transport",
                                                        object: selectedTransport
                                                    };
                                                }
                                                setUserPlan({ ...userPlan });
                                            }}>
                                                {transport.filter((transport) => transport.departureCity === departureCity && transport.destinationCity === destinationCity).map((item) => (
                                                    <FormControlLabel
                                                        key={item._id}
                                                        value={item._id}
                                                        control={<Radio />}
                                                        label={`${item.departureCity} → ${item.destinationCity} (${item.price} USD)`}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </ul>
                                ) : (
                                    <p>{error}</p>
                                )}
                        </>
                    ) : (
                        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={() => setIsOpened(!isOpened)}>
                            Search Flights
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}