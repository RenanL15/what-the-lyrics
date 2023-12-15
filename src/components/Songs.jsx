import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Songs() {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.spotify.com/v1/playlists/5MVD62fLi3lBrgpHsxtRPE?si=4a95bcd04f7f4eae&limit=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.tracks.items);
        setPlaylistData(res.data.tracks.items);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {
        //   Array(10)
        //     .fill("")
        playlistData.map((e) => (
          <div className="p-4 bg-white h-72 rounded-xl w-60">
            <img
              src={`${e.track.album.images[1].url}`}
              alt="Song picture"
              width={200}
            />
            <p className="text-xl font-bold text-center">{e.track.name}</p>
          </div>
        ))
      }
    </div>
  );
}
