import React from "react";

const VideoPlayer = () => {
  return (
    <section className="mx-auto h-56 w-full max-w-7xl bg-yellow-200 px-4 py-9 md:h-[400px]">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/yXWXFzjVnt8?autoplay=0&mute=1&loop=1&playlist=yXWXFzjVnt8"
        title="YouTube video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="h-full w-full"
      ></iframe>
    </section>
  );
};

export default VideoPlayer;
