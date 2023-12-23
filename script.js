const mongoose = require("mongoose");
const User = require("./User");

mongoose.connect("mongodb://localhost:27017/testdb1");

async function run() {
  // we can use new User or User.create
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

// QUERIES
// we use .where

async function findUser() {
  // lt is less than, gt greater than
  const user = await User.where("age").lt("12");
  const user2 = await User.where("name").equals("Kyle");
  // we can chain where(s)
  const user3 = await User.where("age")
    .lt("90")
    .gt("12")
    .where("name")
    .equals("Polo")
    // limits the results
    .limit(1)
    // only returns the hobbies
    .select("hobbies");

  console.log(user, user2, user3);
  const userInstance = user[0];
  userInstance.sayHi();
}

findUser();
