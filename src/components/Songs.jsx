import { useEffect, useRef } from "react";
import { useState } from "react";
import { dotWave } from "ldrs";
dotWave.register("l-dot-wave");
import axios from "axios";
import qs from "qs";
import UnknownSong from "../assets/unk-song.jpg";
import TrackPlayer from "./TrackPlayer";
import "animate.css";

export default function Songs({ playlistUrl }) {
  const [playlistData, setPlaylistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState("");
  const [correctTrack, setCorrectTrack] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [incorrectGuess, setIncorrectGuess] = useState(null);

  useEffect(() => {
    const URL = playlistUrl.substr(34, playlistUrl.length);
    setNoResult(false);
    setLoading(true);
    setCorrectTrack(null);
    setSelectedTrack(null);
    setIncorrectGuess(null);
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
        axios
          .get(`https://api.spotify.com/v1/playlists/${URL}`, {
            headers: {
              Authorization: `Bearer ${res.data.access_token}`,
            },
          })
          .then((res) => {
            const filteredTracks = res.data.tracks.items.filter(
              (a) => a.track.preview_url != null
            );
            const randomTrack =
              filteredTracks[
                Math.floor(Math.random() * filteredTracks.length - 1)
              ];
            setPlaylistData(filteredTracks);
            setTrack(randomTrack.track.preview_url);
            setCorrectTrack(randomTrack.track.id);
            console.log(randomTrack.track.id);
            console.log(res.data.tracks.items[3]);
            setLoading(false);
            setNoResult(false);
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
    <>
      {!noResult && !loading && <TrackPlayer track={track} />}
      <div className="flex flex-wrap justify-center gap-20 pb-20">
        {loading ? (
          <l-dot-wave size={100} color={"rgb(22,163,74)"}></l-dot-wave>
        ) : (
          //   Array(10)
          //     .fill("")
          playlistData.map((e, i) => (
            <div
              onClick={() => {
                if (e.track.id != correctTrack) {
                  setIncorrectGuess(true);
                  setSelectedTrack(e.track.id);
                } else {
                  setIncorrectGuess(false);
                }
              }}
              key={i}
              className={`flex flex-col items-center gap-2 p-4 text-green-500 border border-green-600 cursor-pointer w-60 hover:bg-green-800 hover:bg-opacity-20 ${
                incorrectGuess &&
                e.track.id != correctTrack &&
                e.track.id === selectedTrack &&
                "!border-red-600 !text-red-600 hover:!bg-red-600 hover:!bg-opacity-10 animate__animated animate__shakeX"
              } ${
                incorrectGuess === false &&
                e.track.id != correctTrack &&
                "!bg-neutral-500 !border-neutral-500 !text-neutral-500 !opacity-50 !bg-opacity-10 pointer-events-none select-none"
              }
                ${
                  incorrectGuess === false &&
                  e.track.id === correctTrack &&
                  "bg-green-800 bg-opacity-20 animate__animated animate__flash"
                }`}>
              <img
                src={
                  e.track.album.images.length < 1
                    ? UnknownSong
                    : e.track.album.images[1].url
                }
                alt="Song picture"
                width={200}
              />
              <p className="text-xl font-semibold text-center text-white">
                {e.track.name}
              </p>
              <p className="text-xl text-center ">{e.track.artists[0].name}</p>
            </div>
          ))
        )}
        {noResult && (
          <span className="text-xl text-white">Playlist not found.</span>
        )}
      </div>
    </>
  );
}
