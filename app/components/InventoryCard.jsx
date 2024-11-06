// const InventoryCard = ({ inventory }) => {
//   return (
//     <div className="max-w-4xl m-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
//       <h2 className="text-2xl font-bold text-white mb-4 text-center">
//         Your Inventory
//       </h2>
//       <div className="space-y-3">
//         {inventory.length > 0 ? (
//           inventory.map((item, idx) => (
//             <div
//               key={idx}
//               className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all"
//             >
//               {/* Dummy Image */}
//               <img
//                 src={item.image || "https://via.placeholder.com/150"} // Placeholder if no image URL is available
//                 alt={item.name}
//                 className="w-full h-32 object-cover rounded-lg mb-2"
//               />

//               {/* Item Details */}
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-white font-medium">{item}</span>
//                 <span
//                   className={`text-sm ${
//                     item.rarity === "Rare"
//                       ? "text-yellow-400"
//                       : item.rarity === "Uncommon"
//                       ? "text-blue-400"
//                       : "text-gray-400"
//                   }`}
//                 >
//                   {item.rarity}
//                 </span>
//               </div>

//               {/* Power Bar */}
//               <div className="mt-1">
//                 <div className="w-full bg-gray-700/50 rounded-full h-2">
//                   <div
//                     className="bg-blue-500 h-2 rounded-full"
//                     style={{ width: `${(item.power / 200) * 100}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-center">No items in inventory.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventoryCard;

const InventoryCard = () => {
  const inventoryItems = [
    {
      id: 1,
      name: "Magic Sword",
      rarity: "Rare",
      power: 150,
      description: "A legendary blade infused with ancient magic",
    },
    {
      id: 2,
      name: "Shield",
      rarity: "Common",
      power: 100,
      description: "Standard protection against enemy attacks",
    },
    {
      id: 3,
      name: "Health Potion",
      rarity: "Uncommon",
      power: 75,
      description: "Restores vital energy in combat",
    },
    {
      id: 4,
      name: "Health Potion",
      rarity: "Uncommon",
      power: 75,
      description: "Restores vital energy in combat",
    },
  ];

  return (
    <div className="relative max-w-4xl m-8 h-auto">
      {/* Animated border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 rounded-xl blur opacity-75 animate-gradient-x"></div>

      <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 rounded-xl backdrop-blur-sm border border-purple-500/20 p-4">
        <h2
          className="text-2xl font-gothic text-red-200 mb-6"
          style={{ textShadow: "0 0 10px rgba(220, 38, 38, 0.5)" }}
        >
          Your Inventory
        </h2>
        <div className="space-y-3">
          {inventoryItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer transition-all duration-300"
            >
              {/* Item background with hover effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-red-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-purple-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">
                        {item.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          item.rarity === "Rare"
                            ? "bg-yellow-400/10 text-yellow-400"
                            : item.rarity === "Uncommon"
                            ? "bg-blue-400/10 text-blue-400"
                            : "bg-gray-400/10 text-gray-400"
                        }`}
                      >
                        {item.rarity}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[10px] mt-1.5">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end ml-3">
                    <span className="text-white text-[10px] font-medium mb-0.5">
                      {item.power}/200
                    </span>
                    <div className="w-12 bg-gray-700/50 rounded-full h-1 mt-0.5">
                      <div
                        className={`h-1 rounded-full ${
                          item.rarity === "Rare"
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : item.rarity === "Uncommon"
                            ? "bg-gradient-to-r from-blue-400 to-blue-600"
                            : "bg-gradient-to-r from-gray-400 to-gray-600"
                        }`}
                        style={{ width: `${(item.power / 200) * 100}%` }}
                      >
                        <div className="w-full h-full bg-white/10 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
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

export default InventoryCard;
