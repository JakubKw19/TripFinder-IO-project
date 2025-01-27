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
                "_id": "flight3",
                "departureCity": "Tokyo",
                "destinationCity": "Sydney",
                "departureDate": "2025-03-02T17:00:00Z",
                "arrivalDate": "2025-03-03T06:00:00Z",
                "price": "750.00",
                "airline": "Japan Airlines",
                "type": "plane"
            },
            {
                "_id": "flight4",
                "departureCity": "London",
                "destinationCity": "Paris",
                "departureDate": "2025-03-05T10:30:00Z",
                "arrivalDate": "2025-03-05T12:00:00Z",
                "price": "150.00",
                "airline": "British Airways",
                "type": "plane"
            },
            {
                "_id": "flight5",
                "departureCity": "Sydney",
                "destinationCity": "Tokyo",
                "departureDate": "2025-04-01T09:45:00Z",
                "arrivalDate": "2025-04-01T15:30:00Z",
                "price": "880.00",
                "airline": "Qantas Airways",
                "type": "plane"
            },
            {
                "_id": "flight6",
                "departureCity": "Warsaw",
                "destinationCity": "New York",
                "departureDate": "2025-04-10T12:00:00Z",
                "arrivalDate": "2025-04-10T15:45:00Z",
                "price": "420.00",
                "airline": "LOT Polish Airlines",
                "type": "plane"
            },
            {
                "_id": "flight7",
                "departureCity": "New York",
                "destinationCity": "London",
                "departureDate": "2025-02-15T14:00:00Z",
                "arrivalDate": "2025-02-15T22:30:00Z",
                "price": "359.99",
                "airline": "Delta Airlines",
                "type": "plane"
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
                _id: 'hotel2',
                city: 'Warsaw',
                name: 'Hilton',
                pricePerNight: 80,
                amenities: ['WiFi', 'Parking','Pool'],
                stars: 4
            },
            {
                _id: 'hotel3',
                city: 'London',
                name: 'Western Vauxhall Hotel',
                pricePerNight: 80,
                amenities: ['WiFi', 'Parking'],
                stars: 2
            },
            {
                _id: 'hotel4',
                city: 'New York',
                name: 'The Plaza',
                pricePerNight: 80,
                amenities: ['WiFi', 'Breakfast', 'Parking','Pool'],
                stars: 5
            },
            {
                _id: 'hotel5',
                city: 'Tokyo',
                name: 'Mandarin Oriental, Tokyo',
                pricePerNight: 80,
                amenities: ['WiFi', 'Breakfast', 'Parking'],
                stars: 3
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
