import React, { useState} from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Mainpage.css";
import SearchPage from "../../stores/searchPage";
import ClipLoader from "react-spinners/ClipLoader";

const Mainpage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const updateSearchResults = (results) => {
    setSearchResults(results);
    fetchOverallRatings(results);
  };

  const fetchOverallRatings = async (results) => {
    const updatedResults = [];
    setIsLoading(true);
    for (const item of results) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/review/rating/${item.id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
          }
        );
        const updatedItem = { ...item, overallRating: response.data.overallRating };
        updatedResults.push(updatedItem);
      } catch (error) {
        console.error(`Error fetching overall rating for item ${item.id}:`, error);
        const updatedItem = { ...item, overallRating: "No rating" };
        updatedResults.push(updatedItem);
      }
    }
    setIsLoading(false);
    setSearchResults(updatedResults);
  };

  return (
    <div className="home-container">
      <div className="search">
        <SearchPage onSearchResultsUpdate={updateSearchResults} />
      </div>
      {
        isLoading ? <ClipLoader color="red" size={25} /> :
        <div className="details">
        {searchResults &&
          searchResults.map((item) => (
            <Card
              key={item.id}
              className="brewery-card"
              actions={[
                <Link to={`/details/${item.id}`}>Add Review</Link>,
              ]}
            >
              <Card.Meta
                title={item.name}
              />
              <div className="card-footer">
                <p><span style={{ fontWeight: "600" }}>Address: </span>{item.address_1}</p>
                <p><span style={{ fontWeight: "600" }}>Phone: </span>{item.phone}</p>
                <p><span style={{ fontWeight: "600" }}>City: </span>{item.city}</p>
                <p><span style={{ fontWeight: "600" }}>Type: </span>{item.brewery_type}</p>
                <p><span style={{ fontWeight: "600" }}>State: </span>{item.state}</p>
                <p><span style={{ fontWeight: "600" }}>Overall Rating: </span>{item.overallRating}</p>
              </div>
            </Card>
          ))}
        </div>
      }
    </div>
  );
};

export default Mainpage;
