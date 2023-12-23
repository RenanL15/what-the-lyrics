// React example

/*
  <html>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </html>
*/

// Import React hooks
import { useRef, useState, useEffect, useCallback } from "react";

// Import WaveSurfer
import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";
import Timeline from "https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js";

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
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
  }, [options, containerRef]);

  return wavesurfer;
};

// Create a React component that will render wavesurfer.
// Props are wavesurfer options.
const WaveSurferPlayer = (props) => {
  const containerRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const wavesurfer = useWavesurfer(containerRef, props);

  // On play button click
  const onPlayClick = useCallback(() => {
    wavesurfer.setVolume(0.3);
    wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
  }, [wavesurfer]);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
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
        className="self-center p-2 px-6 text-xl font-semibold text-white bg-green-600 rounded-lg">
        {isPlaying ? "Pause" : "Play"}
      </button>

      {/* <p>Seconds played: {currentTime.toFixed(0)}</p> */}
    </>
  );
};

// Another React component that will render two wavesurfers
export default function TrackPlayer({ track }) {
  const urls = [track];
  const [audioUrl, setAudioUrl] = useState(urls[0]);

  // Swap the audio URL
  const onUrlChange = useCallback(() => {
    urls.reverse();
    setAudioUrl(urls[0]);
  }, []);

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <div className="flex flex-col items-center m-auto mb-12">
      <WaveSurferPlayer
        height={70}
        width={500}
        waveColor="rgb(11, 149, 39)"
        progressColor="rgb(21, 86, 9)"
        url={audioUrl}
        plugins={[Timeline.create()]}
      />
    </div>
  );
}
