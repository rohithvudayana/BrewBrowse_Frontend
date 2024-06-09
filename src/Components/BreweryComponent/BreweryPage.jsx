import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import "./BreweryPage.css";
import ThumbsUpRating from "../../stores/Rating";

const BreweryPage = () => {
  const { id } = useParams();
  const [breweries, setBreweries] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [overallRating, setOverallRating] = useState(0);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/brewery/getBrewes/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
          }
          );
          setBreweries(response.data);

      const reviewsResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/review/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
          }
          );
      setReviews(reviewsResponse.data.reviews);
      setOverallRating(reviewsResponse.data.overallRating);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleReviewSubmit = async () => {
    setReviews([...reviews, newReview]);
    const token = `bearer ${localStorage.getItem("token")}`;
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/review/addReview`,
        {
          newReview,
          rating,
          id: breweries.id,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setNewReview("");
      fetchData();
    } catch (err) {
      console.error("Error in HandleReviewSubmit:", err);
    }
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="breweries-container">
      <div className="breweries-left">
      <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>{breweries.name}</h2>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Current Rating: </span>{overallRating}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Brewery Address: </span>{breweries.address_1}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Brewery Type: </span>{breweries.brewery_type}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Phone No: </span>{breweries.phone}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>City: </span>{breweries.city}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>State Province: </span>{breweries.state_province}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>State: </span>{breweries.state}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Postal Code: </span>{breweries.postal_code}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Country: </span>{breweries.country}</p>
      <p><span style={{ fontWeight: "400", fontSize: "18px" }}>Website: </span>{breweries.website_url}</p>

        <div className="breweries-bottom">
          <ThumbsUpRating onRate={handleRating} />
          <br />
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Add your review..."
              style={{ width: "100%", height: "60px" }}
            />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      </div>
      <div className="breweries-right">
          <h3>Reviews</h3>
          {reviews.map((review, index) => (
            <div key={index}>
              <span style={{ fontWeight: "bold" }}>{review.owner}</span>
              <br />
              {review.review}
              <br />
              {review.rated}
              <FaThumbsUp size={16} color="#000000" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BreweryPage;
