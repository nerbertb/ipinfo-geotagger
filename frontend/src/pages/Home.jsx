import {useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [geo, setGeo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        async function fetchGeoData() {
            try {
                const res = await axios.get('http://ipinfo.io/geo');
                setGeo(res.data);
            } catch (err) {
                console.error('Error fetching geo data:', err);
            }
        }
        fetchGeoData();
    }, []);

  return (
    <div>
        <h2>Home Page</h2>
         {!geo && <p>Loading your geolocation…</p>}

      {geo && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>IP:</strong> {geo.ip}</p>
          <p><strong>City:</strong> {geo.city}</p>
          <p><strong>Region:</strong> {geo.region}</p>
          <p><strong>Country:</strong> {geo.country}</p>
          <p><strong>Coordinates:</strong> {geo.loc}</p>
        </div>
      )}


      <input type="text" />
      <button></button>
      <button></button>
    </div>
  );
}

export default Home;
