import express from "express";
import Hotel from "./models/Hotel";
import Transport from "./models/Transport";

const router = express.Router();

// Get all hotels
router.get("/hotels", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        console.log("Fetched Hotels:", hotels);
        res.json(hotels);
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).json({ error: "Error fetching hotels" });
    }
});

// Get all transport options
router.get("/transport", async (req, res) => {
    try {
        const transportOptions = await Transport.find();
        res.json(transportOptions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching transport options" });
    }
});

const testFetch = async () => {
    const hotels = await Hotel.find();
    console.log(hotels); // Should log all hotel data in the collection
};

testFetch();

router.post("/insert-hotels", async (req, res) => {
    try {
        const hotelData = [
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

        const insertedHotels = await Hotel.insertMany(hotelData);
        res.status(200).json({ message: "Hotels data inserted", insertedHotels });
    } catch (error) {
        console.error("Error inserting hotels:", error);
        res.status(500).json({ error: "Error inserting hotels" });
    }
});

// Insert transport data
router.post("/insert-transport", async (req, res) => {
    try {
        const transportData = [
            {
                _id: 'hotel1',
                city: 'Paris',
                name: 'Hotel de Paris',
                pricePerNight: 80,
                amenities: ['WiFi', 'Breakfast', 'Parking'],
                stars: 4
            }
        ];

        const insertedTransport = await Transport.insertMany(transportData);
        res.status(200).json({ message: "Transport data inserted", insertedTransport });
    } catch (error) {
        console.error("Error inserting transport:", error);
        res.status(500).json({ error: "Error inserting transport" });
    }
});

export default router;
