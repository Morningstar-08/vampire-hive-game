// components/WhyVampireGame.js

export default function WhyVampireGame() {
    const features = [
        {
            title: 'Rarity',
            description: 'Each NFT is of one of the four rarities- COMMON, RARE, EPIC, and LEGENDARY. Once all the packs have been opened, no more of that NFT will be issued.',
        },
        {
            title: 'Uniqueness',
            description: 'Even if two NFTs look similar, their uniqueness can be easily verified by using the blockchain explorer.',
        },
        {
            title: 'Ownership',
            description: 'You have complete ownership over the assets that you have in your account. You are free to trade, sell, or burn your NFTs.',
        },
    ];

    return (
        <section className="bg-black text-white py-16"> {/* Changed background to black */}
            <div className="container mx-auto px-4">
                <h2 className="text-4xl mb-8 text-center">Why Vampire Game?</h2>
                <div className="flex flex-col md:flex-row justify-around">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-700 p-6 rounded-lg text-center mb-6 md:mb-0 md:mx-4" // Added mx-4 for spacing between cards
                        >
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
