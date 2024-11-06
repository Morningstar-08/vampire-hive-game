export default function HowToPlay() {
  return (
    <section
      id="how-to-play"
      className="bg-[rgb(9,9,10)] text-white py-16 flex justify-center items-center"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left side: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-5xl mb-5 text-red-500">How to Play</h2>
          <p className="text-lg">
            Welcome to the Vampire Card Game! Here’s how you play:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-4 text-lg">
            <li>Each player starts with a deck of cards.</li>
            <li>Players draw cards at the beginning of each round.</li>
            <li>Use your cards strategically to attack or defend.</li>
            <li>First player to defeat their opponent wins!</li>
          </ul>
        </div>

        {/* Right side: Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8 flex justify-center">
          <img
            src="/how-to-play.png"
            alt="How to Play"
            className="w-full max-w-xs md:max-w-md rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
