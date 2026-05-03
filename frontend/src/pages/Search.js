import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/songs?search=${searchQuery}`);
      setResults(response.data.songs);
    } catch (error) {
      console.error('Error searching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">🔍 Search Songs</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          placeholder="Search songs, artists, albums..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </form>

      {loading && <p>Searching...</p>}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(song => (
            <div key={song._id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
              <div className="w-full h-40 bg-gray-700 rounded mb-4 flex items-center justify-center">
                {song.coverImage ? <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover rounded" /> : <span>No Image</span>}
              </div>
              <h3 className="font-semibold truncate">{song.title}</h3>
              <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !loading && searchQuery && <p>No results found.</p>}
    </div>
  );
}

export default Search;
