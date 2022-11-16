import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 333 }}>
      <p
        style={{
          fontWeight: "bold",
          color: "red",
          fontSize: 20,
          fontFamily: "Helvetica",
        }}
      >
        Not found, back to home page in 3 seconds...
      </p>
    </div>
  );
}

export default NotFound;
