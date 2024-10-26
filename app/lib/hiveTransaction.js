import hiveTx from "hive-tx";
// import mongoose from "mongoose";

// const userData = {
//   authorized: false,
//   username: "",
//   key: "",
// };

// const login = async () => {
//   const loginModal = bootstrap.Modal.getInstance(
//     document.getElementById("login-modal")
//   );
//   const loginButtonForm = document.getElementById("login-form-btn");
//   loginButtonForm.setAttribute("disabled", "true");
//   const loginError = document.getElementById("login-error");
//   loginError.style.display = "none";
//   const username = document.getElementById("username").value;
//   const key = document.getElementById("posting-key").value;
//   const validate = await validatePostingKey(username, key);
//   if (validate.result === 0) {
//     loginError.innerHTML = validate.error;
//     loginError.style.display = "block";
//     loginButtonForm.removeAttribute("disabled");
//     return;
//   }
//   userData.authorized = true;
//   userData.username = username;
//   userData.key = key;
//   window.localStorage.setItem("userData", JSON.stringify(userData));
//   loginButtonForm.removeAttribute("disabled");
//   updateState();
//   loginModal.hide();
// };

export const sendGameResult = async () => {
  try {
    const game = {
      wins: 1,
      losses: 2,
      nftCardUsed: "TestingVampire",
    };
    const operations = [
      [
        "custom_json",
        {
          required_auths: [],
          required_posting_auths: ["kammeows"],
          id: "vampireTesting", //to identify the card, like find it later on
          json: JSON.stringify(game),
        },
      ],
    ];
    const tx = new hiveTx.Transaction();
    await tx.create(operations);
    const privateKey = hiveTx.PrivateKey.from(userData.key);
    tx.sign(privateKey);
    const result = await tx.broadcast();
    if (result && result.result && result.result.block_num) {
      return result;
      console.log("yayayayayayaay ho gaya meow");
    } else {
      console.log("oops some error meow");
    }
  } catch (e) {
    console.log("Some error meowww");
    console.error(e);
  }
};

// // MongoDB Schema
// const GameRecordSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   wins: { type: Number, default: 0 },
//   losses: { type: Number, default: 0 },
//   nftCardsPlayed: [
//     {
//       cardId: String,
//       playedAt: { type: Date, default: Date.now },
//       gameResult: String,
//       hiveStaked: Number,
//     },
//   ],
//   lastGameTimestamp: { type: Date, default: Date.now },
// });

// const GameRecord = mongoose.model("GameRecord", GameRecordSchema);

// export class VampireGameTransaction {
//   constructor() {
//     this.APP_ID = "vampire_game";
//     this.APP_VERSION = "1.0.0";
//   }

//   async sendGameResult(username, nftCard, hiveStaked, privateKey, gameResult) {
//     try {
//       // Prepare the custom JSON data
//       const gameResultData = {
//         app: `${this.APP_ID}/${this.APP_VERSION}`,
//         action: "game_result",
//         player: username,
//         nft_card: {
//           id: nftCard.id,
//           name: nftCard.name || "Unknown Card",
//           wins: nftCard.wins || 0,
//           losses: nftCard.losses || 0,
//         },
//         hive_staked: hiveStaked,
//         game_result: gameResult,
//         timestamp: new Date().toISOString(),
//       };

//       // Create the custom_json operation
//       const operations = [
//         [
//           "custom_json",
//           {
//             required_auths: [],
//             required_posting_auths: [username],
//             id: this.APP_ID,
//             json: JSON.stringify(gameResultData),
//           },
//         ],
//       ];

//       // Create and sign the transaction
//       const tx = new hiveTx.Transaction();
//       await tx.create(operations);

//       // Verify private key format and convert if necessary
//       let privateWif;
//       try {
//         privateWif = hiveTx.PrivateKey.from(privateKey);
//       } catch (e) {
//         throw new Error("Invalid private key format");
//       }

//       tx.sign(privateWif);

//       // Broadcast the transaction
//       const result = await tx.broadcast();

//       // Verify the transaction result
//       if (!result?.result?.block_num) {
//         throw new Error("Transaction failed to broadcast");
//       }

//       // Update MongoDB records
//       await this.updateGameRecord(username, nftCard, gameResult, hiveStaked);

//       return {
//         success: true,
//         message: "Game result transaction successful",
//         blockNum: result.result.block_num,
//         transactionId: result.result.id,
//       };
//     } catch (error) {
//       console.error("Transaction Error:", error);
//       throw new Error(`Transaction failed: ${error.message}`);
//     }
//   }

//   async updateGameRecord(username, nftCard, gameResult, hiveStaked) {
//     try {
//       const update = {
//         $inc: {
//           wins: gameResult === "win" ? 1 : 0,
//           losses: gameResult === "loss" ? 1 : 0,
//         },
//         $push: {
//           nftCardsPlayed: {
//             cardId: nftCard.id,
//             gameResult,
//             hiveStaked,
//             playedAt: new Date(),
//           },
//         },
//         $set: {
//           lastGameTimestamp: new Date(),
//         },
//       };

//       await GameRecord.findOneAndUpdate({ username }, update, {
//         upsert: true,
//         new: true,
//       });
//     } catch (error) {
//       console.error("MongoDB Update Error:", error);
//       throw error;
//     }
//   }
// }
