import './App.css'
import MapComponent from './components/MapArea'
import { GeoDataProvider } from '../contexts/GeoDataProvider';

function App() {

  return (
    <div className='relative'>
      <GeoDataProvider>
        <MapComponent />
      </GeoDataProvider>
    </div>
  )
}

export default App
