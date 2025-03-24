import React from "react";

const VideoPlayer = () => {
  return (
    <div className="mx-auto flex h-[250px] items-center justify-center px-4 py-[36px] md:px-[50px] lg:max-w-6xl">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/yXWXFzjVnt8?autoplay=0&mute=1&loop=1&playlist=yXWXFzjVnt8"
        title="YouTube video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="h-full w-full"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
