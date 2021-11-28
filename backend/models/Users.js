const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true,
        min: 3,
        max: 20,
        unique: true,
        sparse: true
      },
      email: {
        type: String,
        required: true,
        max: 50,
        sparse:true
      },
      password:{
        type: String,
        required: true,
        max: 50,
        sparse:true
      }
})


module.exports = mongoose.model("User", UserSchema);