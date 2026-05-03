import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/playlists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlaylists(response.data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const createPlaylist = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/playlists',
        { name: newPlaylistName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPlaylistName('');
      fetchPlaylists();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">📋 Your Playlists</h1>

      <form onSubmit={createPlaylist} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="New playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          className="flex-1 px-4 py-3 bg-gray-700 rounded text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded font-semibold transition"
        >
          Create
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map(playlist => (
          <div key={playlist._id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition">
            <h3 className="text-xl font-semibold mb-2">{playlist.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{playlist.songs.length} songs</p>
            {playlist.description && <p className="text-gray-400 text-sm">{playlist.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
