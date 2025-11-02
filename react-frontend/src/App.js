import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Populate tags AND uploaded media
        let url = "http://localhost:1337/api/videos?populate=*";

        // Filter by selected tag if not "all"
        if (selectedTag !== "all") {
          url += `&filters[tags][tag][$containsi]=${encodeURIComponent(selectedTag)}`;
        }

        console.log("Fetching videos with URL:", url); // Debug
        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched videos:", data);
        setVideos(data.data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchVideos();
  }, [selectedTag]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🎬 Video Library - On Demand</h1>

      <SearchBar selectedTag={selectedTag} setSelectedTag={setSelectedTag} />

      {videos.length === 0 && <p>No videos found.</p>}

      {videos.map((video) => {
        // Use capitalized API fields
        const title = video.Title || "No Title";
        const description = video.Description || "No Description";

        // Safely access uploaded file (single File)
        const fileData = video.File;
        const videoUrl = fileData?.url
          ? `http://localhost:1337${fileData.url}`
          : video.Video_URL;

        // Tags
        const tags = video.attributes?.tags?.map(tag => tag.attributes.tag) || [];
        console.log({ title, description, videoUrl, tags });
        return (
          <div
            key={video.id}
            style={{
              marginBottom: "2rem",
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <h2>{title}</h2>
            <p>{description}</p>
            <p>Tags: {tags.join(", ") || "No Tags"}</p>

            {videoUrl ? (
              videoUrl.includes("youtube.com") ? (
                <iframe
                  width="560"
                  height="315"
                  src={videoUrl.replace("watch?v=", "embed/")}
                  title={title}
                  allowFullScreen
                />
              ) : (
                <video width="560" controls>
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
  );
}

export default App;
