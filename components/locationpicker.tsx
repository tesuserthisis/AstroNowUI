import React, {useState} from "react";
import axios from "axios";
import {Feature} from "geojson";

interface MapboxFeature extends Feature {
    place_name: string;
    center: [number, number]; // [lng, lat]
}

const MAPBOX_API_KEY = process.env.REACT_APP_MAPBOX_API_KEY || ""; // this is not working if key not present here

const LocationPicker: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<MapboxFeature[]>([]);
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
        lat: 0,
        lng: 0,
    });

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_API_KEY}`
            );
            setSuggestions(response.data.features as MapboxFeature[]);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = async (place: MapboxFeature) => {
        if (!place.center) return;

        const lat = place.center[1]; // Latitude
        const lng = place.center[0]; // Longitude
        setQuery(place.place_name);
        setCoordinates({lat, lng});
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search location"
                style={{width: "300px", padding: "10px"}}
            />
            {suggestions.length > 0 && (
                <ul style={{listStyle: "none", padding: 0}}>
                    {suggestions.map((place, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(place)}
                            style={{cursor: "pointer", padding: "5px", borderBottom: "1px solid #ccc"}}
                        >
                            {place.place_name}
                        </li>
                    ))}
                </ul>
            )}
            {coordinates.lat !== 0 && (
                <p>
                    Selected Location: {query} <br/>
                    Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
                </p>
            )}
        </div>
    );
};

export default LocationPicker;
