import { useState } from "react";
import Songs from "./components/Songs";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">What the lyrics</h1>
          <div className="flex items-center my-12 max-w-[60rem] mx-6 gap-2">
            <div className="flex flex-col">
              <label htmlFor="" className="text-xl text-white">
                Enter your playlist
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => {
                    setInputUrl(e.target.value);
                  }}
                  size={100}
                  placeholder="https://open.spotify.com/playlist/34utpZc9RZRShEZso9DV65"
                  className="w-full px-2 py-2 text-2xl text-white bg-transparent border border-green-600 placeholder:opacity-50"
                />
                <button
                  onClick={() => {
                    setPlaylistUrl(inputUrl);
                    setInputUrl("");
                  }}
                  className="px-12 py-3 text-xl font-semibold text-white bg-green-700">
                  Go
                </button>
              </div>
            </div>
          </div>
          {/* <audio controls>
            <source
              src="https://p.scdn.co/mp3-preview/eb9de15a4465f504ee0eadba93e7d265ee0ee6ba?cid=e89c58aca13d4e72bc7dc02521952367"
              type="audio/mpeg"
            />
          </audio> */}
        </div>
        <Songs playlistUrl={playlistUrl} />
      </div>
    </main>
  );
}

export default App;
