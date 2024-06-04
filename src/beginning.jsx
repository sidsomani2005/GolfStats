import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Beginning.css";

export default function Beginning() {
  const [courseName, setCourseName] = useState("");

  return (
    <div className="center-content">
      <h2 id="course-title">Getting Started</h2>
      <p id="course-prompt">
        Please enter the name of the course you have played.
      </p>
      <div id="courseName">
        <input
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </div>

      <Link to={`/entry/${courseName}`} id="proceed2">
        <button>Continue</button>
      </Link>
      {/* <button>Continue</button> */}
    </div>
  );
}
