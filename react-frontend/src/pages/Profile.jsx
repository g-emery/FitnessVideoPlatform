import { useState, useEffect } from "react";

const Profile = () => {
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.warn("User not logged in");
      setLoading(false);
      return;
    }

    const fetchPoints = async () => {
      try {
        const res = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();
        console.log("Profile data:", data);

        // Your user model now includes points because we extended it
        setPoints(data.points || 0);
      } catch (err) {
        console.error("Error fetching points:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Total Points</h1>
      <h2 style={{ fontSize: "3rem", marginTop: "1rem" }}>
        {points}
      </h2>
    </div>
  );
};

export default Profile;
