import { useEffect, useState } from "react";

export default function SearchTrack({
  playlistData,
  setPlaylistData,
  filteredPlaylistData,
}) {
  const [term, setTerm] = useState("");

  useEffect(() => {
    const filterSearch = filteredPlaylistData.filter((a) =>
      a.track.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setPlaylistData(filterSearch);
  }, [term]);

  return (
    <div className="flex flex-col items-start mb-6 ml-8 mr-auto text-base text-white">
      <label htmlFor="search">Search tracks:</label>
      <input
        type="text"
        onChange={(e) => setTerm(e.target.value)}
        size={30}
        className="p-2 py-1 bg-transparent border border-[rgba(255,255,255,0.39)] rounded-lg"
      />
    </div>
  );
}
