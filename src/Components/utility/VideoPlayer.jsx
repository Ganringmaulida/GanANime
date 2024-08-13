"use client";
import { XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import YouTube from "react-youtube";

const VideoPlayer = ({ youtubeId }) => {
  const [isOpen, setIsOpen] = useState(false); // Default to false so the button is shown initially

  const handleVideoPlayer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const options = {
    width: "300",
    height: "250",
    playerVars: {
      // You can add other player options here if needed
    },
  };

  const PlayerComponent = () => {
    return (
      <div className="fixed bottom-2 right-2 bg-white p-2 rounded shadow-lg z-50 px-3 mb-1">
        <button
          onClick={handleVideoPlayer}
          className="absolute top-2 right-2 text-color-primary"
        >
          <XCircle size={32} />
        </button>
        <div className="relative w-full h-full">
          <YouTube
            videoId={youtubeId}
            onReady={(event) => event.target.pauseVideo()}
            opts={options}
          />
        </div>
      </div>
    );
  };

  const ButtonOpen = () => {
    return (
      <button
        onClick={handleVideoPlayer}
        className="fixed bottom-5 right-5 w-32 bg-color-primary text-color-dark text-cl hover:text-color-accent shadow-xl"
      >
        Tonton
      </button>
    );
  };

  return isOpen ? <PlayerComponent /> : <ButtonOpen />;
};

export default VideoPlayer;
