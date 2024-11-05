const ShopCard = () => {
  const shopItems = [
    { id: 1, name: "Dragon Sword", price: 1000, type: "Weapon" },
    { id: 2, name: "Mana Crystal", price: 750, type: "Magic" },
    { id: 3, name: "Golden Armor", price: 1200, type: "Defense" },
  ];

  return (
    // <div className="w-72 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
    //   <h2 className="text-2xl font-bold text-white mb-4 text-center">Shop</h2>
    //   <div className="space-y-3">
    //     {shopItems.map((item) => (
    //       <div
    //         key={item.id}
    //         className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all cursor-pointer hover:bg-gray-800/50"
    //       >
    //         <div className="flex justify-between items-center">
    //           <span className="text-white font-medium">{item.name}</span>
    //           <span className="text-yellow-400 font-bold">{item.price}g</span>
    //         </div>
    //         <div className="mt-1">
    //           <span className={`text-sm ${
    //             item.type === 'Weapon' ? 'text-red-400' :
    //             item.type === 'Magic' ? 'text-purple-400' : 'text-blue-400'
    //           }`}>
    //             {item.type}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="relative m-8 max-w-4xl">
      {/* Animated border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-xl blur opacity-75 animate-gradient-x"></div>

      <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 rounded-xl backdrop-blur-sm border border-purple-500/20 p-4">
        <h2
          className="text-2xl font-gothic text-red-200 mb-4 text-center"
          style={{ textShadow: "0 0 10px rgba(220, 38, 38, 0.5)" }}
        >
          Shop
        </h2>
        <div className="space-y-2">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer transition-all duration-300"
            >
              {/* Card background with hover effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>

              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-purple-500/20 hover:bg-gray-800/50 transition-all">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-lg font-medium">
                      {item.name}
                    </span>
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full ${
                        item.type === "Weapon"
                          ? "bg-red-400/10 text-red-400"
                          : item.type === "Magic"
                          ? "bg-purple-400/10 text-purple-400"
                          : "bg-blue-400/10 text-blue-400"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <span className="text-yellow-400 text-lg font-bold">
                    {item.price}g
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add a decorative bottom accent */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent blur-sm"></div>
      </div>
    </div>
  );
};

export default ShopCard;
