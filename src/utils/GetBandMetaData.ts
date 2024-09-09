import { GeoJSON } from "../../types/geojson";

export const GetBandMetaData = (geojson: GeoJSON) => {
    console.log(geojson)
    const metadata = geojson.properties.band_metadata.map(
        ([band, metadata]) => {
            console.log(band, metadata)
            return metadata
        }
    );

    return metadata
}