import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg py-4 px-8 shadow-lg flex justify-between items-center font-semibold">
      {/* Logo Section */}
      <div className="logo flex items-center">
        <img
          src="/logo.jpg" // Replace with your logo path
          alt="Logo"
          className="h-12 mr-3"
        />
        {/* Conditionally render the title based on mobile dropdown state */}
        {/* This should hide the title when the dropdown is open */}
        <span className={`text-white text-2xl ${isOpen ? "hidden" : ""}`}>
          The Coffin's Oath
        </span>
      </div>

      {/* Dropdown Arrow for Mobile */}
      <button
        className="dropdown-toggle md:hidden flex items-center"
        onClick={toggleDropdown}
      >
        <span className="text-white mr-2">Menu</span>
        <FiChevronDown
          className={`text-white text-2xl transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""} md:flex gap-5`}>
        <li>
          <Link href="/" className="nav-link" onClick={handleOptionClick}>
            Home
          </Link>
        </li>
        <li>
          <a
            href="#how-to-play"
            className="nav-link"
            onClick={handleOptionClick}
          >
            How to Play
          </a>
        </li>
        <li>
          <a href="#cards" className="nav-link" onClick={handleOptionClick}>
            Cards
          </a>
        </li>
        <li>
          <button className="nav-link" onClick={props.openModal}>
            Login / Sign Up
          </button>
        </li>
      </ul>

      {/* Glow effect styles */}
      <style jsx>{`
        .nav-link {
          font-size: 1.2rem;
          color: #e9e0e0;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #ff4757;
          text-shadow: 0px 0px 8px rgba(255, 71, 87, 0.8);
        }

        .nav-link.active {
          text-shadow: 0 0 15px rgba(255, 71, 87, 1);
        }

        /* Dropdown arrow styling */
        .dropdown-toggle {
          cursor: pointer;
        }

        /* Open and close the mobile menu */
        .nav-links {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 60px;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.8);
          padding: 1rem;
          transition: max-height 0.3s ease-in-out;
          overflow: hidden;
        }

        .nav-links.open {
          display: flex;
          max-height: 300px; /* Adjust the height as per content */
        }

        /* Responsive styles */
        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
            position: relative;
            flex-direction: row;
            top: unset;
            left: unset;
            background-color: unset;
            width: auto;
            padding: 0;
          }

          .dropdown-toggle {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
