import Songs from "./components/Songs";

function App() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">What the lyrics</h1>
          <input
            type="text"
            placeholder="Enter your playlist"
            className="px-2 py-2 text-2xl w-[30rem] rounded-xl"
          />
          <audio controls>
            <source
              src="https://p.scdn.co/mp3-preview/eb9de15a4465f504ee0eadba93e7d265ee0ee6ba?cid=e89c58aca13d4e72bc7dc02521952367"
              type="audio/mpeg"
            />
          </audio>
        </div>
        <Songs />
      </div>
    </main>
  );
}

export default App;
