import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useState } from "react";
import { fetchHotels } from "../../api";
import { Hotel, UserPlan } from "../../types/plannerTypes";

export const HotelCard: React.FC<{
    objectKey: string,
    userPlan: UserPlan, setUserPlan: (userPlan: UserPlan) => void, hotelName: string, checkInDate: string, checkOutDate: string
}> = ({ objectKey, userPlan, setUserPlan, hotelName, checkInDate, checkOutDate }) => {
    const hotelNames = ["Hotel A", "Hotel B", "Hotel C", "Hotel D", "Hotel E"];
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [error, setError] = useState<string>("");
    const [currentHotel, setCurrentHotel] = useState<string | null>(null);
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
                        <InputLabel id="hotel-label">Hotel</InputLabel>
                        <Select labelId="hotel-label" label="Hotel" value={hotelName}>
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
                                    {hotels.map((hotel) => (
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
                        <Button className="w-full bg-green-500 text-white hover:bg-green-600" onClick={() => searchHotels()}>
                            Search Hotels
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}