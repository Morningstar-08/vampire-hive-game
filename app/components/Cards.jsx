// components/RarityCards.js

export default function Cards() {
    // Card types for rarity
    const cardTypes = [
        { name: 'Vampire', image: '/images/vampire.png' },
        { name: 'Werewolf', image: '/images/werewolf.png' },
        { name: 'Witch', image: '/images/witch.png' },
        { name: 'Human', image: '/images/human.png' },
    ];

    // Card types for power-ups and boosters
    const powerUpCards = [
        { name: 'Speed Boost', image: '/images/speed-boost.png' },
        { name: 'Shield', image: '/images/shield.png' },
        { name: 'Double Damage', image: '/images/double-damage.png' },
        { name: 'Revive', image: '/images/revive.png' },
    ];

    return (
        <section className="bg-black text-white py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl mb-8 text-center">Card Rarities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cardTypes.map((card, index) => (
                        <div
                            key={index}
                            style={{ backgroundColor: 'rgb(55, 65, 81)' }} // Updated card background color
                            className="p-4 rounded-lg text-center"
                        >
                            <img src={card.image} alt={card.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl">{card.name}</h3>
                        </div>
                    ))}
                </div>

                {/* Power-Ups and Boosters Section */}
                <h2 className="text-4xl mb-8 mt-12 text-center">Power-Ups and Boosters</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {powerUpCards.map((card, index) => (
                        <div
                            key={index}
                            style={{ backgroundColor: 'rgb(55, 65, 81)' }} // Updated card background color
                            className="p-4 rounded-lg text-center"
                        >
                            <img src={card.image} alt={card.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl">{card.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
