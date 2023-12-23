import { useState } from "react";
import Songs from "./components/Songs";
import TrackPlayer from "./components/TrackPlayer";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center">
        <h1 className="mt-16 text-4xl font-light text-white">
          Guess your track!
        </h1>
        <div className="flex items-center my-12 max-w-[60rem] mx-6 gap-2">
          <div className="flex flex-col">
            <label htmlFor="" className="text-xl text-white">
              Enter your playlist
            </label>
            <div className="flex">
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                }}
                size={100}
                placeholder="https://open.spotify.com/playlist/34utpZc9RZRShEZso9DV65"
                className="w-full px-2 py-2 text-2xl text-white bg-transparent border border-green-600 placeholder:opacity-50 max-sm:text-lg"
              />
              <button
                onClick={() => {
                  setPlaylistUrl(inputUrl);
                  setInputUrl("");
                }}
                className="px-12 text-xl font-semibold text-white bg-green-700">
                Go
              </button>
            </div>
          </div>
        </div>
        <Songs playlistUrl={playlistUrl} />
      </div>
    </main>
  );
}

export default App;
