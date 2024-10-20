import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg py-4 px-8 shadow-lg flex justify-between items-center font-semibold">
      {/* Logo Section */}
      <div className="logo flex items-center">
        <img
          src="/logo.png" // Replace with your logo path
          alt="Logo"
          className="h-12 mr-3"
        />
        <span className="text-white text-2xl">Vampire Card Game</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-5">
        <li>
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <a href="#how-to-play" className="nav-link">
            How to Play
          </a>
        </li>
        <li>
          <a href="#cards" className="nav-link">
            Cards
          </a>
        </li>
        <li>
          <Link href="/login" className="nav-link">
            Login / Sign Up
          </Link>
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
      `}</style>
    </nav>
  );
}
