const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    // we can add custom validation - we use a validate obj
    validate: {
      // validator is a function to check if its valid
      validator: (value) => value % 2 == 0,
      // we can add is a message
      message: (props) => props.value + " is not an even number",
    },
  },
  // if we want the field to be REQUIRED we need to have it as an obj
  email: {
    type: String,
    required: true,
    minlength: 4,
    // changes the email to lowercase
    lowercase: true,
  },
  createdAt: {
    type: Date,
    // we cannot change it in any way
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  // bestFriend represents another user (its a reference to another obj based on the id)
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    // what model does the ObjectId reference to?
    ref: "User",
  },
  hobbies: [String],
  // i can also put a nested obj like address in a separate Schema
  // address: addressSchema,
  address: {
    street: String,
    city: String,
  },
});

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

// we create a method on each instance of a user
// we cant use a arrow function, we need to use "this" to reference the individual instance we are working with
userSchema.methods.sayHi = function () {
  console.log("Hi my name is  " + this.name);
};

// static methods work on the model, not the instances
userSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

module.exports = mongoose.model("User", userSchema);
