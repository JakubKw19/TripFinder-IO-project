import React from "react";
import { Planner } from "./Planner/Planner.tsx";

export const App: React.FC = () => {
    // const [hotels, setHotels] = useState<Hotel[]>([]); // Specify type here
    // const [transport, setTransport] = useState<Transport[]>([]); // Specify type here
    // const [error, setError] = useState<string>("");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const hotelsData = await fetchHotels();
    //             const transportData = await fetchTransport();
    //             setHotels(hotelsData); // Type now matches
    //             setTransport(transportData); // Type now matches
    //         } catch (err: unknown) {
    //             if (err instanceof Error) {
    //                 setError(err.message);
    //             } else {
    //                 setError("An unknown error occurred.");
    //             }
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <Planner />
        // <div className="p-4">
        //     <h1 className="text-2xl font-bold mb-4">React & MongoDB App</h1>
        //     {error && <p className="text-red-500">Error: {error}</p>}

        //     <div className="mb-4">
        //         <h2 className="text-xl font-semibold">Hotels</h2>
        //         {hotels.length > 0 ? (
        //             <ul className="list-disc pl-6">
        //                 {hotels.map((hotel) => (
        //                     <li key={hotel._id}>
        //                         {hotel.departureCity} → {hotel.destinationCity} ({hotel.price} USD)
        //                     </li>
        //                 ))}
        //             </ul>
        //         ) : (
        //             <p>No hotels available.</p>
        //         )}
        //     </div>

        //     <div>
        //         <h2 className="text-xl font-semibold">Transport</h2>
        //         {transport.length > 0 ? (
        //             <ul className="list-disc pl-6">
        //                 {transport.map((item) => (
        //                     <li key={item._id}>
        //                         {item.name} in {item.city} ({item.pricePerNight} USD/night)
        //                     </li>
        //                 ))}
        //             </ul>
        //         ) : (
        //             <p>No transport options available.</p>
        //         )}
        //     </div>
        // </div>
    );
};

export default App;
