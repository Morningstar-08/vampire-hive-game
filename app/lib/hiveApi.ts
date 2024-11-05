// import { Client, PrivateKey } from "@hiveio/dhive";

// const client = new Client([
//     "https://api.hive.blog",
//     "https://api.hivekings.com",
//     "https://api.openhive.network",
//   ]);

//   const broadcastGameResult = async (
//     username: string,
//     postingKey: string,
//     nftCard : string,
//     gameResult : string
//   ) => {
//     try {
//       // Convert WIF to PrivateKey object if it's a string
//       const privateKey =
//         typeof postingKey === "string"
//           ? PrivateKey.fromString(postingKey)
//           : postingKey;

//       // Prepare the custom JSON data
//       const customJsonOperation = [
//         "custom_json",
//         {
//           required_auths: [],
//           required_posting_auths: [username],
//           id: "vampireTesting",
//           json: JSON.stringify({
//             app: "vampire_game",
//             player: username,
//             nft_card: nftCard,
//             result: gameResult,
//             timestamp: new Date().toISOString(),
//           }),
//         },
//       ];

//       // Broadcast the transaction
//       const result = await client.broadcast.sendOperations(
//         [customJsonOperation],
//         privateKey
//       );

//       console.log("Transaction broadcast success:", result);
//       return result;
//     } catch (error) {
//       console.error("Transaction broadcast error:", error);
//       throw error;
//     }
//   };
