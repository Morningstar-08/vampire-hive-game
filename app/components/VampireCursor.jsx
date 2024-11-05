import React, { useEffect, useState } from 'react';
import { Droplet, Skull } from 'lucide-react';

const VampireCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trails, setTrails] = useState([]);
  const [isClicking, setIsClicking] = useState(false);
  const [showSkull, setShowSkull] = useState(false);

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (Math.random() < 0.3) {  // Increased frequency of blood drops
        setTrails(prev => [...prev, {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
          size: Math.random() * 0.8 + 1,  // Larger drops
          rotation: Math.random() * 360
        }].slice(-12));  // More trails visible
      }
    };

    const pointerHandler = () => {
      const cursor = window.getComputedStyle(document.documentElement).cursor;
      setIsPointer(cursor === 'pointer');
      setShowSkull(cursor === 'pointer');
    };

    const mouseDownHandler = () => setIsClicking(true);
    const mouseUpHandler = () => setIsClicking(false);

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseover', pointerHandler);
    document.addEventListener('mousedown', mouseDownHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseover', pointerHandler);
      document.removeEventListener('mousedown', mouseDownHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrails(prev => prev.slice(1));
    }, 500); // Reduced from 1000ms to 500ms for faster cleanup

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          className={`relative transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${
            isPointer ? 'scale-150' : 'scale-100'
          }`}
        >
          {/* Enhanced bat cursor design */}
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            className="animate-hover"
          >
            {/* Larger, more detailed wings */}
            <path
              d="M2 15C2 10 4 5 10 2C7 8 9 14 14 16C16 10 22 10 24 16C29 14 31 8 28 2C34 5 36 10 36 15C36 20 30 25 18 25C6 25 2 20 2 15Z"
              className="fill-red-950 stroke-red-800"
              strokeWidth="2"
            />
            {/* Spikier body */}
            <path
              d="M16 15L18 20L20 15"
              className="stroke-red-800"
              strokeWidth="2"
              fill="none"
            />
            {/* Glowing red eyes */}
            <circle cx="15" cy="12" r="1.5" className="fill-red-500 animate-pulse" />
            <circle cx="21" cy="12" r="1.5" className="fill-red-500 animate-pulse" />
            {/* Sharp fangs */}
            <path
              d="M17 13L18 15L19 13M16 13L17 15M19 13L20 15"
              className="stroke-red-200"
              strokeWidth="1"
            />
          </svg>

          {/* Enhanced click effect */}
          {isClicking && (
            <>
              <div className="absolute w-16 h-16 -left-4 -top-4 border-2 border-red-800 rounded-full animate-ping" />
              <div className="absolute w-12 h-12 -left-2 -top-2 border-2 border-red-600 rounded-full animate-pulse" />
            </>
          )}

          {/* Skull appears on hover */}
          {showSkull && (
            <div className="absolute -top-8 -right-8 text-red-800 animate-fadeIn">
              <Skull size={24} className="animate-float" />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced blood trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] text-red-800 animate-bloodDrip"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            opacity: 0.9 - (index * 0.1), // Increased opacity fade
            transform: `translate(-50%, -50%) scale(${trail.size}) rotate(${trail.rotation}deg)`
          }}
        >
          <Droplet 
            className="animate-bounce drop-shadow-lg shadow-red-800"
            fill="rgba(153, 27, 27, 0.8)"
          />
        </div>
      ))}

      {/* Enhanced global styles */}
      <style jsx global>{`
        @keyframes bloodDrip {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, calc(-50% + 15px)) scale(0.85);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 30px)) scale(0.7);
          }
        }

        @keyframes hover {
          0%, 100% {
            transform: translateY(0px) rotate(-3deg);
          }
          50% {
            transform: translateY(-3px) rotate(3deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-hover {
          animation: hover 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in forwards;
        }

        .animate-bloodDrip {
          animation: bloodDrip 1.2s ease-in forwards; /* Reduced from 2s to 1.2s */
        }

        body, * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default VampireCursor;