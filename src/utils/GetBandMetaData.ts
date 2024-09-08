import { GeoJSON } from "../../types/geojson";

export const GetBandMetaData = (geojson: GeoJSON) => {
    const metadata = geojson.properties.band_metadata.map(
        ([band, metadata]) => metadata
    );
    console.log(metadata)
    return metadata
}