import React, { createContext, useContext, useEffect, useState } from 'react';
import { GeoJSON, GeoJSONError } from "../types/geojson.ts";
import { GeoJSONEndpoint } from '../constants/consts.ts';

interface GeoDataContextType {
    geoData: GeoJSON | GeoJSONError | null;
    url: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

}

const GeoDataContext = createContext<GeoDataContextType | undefined>(undefined);

interface GeoDataProviderProps {
    children: React.ReactNode;
}

export const GeoDataProvider: React.FC<GeoDataProviderProps> = ({ children }) => {
    const [url, setUrl] = useState<string>("https://final-cog.s3.ap-south-1.amazonaws.com/test_cog.tif");
    const [geoData, setGeoData] = useState<GeoJSON | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    // Fetch the GeoJSON data when the URL changes
    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${GeoJSONEndpoint}?url=${url}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch geo data');
                }
                const data: GeoJSON = await response.json();
                setGeoData(data);
                setLoading(false);
            } catch (err) {
                setGeoData(null);
                setLoading(false);
            }
        };

        fetchGeoData();
    }, [url]);

    return (
        <GeoDataContext.Provider value={{ geoData, url, setUrl, loading, setLoading }}>
            {children}
        </GeoDataContext.Provider>
    );
};

// Custom hook to access geo data
export const useGeoData = (): GeoDataContextType => {
    const context = useContext(GeoDataContext);
    if (!context) {
        throw new Error('useGeoData must be used within a GeoDataProvider');
    }
    return context;
};
