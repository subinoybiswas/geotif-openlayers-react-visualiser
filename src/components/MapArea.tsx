import { useEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { fromLonLat } from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';
import { TileEndpoint } from '../../constants/consts';
import { useGeoData } from '../../contexts/GeoDataProvider';
import { GeoJSON } from '../../types/geojson';
import { GetBandMetaData } from '../GetBandMetaData';

function MapComponent() {
    const { geoData, url, setUrl } = useGeoData();
    if (!geoData) {
        return <div>Oops...</div>;
    }
    const titilerEndpoint = `${TileEndpoint}?url=${url}&contrast=auto&rescale=${GetBandMetaData(geoData as GeoJSON)[0].STATISTICS_MINIMUM},${GetBandMetaData(geoData as GeoJSON)[0].STATISTICS_MAXIMUM}`;
    useEffect(() => {
        const osmLayer = new TileLayer({
            preload: Infinity,
            source: new OSM(),
        })
        const tileLayer = new TileLayer({
            source: new XYZ({
                url: titilerEndpoint, // The TiTiler URL to fetch tiles
                maxZoom: 18,          // Set the maximum zoom level (adjust as needed)
                tileSize: 512,        // Tile size (256x256 is typical)
            }),
        });
        const VisibleLayerGroup = new LayerGroup({
            layers: [osmLayer, tileLayer],
        })

        const map = new Map({
            target: 'map',
            layers: [VisibleLayerGroup],
            view: new View({
                center: fromLonLat([75, 0]), // Adjust to your area of interest
                zoom: 2,                     // Set the initial zoom level
            }),
        });

        return () => map.setTarget(undefined)
    }, []);

    
    return (
        <div style={{ height: '100vh', width: '100%' }} id="map" className="map-container top-0 left-0" />
    );
}

export default MapComponent;