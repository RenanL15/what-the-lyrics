import { useRef, useState, useEffect, useCallback } from "react";
import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";
import Timeline from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";
import { FaPause, FaPlay } from "react-icons/fa";

const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [containerRef]);

  return wavesurfer;
};

const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  const onPlayClick = useCallback(() => {
    wavesurfer.setVolume(0.2);
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    setCurrentTime(0);
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("timeupdate", (currentTime) => setCurrentTime(currentTime)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <>
      <div ref={containerRef} />

      <button
        onClick={onPlayClick}
        className="self-center px-6 py-3 text-xl font-semibold text-white bg-green-600 rounded-md">
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </>
  );
};

export default function TrackPlayer({ track }) {
  const urls = [track];
  const [audioUrl, setAudioUrl] = useState(urls[0]);

  const onUrlChange = useCallback(() => {
    urls.reverse();
    setAudioUrl(urls[0]);
  }, []);

  return (
    <div className="flex flex-col items-center m-auto mb-12">
      <WaveSurferPlayer
        height={50}
        width={350}
        waveColor="rgb(11, 149, 39)"
        progressColor="rgb(21, 86, 9)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />
    </div>
  );
}
