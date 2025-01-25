import mongoose, { Schema } from 'mongoose';

const hotelSchema = new Schema({
  _id: { type: String, required: true },
  departureCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureDate: { type: Date, required: true },
  arrivalDate: { type: Date, required: true },
  price: { type: String, required: true },
  airline: { type: String, required: true },
  type: { type: String, required: true }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
