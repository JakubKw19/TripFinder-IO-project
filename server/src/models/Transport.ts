import mongoose from "mongoose";

const TransportSchema = new mongoose.Schema({
    _id: String,
    city: String,
    name: String,
    pricePerNight: Number,
    amenities: [String],
    stars: Number,
});

const Transport = mongoose.model("Transport", TransportSchema, "transport");

export default Transport;
