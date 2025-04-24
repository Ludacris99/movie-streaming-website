import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4 mt-10">
      <p className="text-lg font-semibold">
        Nexus - Your ultimate destination for movies and entertainment.
      </p>
      <div className="mt-2">
        <a href="#" className="text-blue-500 hover:underline mx-2">
          About Us
        </a>
        <a href="#" className="text-blue-500 hover:underline mx-2">
          Contact
        </a>
        <a href="#" className="text-blue-500 hover:underline mx-2">
          Privacy Policy
        </a>
        <a href="#" className="text-blue-500 hover:underline mx-2">
          Terms of Service
        </a>
      </div>
      <p className="mt-4 text-sm">© 2025 Nexus. All rights reserved.</p>
    </footer>
  );
};

export default Footer;