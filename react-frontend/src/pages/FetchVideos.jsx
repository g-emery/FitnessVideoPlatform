import { useEffect, useState, useRef } from "react";
import SearchBar from "../components/searchBar";

function FetchVideos() {
  const [videos, setVideos] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const awardedVideosRef = useRef(new Set());

  const handleVideoEnded = async (videoId) => {
    // Avoid awarding points multiple times for the same video in one session
    if (awardedVideosRef.current.has(videoId)) {
      console.log("Points already awarded for this video in this session.");
      return;
    }
    awardedVideosRef.current.add(videoId);
    
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        console.warn("No JWT found in localStorage.");
        return;
      }

  const res = await fetch("http://localhost:1337/api/gamification/watch-completed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ videoId }),
      });

      const data = await res.json();
      console.log("Watch completed response:", data);
    } catch (err) {
      console.error("Error reporting watch completed:", err);
    }
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        let url = "http://localhost:1337/api/videos?populate=*";

        if (selectedTag !== "all") {
          url += `&filters[tags][tag][$containsi]=${encodeURIComponent(
            selectedTag
          )}`;
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

  // 🔹 Group videos by their tags
  const groupVideosByTag = (videosArray) => {
    const groups = {};

    videosArray.forEach((video) => {
      // Safely get tags from the video object
      // Adjust this if your Strapi shape is different
      const videoTags = Array.isArray(video.tags)
        ? video.tags
        : video.attributes?.tags?.data?.map((t) => t.attributes?.tag) || [];

      const tagNames = videoTags
        .map((t) => (typeof t === "string" ? t : t.tag || t?.attributes?.tag))
        .filter(Boolean);

      // If no tags, put into "Other"
      const finalTags = tagNames.length > 0 ? tagNames : ["Other"];

      finalTags.forEach((tagName) => {
        if (!groups[tagName]) {
          groups[tagName] = [];
        }
        groups[tagName].push(video);
      });
    });

    return groups;
  };

  const groupedVideos = groupVideosByTag(videos);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Browse</h1>

      <SearchBar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      {videos.length === 0 && <p>No videos found.</p>}

      {/* 🔹 Render each tag group as a horizontal scroll row */}
      {Object.entries(groupedVideos).map(([tagName, videosForTag]) => (
        <div key={tagName} style={{ marginBottom: "2rem" }}>
          <h2>{tagName}</h2>

          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "1rem",
              paddingBottom: "0.5rem",
            }}
          >
            {videosForTag.map((video) => {
              const title = video.Title || video.attributes?.Title || "No Title";
              const description =
                video.Description ||
                video.attributes?.Description ||
                "No Description";

              const fileData = video.File || video.attributes?.File;
              const videoUrl = fileData?.url
                ? `http://localhost:1337${fileData.url}`
                : video.Video_URL || video.attributes?.Video_URL;

              return (
                <div
                  key={video.id}
                  style={{
                    minWidth: "360px",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                    boxSizing: "border-box",
                  }}
                  onClick={() => videoUrl && setFullscreenVideo({
                    url: videoUrl,
                    id: video.id,
                    title,
                  })}
                >
                  <h3>{title}</h3>
                  <p>{description}</p>

                  {videoUrl ? (
                    videoUrl.includes("youtube.com") ? (
                      <iframe
                        width="100%"
                        height="200"
                        src={videoUrl.replace("watch?v=", "embed/")}
                        title={title}
                        allowFullScreen
                        style={{ borderRadius: "8px", border: "none" }}
                      />
                    ) : (
                      <video
                        width="100%"
                        controls
                        style={{ borderRadius: "8px" }}
                        onEnded={()=> handleVideoEnded(video.id)}
                      >
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
          </div>
        </div>
      ))}

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
          {fullscreenVideo.url.includes("youtube") ? (
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
              src={fullscreenVideo.url}
              controls
              autoPlay
              onEnded={() => handleVideoEnded(fullscreenVideo.id)}
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
