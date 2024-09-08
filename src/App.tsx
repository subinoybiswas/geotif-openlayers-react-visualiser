import './App.css'
import MapComponent from './components/MapArea'
import { GeoDataProvider } from '../contexts/GeoDataProvider';
import MenuArea from './components/MenuArea';

function App() {

  return (
    <div className='relative flex'>
      <GeoDataProvider>
        <MapComponent />
        <div className='top-0 absolute left-0 min-h-screen flex'>
          <MenuArea />
        </div>
      </GeoDataProvider>
    </div>
  )
}

export default App
