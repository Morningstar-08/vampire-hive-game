import connectMongo from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectMongo();
    res.status(200).json({ message: "MongoDB connection successful!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "MongoDB connection failed", details: error.message });
  }
}
