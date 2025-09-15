import React, { useState, useMemo } from 'react';

const sampleSongs = [
  { id: 1, title: 'Midnight Drive', artist: 'Synthwave Crew', duration: '3:42' },
  { id: 2, title: 'Ocean Eyes', artist: 'Calm Beats', duration: '4:01' },
  { id: 3, title: 'City Lights', artist: 'Nightwalkers', duration: '2:58' },
  { id: 4, title: 'Sunset Lover', artist: 'Indie Ocean', duration: '3:20' },
  { id: 5, title: 'Eternal', artist: 'Ambientia', duration: '5:05' },
];

const Search = () => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sampleSongs;
    return sampleSongs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-50">
        <div className="sticky top-4 z-20 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="relative block">
                <span className="sr-only">Search songs</span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block w-full border border-slate-200 rounded-md py-3 pl-4 pr-10 shadow-sm focus:outline-none focus:border-blue-300 text-gray-500"
                  placeholder="Search by title or artist..."
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <svg className="w-5 h-5 text-slate-400 absolute right-3 top-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1110 3a7 7 0 016.65 13.65z" />
                </svg>
              </label>
            </div>
            <button
              onClick={() => setQuery('')}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {results.map(song => (
            <div key={song.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">SM</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-500">{song.artist}</p>
                </div>
                <div className="text-sm text-gray-400">{song.duration}</div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">Play</button>
                <button className="px-3 py-1 border border-slate-200 rounded-md text-sm">Add</button>
                <button className="ml-auto text-sm text-gray-500">More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 

export default Search;
