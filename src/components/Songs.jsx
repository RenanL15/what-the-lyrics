import { useEffect } from "react";
import { useState } from "react";
import { dotWave } from "ldrs";
dotWave.register("l-dot-wave");
import axios from "axios";
import qs from "qs";
import UnknownSong from "../assets/unk-song.jpg";

export default function Songs({ playlistUrl }) {
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  useEffect(() => {
    const URL = playlistUrl.substr(34, playlistUrl.length);
    setNoResult(false);
    setLoading(true);
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        })
      )
      .then((res) => {
        console.log(res);
        axios
          .get(`https://api.spotify.com/v1/playlists/${URL}`, {
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            setLoading(false);
            setNoResult(false);
            console.log(res.data.tracks.items);
            setPlaylistData(res.data.tracks.items);

            res.data.tracks.items.forEach((element) => {
              for (const key in element.track.album) {
                const obj = element.track.album[key];
                console.log(obj);
              }
            });
          })
          .catch(() => {
            setLoading(false);
            setNoResult(true);
            setPlaylistData([]);
          });
      })
      .catch(() => {
        setLoading(false);
        setNoResult(true);
      });
  }, [playlistUrl]);

  return (
    <div className="flex flex-wrap justify-center gap-20 pb-20">
      {loading ? (
        <l-dot-wave size={100} color={"rgb(22,163,74)"}></l-dot-wave>
      ) : (
        //   Array(10)
        //     .fill("")
        playlistData.map((e, i) => (
          <div
            onClick={() => window.open(e.track.external_urls.spotify)}
            key={i}
            className="flex flex-col items-center gap-2 p-4 text-white border border-green-600 cursor-pointer w-60 hover:bg-green-800 hover:bg-opacity-20">
            <img
              src={
                e.track.album.images.length < 1
                  ? UnknownSong
                  : e.track.album.images[1].url
              }
              alt="Song picture"
              width={200}
            />
            <p className="text-xl font-semibold text-center">{e.track.name}</p>
            <p className="text-xl text-center text-green-500">
              {e.track.artists[0].name}
            </p>
          </div>
        ))
      )}
      {noResult && (
        <span className="text-xl text-white">Playlist não encontrada</span>
      )}
    </div>
  );
}
