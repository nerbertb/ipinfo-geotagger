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
    localStorage.removeItem("token");
    navigate("/login");
  }

  const getLatLng = () => {
    if (!geo || !geo.loc) return null;
    const [lat, lng] = geo.loc.split(",").map(Number);
    return [lat, lng];
  };

  const coords = getLatLng();


  return (
    <div>
      <h2>Home Page</h2>
            <button onClick={logout}>Logout</button>
      {!geo && <p>Loading your geolocation…</p>}

      {geo && (
        <>
        <div style={{ marginTop: '20px' }}>
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
            <div>
          <MapContainer
            center={coords}
            zoom={12}
            id='map'
            >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <Marker position={coords}>
              <Popup>
                {geo.ip} - {geo.city}, {geo.country}
              </Popup>
            </Marker>
            </MapContainer>
            </div>
      )}
      </>
        )}
      
    </div>
  );
}

export default Home;
