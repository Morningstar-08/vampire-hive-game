const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://twrkamakshi:<db_password>@cluster0.defbw.mongodb.net/"
);
const { UserModel, TodoModel } = require("./db");

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    message: "You are signed up",
  });
});

const JWT_SECRET = "s3cret";

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
    password: password,
  });

  if (response) {
    const token = jwt.sign({
      id: response._id.toString(),
    });

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
});

const { auth, JWT_SECRET } = require("./auth");
