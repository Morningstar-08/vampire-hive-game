const InventoryCard = ({ inventory }) => {
  return (
    <div className="max-w-4xl m-8 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Your Inventory
      </h2>
      <div className="space-y-3">
        {inventory.length > 0 ? (
          inventory.map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all"
            >
              {/* Dummy Image */}
              <img
                src={item.image || "https://via.placeholder.com/150"} // Placeholder if no image URL is available
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />

              {/* Item Details */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-medium">{item}</span>
                <span
                  className={`text-sm ${
                    item.rarity === "Rare"
                      ? "text-yellow-400"
                      : item.rarity === "Uncommon"
                      ? "text-blue-400"
                      : "text-gray-400"
                  }`}
                >
                  {item.rarity}
                </span>
              </div>

              {/* Power Bar */}
              <div className="mt-1">
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(item.power / 200) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">No items in inventory.</p>
        )}
      </div>
    </div>
  );
};

export default InventoryCard;

// const InventoryCard = ({ inventory }) => {
//   return (
//     <div className="w-72 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
//       <h2 className="text-2xl font-bold text-white mb-4 text-center">
//         Your Inventory
//       </h2>
//       <div className="space-y-3">
//         {inventory.length > 0 ? (
//           inventory.map((item) => (
//             <div
//               key={item.id}
//               className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all"
//             >
//               <div className="flex justify-between items-center">
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
