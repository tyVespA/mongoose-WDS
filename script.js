const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost:27017/testdb1");

async function run() {
  // const user = new User({ name: "Marco", age: "88" });
  // await user.save();
  try {
    const user = await User.create({
      name: "Marco",
      age: 89,
      email: "fakeEmail@co.it",
      hobbies: ["Weighgt Lifting", "Bowling"],
      address: {
        street: "Main St",
      },
    });

    //change name
    user.name = "Polo";
    await user.save();

    console.log(user);
  } catch (e) {
    console.log(e.message);
  }
}

run();
