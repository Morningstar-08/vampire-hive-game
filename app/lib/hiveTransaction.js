import hiveTx from "hive-tx";

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
      console.log("yayayayayayaay ho gaya meow");
      return result;
    } else {
      console.log("oops some error meow");
    }
  } catch (e) {
    console.log("Some error meowww");
    console.error(e);
  }
};
