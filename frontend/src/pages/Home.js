import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/songs?limit=20');
        setSongs(response.data.songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">🎵 Featured Songs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {songs.map(song => (
          <div key={song._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <div className="w-full h-40 bg-gray-700 rounded mb-4 flex items-center justify-center">
              {song.coverImage ? <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover rounded" /> : <span>No Image</span>}
            </div>
            <h3 className="font-semibold truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            <p className="text-xs text-gray-500 mt-1">{song.album}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
