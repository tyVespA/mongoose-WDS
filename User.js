const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    // we can add custom validation - we use a validate obj
    validate: {
      // function to check if its valid
      validator: (value) => value % 2 == 0,
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
  bestFriend: mongoose.SchemaTypes.ObjectId,
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

module.exports = mongoose.model("User", userSchema);
