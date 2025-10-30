"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

export type VideoAmbilightProps = {
  readonly videoId: string;
};

export function VideoAmbilight({ videoId }: VideoAmbilightProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const ambilightVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ambilightVideoRef.current) return;
    ambilightVideoRef.current.currentTime = videoCurrentTime;
  }, [videoCurrentTime]);

  return (
    <div className="relative flex size-full justify-center">
      <div id="video" className="aspect-video size-full rounded-lg">
        <ReactPlayer
          ref={videoRef}
          src={`https://www.youtube.com/watch?v=${videoId}`}
          width="100%"
          height="100%"
          onPlay={() => {
            setVideoPlaying(true);
            setVideoCurrentTime(videoRef.current?.currentTime || 0);
          }}
          onPause={() => {
            setVideoPlaying(false);
            setVideoCurrentTime(videoRef.current?.currentTime || 0);
          }}
          controls
        />
      </div>
      <div
        id="ambilight-video"
        className={`
          pointer-events-none absolute top-0 left-0 z-[-1] size-full shadow-[0_0_120px_rgba(0,0,0,0)] blur-[80px]
          saturate-300
        `}
      >
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${videoId}`}
          muted
          ref={ambilightVideoRef}
          width="100%"
          height="100%"
          playing={videoPlaying}
          controls={false}
        />
      </div>
    </div>
  );
}
