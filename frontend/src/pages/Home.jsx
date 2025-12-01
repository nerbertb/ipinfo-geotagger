import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Home() {
  const [geo, setGeo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchGeoData() {
      try {
        const res = await axios.get('https://ipinfo.io/geo');
        setGeo(res.data);
      } catch (err) {
        console.error('Error fetching geo data:', err);
      }
    }
    fetchGeoData();
  }, []);

  function logout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const getLatLng = () => {
    if (!geo || !geo.loc) return null;
    const [lat, lng] = geo.loc.split(',').map(Number);
    return [lat, lng];
  };

  const coords = getLatLng();

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center gap-10">
      <div className="flex w-full justify-between px-5 py-10 sm:px-20">
        <h2 className='text-4xl text-gray-700 poppins-bold'>Ipinfo Geo Locator</h2>
        <button onClick={logout} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg'>Logout</button>
      </div>
      <div className="w-[80%] flex flex-col justify-between items-center sm:p-10 bg-white rounded-lg shadow-lg">
        {!geo && <p>Loading your geolocation…</p>}

        {geo && (
          <div className="w-full flex flex-col sm:flex-row items-center">
            <div className="mt-5 poppins-medium text-lg">
              <h3 className="poppins-extrabold text-2xl text-green-600 mb-2">
                Your Geo Info
              </h3>
              <p>
                <strong>IP:</strong> {geo.ip}
              </p>
              <p>
                <strong>City:</strong> {geo.city}
              </p>
              <p>
                <strong>Region:</strong> {geo.region}
              </p>
              <p>
                <strong>Country:</strong> {geo.country}
              </p>
              <p>
                <strong>Coordinates:</strong> {geo.loc}
              </p>
            </div>

            {coords && (
              <div className="w-full justify-center flex">
                <MapContainer center={coords} zoom={12} id="map">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={coords}>
                    <Popup>
                      {geo.ip} - {geo.city}, {geo.country}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
