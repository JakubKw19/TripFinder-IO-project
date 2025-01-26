import express from "express";
import Transport from "./models/Transport";
import Hotel from "./models/Hotel";

const router = express.Router();

router.get("/transport", async (req, res) => {
    try {
        const transports = await Transport.find();
        console.log("Fetched transports:", transports);
        res.json(transports);
    } catch (error) {
        console.error("Error fetching transports:", error);
        res.status(500).json({ error: "Error fetching transports" });
    }
});

router.get("/hotels", async (req, res) => {
    try {
        const hotelOptions = await Hotel.find();
        res.json(hotelOptions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching hotel options" });
    }
});

const testFetch = async () => {
    const hotels = await Hotel.find();
    console.log(hotels);
};

testFetch();

router.post("/insert-transport", async (req, res) => {
    try {
        const transportData = [
            {
                _id: 'flight1',
                departureCity: 'Warsaw',
                destinationCity: 'Paris',
                departureDate: '2025-01-25T10:00:00Z',
                arrivalDate: '2025-01-25T12:30:00Z',
                price: '120.50',
                airline: 'Air France',
                type: 'plane'
            }
        ];

        const insertedTransport = await Transport.insertMany(transportData);
        res.status(200).json({ message: "Transport data inserted", insertedTransport });
    } catch (error) {
        console.error("Error inserting transport:", error);
        res.status(500).json({ error: "Error inserting transport" });
    }
});

router.post("/insert-hotel", async (req, res) => {
    try {
        const hotelData = [
            {
                _id: 'hotel1',
                city: 'Paris',
                name: 'Hotel de Paris',
                pricePerNight: 80,
                amenities: ['WiFi', 'Breakfast', 'Parking'],
                stars: 4
            }
        ];

        const insertedHotel = await Hotel.insertMany(hotelData);
        res.status(200).json({ message: "Hotel data inserted", insertedHotel });
    } catch (error) {
        console.error("Error inserting hotels:", error);
        res.status(500).json({ error: "Error inserting hotels" });
    }
});

export default router;
