import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

function FetchVideos() {
  const [videos, setVideos] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  useEffect(() => {
    const getVideos = async () => {
      try {
        let url = "http://localhost:1337/api/videos?populate=*";

        if (selectedTag !== "all") {
          url += `&filters[tags][tag][$containsi]=${encodeURIComponent(selectedTag)}`;
        }

        console.log("Fetching videos with URL:", url);
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched videos:", data);
        setVideos(data.data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    getVideos();
  }, [selectedTag]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎬 Video Library - On Demand</h1>

      <SearchBar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      {videos.length === 0 && <p>No videos found.</p>}

      {videos.map((video) => {
        const title = video.Title || "No Title";
        const description = video.Description || "No Description";
        const fileData = video.File;
        const videoUrl = fileData?.url
          ? `http://localhost:1337${fileData.url}`
          : video.Video_URL;

        const tags =
          video.attributes?.tags?.map((tag) => tag.attributes.tag) || [];

        return (
          <div
            key={video.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => setFullscreenVideo(videoUrl)}
          >
            <h2>{title}</h2>
            <p>{description}</p>

            {videoUrl ? (
              videoUrl.includes("youtube.com") ? (
                <iframe
                  width="560"
                  height="315"
                  src={videoUrl.replace("watch?v=", "embed/")}
                  title={title}
                  allowFullScreen
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <video width="560" controls style={{ borderRadius: "8px" }}>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )
            ) : (
              <p>No video file or URL available.</p>
            )}
          </div>
        );
      })}

      {/* 🎥 Fullscreen overlay */}
      {fullscreenVideo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setFullscreenVideo(null)}
        >
          {fullscreenVideo.includes("youtube") ? (
            <iframe
              width="80%"
              height="80%"
              src={fullscreenVideo.replace("watch?v=", "embed/")}
              title="Fullscreen video"
              allowFullScreen
              style={{ border: "none", borderRadius: "8px" }}
            />
          ) : (
            <video
              src={fullscreenVideo}
              controls
              autoPlay
              style={{ width: "80%", height: "auto", borderRadius: "8px" }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside video
            />
          )}
        </div>
      )}
    </div>
  );
}

export default FetchVideos;
