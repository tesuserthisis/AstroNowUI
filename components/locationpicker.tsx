import React, {useEffect, useState} from "react";
import axios from "axios";
import { Feature } from "geojson";
import { FiMapPin } from "react-icons/fi";

interface MapboxFeature extends Feature {
    place_name: string;
    center: [number, number]; // [lng, lat]
}

const LocationPicker: React.FC<{
    value?: string;
    onChange?: (location: string) => void
}> = ({
          value = "",
          onChange = () => {}
      }) => {
    const [query, setQuery] = useState<string>(value || "");
    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
    const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    // Update local state when value prop changes
    useEffect(() => {
        if (value !== query) {
            setQuery(value);
        }
    }, [value]);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue); // Update parent form state

        if (newValue.length > 2) {
            try {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${newValue}.json?access_token=${MAPBOX_API_KEY}`
                );
                setSuggestions(response.data.features as MapboxFeature[]);
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (place: MapboxFeature) => {
        if (!place.center) return;

        const lat = place.center[1]; // Latitude
        const lng = place.center[0]; // Longitude
        setQuery(place.place_name);
        onChange(place.place_name); // Update parent form state
        setCoordinates({ lat, lng });
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Enter Location"
                    className="w-full p-4 pl-12 bg-white/10 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none backdrop-blur-md placeholder-white/50"
                />
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute left-0 mt-2 w-full bg-black backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(place)}
                            className="flex items-center gap-3 p-4 text-white/90 cursor-pointer hover:bg-white/10 transition duration-200"
                        >
                            <FiMapPin className="text-blue-400" />
                            <span className="text-sm">{place.place_name}</span>
                        </li>
                    ))}
                </ul>
            )}

            {coordinates && query.trim() !== "" && (
                <div className="mt-3 p-4 bg-white/10 border border-white/30 rounded-xl text-white backdrop-blur-md">
                    <p className="text-lg font-medium">📍 {query}</p>
                    <p className="text-sm text-white/70">
                        Latitude: {coordinates.lat} | Longitude: {coordinates.lng}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
