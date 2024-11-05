const ShopCard = () => {
    const shopItems = [
      { id: 1, name: "Dragon Sword", price: 1000, type: "Weapon" },
      { id: 2, name: "Mana Crystal", price: 750, type: "Magic" },
      { id: 3, name: "Golden Armor", price: 1200, type: "Defense" },
    ];
  
    return (
      <div className="w-72 bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Shop</h2>
        <div className="space-y-3">
          {shopItems.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all cursor-pointer hover:bg-gray-800/50"
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-yellow-400 font-bold">{item.price}g</span>
              </div>
              <div className="mt-1">
                <span className={`text-sm ${
                  item.type === 'Weapon' ? 'text-red-400' :
                  item.type === 'Magic' ? 'text-purple-400' : 'text-blue-400'
                }`}>
                  {item.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ShopCard;