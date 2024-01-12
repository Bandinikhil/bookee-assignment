import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="lg:mx-10">
        <div className="flex gap-3 text-blue-700 text-xl my-4">
          <Link to="/" className="mr-4">
            My Shifts
          </Link>
          <Link to="/available-shifts" className="mr-4">
            Available Shifts
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
