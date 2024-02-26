import React from "react";
import { OrbitSpinner } from "react-epic-spinners";

export default function LoadingBox() {
  return (
    <div style={{ padding: "8rem", marginLeft: "16rem" }}>
      <OrbitSpinner color="blue" size={120} animationDelay={1000} />
      <p style={{ fontSize: "1.5rem" }}>Please Wait...</p>
    </div>
  );
}
