import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';


const Search = () => {

  const [query, setQuery] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playlistid, setplaylistid] = useState("692d8b965d029113d680545a")
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formArtist, setFormArtist] = useState("");
  const [formFile, setFormFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const createPlaylist = async () => {
    const playlistname = prompt('enter playlist name');

    if (playlistname.length == 0) {
      alert("invalid....")
    } else {
      try {
        const res = await axios.post(`http://localhost:3000/user/create-playlist`, { playlistname }, { withCredentials: true });
        console.log(res.data);
        const id = res.data.newplaylist._id
        console.log("this is a playlistid", id)
        setplaylistid(id)


      }
      catch (error) {
        console.log(error);
        alert('Failed to create playlist — check console');
      }

    }

  };


  const handlesongdata = async (e) => {
    e.preventDefault()
    const formdata = new FormData();// When you want to upload files (mp3, image, video) from frontend → backend then we use formdata
    formdata.append("title", formTitle);
    formdata.append("artist", formArtist);
    formdata.append("song", formFile);
    try {
      const res = await axios.post(`http://localhost:3000/user/uploadsongs/${playlistid}`,
        formdata,
        { withCredentials: true, });
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    async function getplaylist() {
      try {
        const res = await axios.get(`http://localhost:3000/user/getplaylists/${playlistid}`, { withCredentials: true });
        console.log(res.data.song);
        setPlaylists(res.data.song);
      } catch (error) {
        console.log(error);
      }
    }
    getplaylist();

  }, [playlistid])




  return (

    <div className="min-h-screen bg-slate-900 text-slate-100 md:ml-60 ">
      <Sidebar></Sidebar>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pl-0">
        <section id="search" className="mb-6">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative max-w-4xl mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search songs, artists, playlists..."
                className="w-full rounded-full border border-slate-700 bg-slate-800 px-4 py-3 pr-28 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full ml-2"
              >
                Search
              </button>
            </div>
          </form>
        </section>

        <div className="max-w-4xl mx-auto mt-4 flex justify-center md:justify-end items-center ">
          <div className="relative ml-[80%]">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="p-2 rounded-2xl bg-slate-700 hover:bg-slate-700"
              aria-expanded={menuOpen}
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg ring-1 ring-black/20 z-50">
                <button onClick={() => { setMenuOpen(false); createPlaylist(); }} className="w-full text-left px-4 py-2 hover:bg-slate-700">Create Playlist</button>
                <button onClick={() => { setMenuOpen(false); setShowAddSongForm(true); }} className="w-full text-left px-4 py-2 hover:bg-slate-700">Add Song</button>
              </div>
            )}
          </div>
        </div>

        {showAddSongForm && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 mt-10">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddSongForm(false)} />
            <div className="relative w-full max-w-md bg-slate-800 rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Add Song</h3>
                <button onClick={() => setShowAddSongForm(false)} className="text-slate-300 hover:text-white">✕</button>
              </div>

              <form onSubmit={handlesongdata} className="space-y-3">

                <div>
                  <label className="block text-sm text-slate-200 mb-1">Song Name</label>
                  <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter song title" className="w-full rounded-md bg-slate-700 border border-slate-600 px-3 py-2 text-slate-100" />
                </div>

                <div>
                  <label className="block text-sm text-slate-200 mb-1">Artist</label>
                  <input value={formArtist} onChange={(e) => setFormArtist(e.target.value)} placeholder="Artist name" className="w-full rounded-md bg-slate-700 border border-slate-600 px-3 py-2 text-slate-100" />
                </div>

                <div>
                  <label className="block text-sm text-slate-200 mb-1">Upload Song</label>
                  <input type="file" accept="audio/*" onChange={(e) => setFormFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-gray-400 border-2 rounded-md p-2 px-10 mt-2" />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
                  <button type="button" onClick={() => setShowAddSongForm(false)} className="w-full sm:w-auto px-4 py-2 rounded-md bg-slate-700 text-slate-200">Cancel</button>
                  <button type="submit" className="w-full sm:w-auto px-4 py-2 rounded-md bg-indigo-600 text-white">Add to playlist </button>
                </div>
              </form>
            </div>
          </div>
        )}
         
         {playlists.length > 0 ?(
          <section id="results" className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Search Results</h2> 
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-1 md:grid-cols-2 ml-auto">
              {playlists.map((song, index) => (
                <div key={index} className="p-6 hover:bg-slate-700 border-1 border-gray-500 h-60 md:w-90 rounded-xl flex flex-col justify-center items-center">  
                <img src="./image/71Dfb1pufBL.png" className='h-30 w-30' />
                  <h3 className="text-lg font-semibold mb-2">{song.title}</h3>
                  <p className="text-slate-400 mb-2">Artist: {song.artist}</p>
                </div>
              ))}
            </div> 

          </section>
         ): (
          <p className="text-center text-slate-400 mt-10">No songs found in this playlist. Please add songs.</p>
         )}
      </main>
    </div>
  );
};

export default Search;
