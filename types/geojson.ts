interface BandMetadata {
    STATISTICS_APPROXIMATE: string;
    STATISTICS_MAXIMUM: string;
    STATISTICS_MEAN: string;
    STATISTICS_MINIMUM: string;
    STATISTICS_STDDEV: string;
    STATISTICS_VALID_PERCENT: string;
}

interface GeoJSONProperties {
    bounds: [number, number, number, number];
    minzoom: number;
    maxzoom: number;
    band_metadata: [string, BandMetadata][];
    band_descriptions: [string, string][];
    dtype: string;
    nodata_type: string;
    colorinterp: string[];
    scales: number[];
    offsets: number[];
    driver: string;
    count: number;
    width: number;
    height: number;
    overviews: number[];
    nodata_value: number;
}

interface GeoJSON {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: GeoJSONProperties;
}

interface GeoJSONError {
    "detail": [
        {
            "loc": [
                "string",
                0
            ],
            "msg": "string",
            "type": "string"
        }
    ]
}

function isGeoJSONError(value: any): boolean {
    return (
        value &&
        value.detail instanceof Array &&
        value.detail.every((item: any) =>
            item.loc instanceof Array &&
            typeof item.loc[0] === 'string' &&
            typeof item.loc[1] === 'number' &&
            typeof item.msg === 'string' &&
            typeof item.type === 'string'
        )
    );
}

export { type GeoJSON, type GeoJSONError, isGeoJSONError };