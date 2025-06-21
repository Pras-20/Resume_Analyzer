import React from "react";
import GooeyNav from "./GooeyNav";
import { useNavigate } from "react-router-dom";

const GooeyNavBarWrapper = ({ isLoggedIn, handleLogout }) => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Analyzer", href: "/analyzer" },
    { label: "About", href: "/about" },
  ];

  if (!isLoggedIn) {
    items.push({ label: "Login/SignUp", href: "/auth" });
  }

  const handleItemClick = (item) => {
    navigate(item.href);
  };

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        onItemClick={handleItemClick}
      />
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: 10,
            right: 20, // Added left spacing
            marginLeft: 20, // Added margin-left for extra spacing
            padding: "12px 30px", // Longer button with more padding
            backgroundColor: "#6a0dad", // A nice shade of purple (dark orchid)
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px", // Slightly bigger text
            boxShadow: "0 2px 6px rgba(106, 13, 173, 0.4)", // subtle shadow matching purple
          }}
        >
          {" "}
          Logout
        </button>
      )}
    </div>
  );
};

export default GooeyNavBarWrapper;
