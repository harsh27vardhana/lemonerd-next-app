import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

function layout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  );
}

export default layout;
