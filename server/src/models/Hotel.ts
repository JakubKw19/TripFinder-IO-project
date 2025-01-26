import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    _id: String,
    city: String,
    name: String,
    pricePerNight: Number,
    amenities: [String],
    stars: Number,
});

const Hotel = mongoose.model("Hotel", HotelSchema, "hotel");

export default Hotel;
