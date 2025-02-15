import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { fetchHotels } from "../../api";
import { Hotel, UserPlan } from "../../types/plannerTypes";

export const HotelCard: React.FC<{
    objectKey: string,
    userPlan: UserPlan, setUserPlan: (userPlan: UserPlan) => void, hotelName: string
}> = ({ objectKey, userPlan, setUserPlan, hotelName }) => {
    // const hotelNames = ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"];
    const [hotelNames, setHotelNames] = useState<string[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [error, setError] = useState<string>("");
    const [currentHotel, setCurrentHotel] = useState<string | null>(null);
    const [hotelCity, setHotelCity] = useState<string>(hotelName);
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");
    const [isOpened, setIsOpened] = useState<boolean>(false);
    // useEffect(() => {

    //     }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotelsData = await fetchHotels();
                setHotels(hotelsData);
                setHotelNames(hotelsData.map((hotel) => hotel.name));
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred.");
                }
            }
        };
        fetchData();
        // if (hotels.length > 0) {
        //     console.log(error);
        // }
    }, []);

    return (
        <Card>
            <CardContent>
                <h2 className="text-xl font-semibold mb-2">Book Your Hotel</h2>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormControl fullWidth>
                        <InputLabel id="hotel-label">Hotel</InputLabel>
                        <Select labelId="hotel-label" label="Hotel" value={hotelCity} onChange={(e) => {
                            setHotelCity(e.target.value as string);
                            setIsOpened(false);
                        }}>
                            {hotelNames.map((hotel, index) => (
                                <MenuItem key={index} value={hotel}>
                                    {hotel}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <DatePicker onChange={(date) => setCheckInDate(date?.format("YYYY-MM-DD") || "")} label="Check-in-Date" />
                    <DatePicker onChange={(date) => setCheckOutDate(date?.format("YYYY-MM-DD") || "")} label="Check-out-Date" />
                </div>

                <div className="mt-4">
                    {isOpened ? (
                        <>

                            {hotels.length > 0 ? (
                                <ul className="list-disc pl-6">
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Hotels</FormLabel>
                                        <RadioGroup aria-label="hotels" name="hotels" value={currentHotel} onChange={(e) => {
                                            setCurrentHotel(e.target.value)
                                            const selectedHotel = hotels.find(hotel => hotel._id === e.target.value) || null;
                                            if (selectedHotel) {
                                                userPlan[objectKey] = {
                                                    type: "hotel",
                                                    checkInDate: checkInDate,
                                                    checkOutDate: checkOutDate,
                                                    object: selectedHotel
                                                };
                                            }
                                            setUserPlan({ ...userPlan });
                                        }}>
                                            {hotels.filter((hotel) => hotel.name === hotelCity).map((hotel) => (
                                                <FormControlLabel
                                                    key={hotel._id}
                                                    value={hotel._id}
                                                    control={<Radio />}
                                                    label={`${hotel.name} in ${hotel.city} (${hotel.pricePerNight} USD/night)`} />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </ul>
                            ) : (
                                <p>{error}</p>
                            )}
                        </>
                    ) : (
                        <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={() => setIsOpened(true)}>
                            Search Hotels
                        </Button>
                    )}

                </div>
            </CardContent>
        </Card>
    );
}