import React from "react";
import GooeyNav from "./GooeyNav";

const GooeyNavBarWrapper = ({ isLoggedIn, handleLogout }) => {
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Analyzer", href: "/analyzer" },
  ];

  if (isLoggedIn) {
    items.push({ label: "Profile", href: "/profile" });
    items.push({ label: "Logout", href: "/" });
  } else {
    items.push({ label: "Login/SignUp", href: "/auth" });
  }

  const handleItemClick = (item) => {
    if (item.label === "Logout") {
      handleLogout();
    }
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
    </div>
  );
};

export default GooeyNavBarWrapper;
