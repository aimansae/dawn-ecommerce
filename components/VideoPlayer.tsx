import React from "react";

const VideoPlayer = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:py-9">
      <div className="aspect-video h-64 w-full">
        <iframe
          src="https://www.youtube.com/embed/yXWXFzjVnt8?autoplay=0&mute=1&loop=1&playlist=yXWXFzjVnt8"
          title="YouTube video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="h-full w-full"
        ></iframe>{" "}
      </div>
    </section>
  );
};

export default VideoPlayer;
