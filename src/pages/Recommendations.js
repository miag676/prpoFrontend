import React, { useState, useEffect } from "react";
import { getRecommendations } from "../api";
import { useAuth } from "../AuthContext";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth(); // Get userId from AuthContext

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log("userId", userId);
        if (userId) {
          const data = await getRecommendations(userId);
          setRecommendations(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [userId]);

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <div>
      <h2>Your Recommendations</h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <strong>{rec.bookTitle}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available at this time.</p>
      )}
    </div>
  );
};

export default Recommendations;
