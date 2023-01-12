import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import FakeYoutube from "../api/fakeYoutube";
import { search } from "../api/youtube";
import VideoCard from "../components/VideoCard";

export default function Videos() {
  const { keyword } = useParams();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(["videos", keyword], () => {
    const youtube = new FakeYoutube();
    return youtube.search(keyword);
  });

  return (
    <>
      <div>Videos {keyword ? `🔍${keyword}` : "❤️‍🔥"}</div>
      {isLoading && <p>Lodaing...</p>}
      {error && <p>Something is Wrong</p>}
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
}
