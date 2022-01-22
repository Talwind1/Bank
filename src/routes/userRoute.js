const express = require("express"); // is responsible to router
const router = express.Router();
const User = require("../model/UserModel");

router.post("/users", async (req, res) => {
  const newUser = new User({ name: "t", id: "1" });
  try {
    const users = await newUser.save();
    //  return users;
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  // const newUser = new User(req.body);
  try {
    console.log("hi");
    const users = await User.find({});
    //  return users;
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/users/:id", async (req, res) => {
  // const newUser = new User(req.body);
  try {
    const findUser = await User.findOne({ id: req.params.id });

    res.send(findUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/users/deposit/:id", async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;

  try {
    if (amount < 0) {
      throw Error("deposit should be positive");
    }
    const findUser = await User.findOneAndUpdate(
      { id: id },
      { $inc: { cash: amount } },
      { new: true }
    );
    if (!findUser) {
      res.status(400).send("user not found");
    }

    findUser = await User.findOneAndUpdate(
      { id: id },
      { $inc: { cash: amount } },
      { new: true }
    );
    res.send(findUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/users/credit/:id", async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;

  try {
    if (amount < 0) {
      throw Error("credit should be positive");
    }
    const findUser = await User.findOneAndUpdate(
      { id: id },
      { credit: amount },
      { new: true }
    );
    if (!findUser) {
      res.status(400).send("user not found");
    }
    res.send(findUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/users/withdraw/:id", async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;

  try {
    if (amount < 0) {
      throw Error("amount should be positive");
    }
    let findUser = await User.findOne({ id: id });
    if (!findUser) {
      res.status(404).send("user not found");
    }
    if (findUser.cash + findUser.credit < amount) {
      res.status(400).send("no enough money to withdraw.");
    }
    findUser = await User.findOneAndUpdate(
      { id: id },
      { $inc: { cash: -amount } },
      { new: true }
    );

    res.send(findUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/users/transfer/:id", async (req, res) => {
  const id = req.params.id;
  const reciver = req.body.reciver;
  const amount = req.body.amount;
  try {
    if (amount < 0) {
      throw Error("amount should be positive");
    }
    let findUser = await User.findOne({ id: id });
    if (!findUser) {
      res.status(404).send("user not found");
    }
    let findReciver = await User.findOne({ id: reciver });
    if (!findReciver) {
      res.status(404).send("Reciver not found");
    }
    if (findUser.cash + findUser.credit < amount) {
      res.status(400).send("no enough money to transfer.");
    }
    findUser = await User.findOneAndUpdate(
      { id: id },
      { $inc: { cash: -amount } },
      { new: true }
    );
    findReciver = await User.findOneAndUpdate(
      { id: reciver },
      { $inc: { cash: amount } },
      { new: true }
    );
    res.send({ findUser, findReciver });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
