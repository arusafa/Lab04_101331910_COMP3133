const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 4,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(value);
      },
      message:
        "Email format is not valid",
    },
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    suite: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          let cityRegex = /^[A-Za-z.\s ]+$/;
          return cityRegex.test(value);
        },
        message:
          "City format is not valid",
      },
    },
    zipcode: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          let zipRegex = /\b\d{5}\b-\b\d{4}\b/g;
          return zipRegex.test(value);
        },
        message:
          "Zipcode format is not valid",
      },
    },
    geo: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        let phoneRegex = /\b\d{1}\b-\b\d{3}\b-\b\d{3}\b-\b\d{4}\b/g;
        return phoneRegex.test(value);
      },
      message:
        "Phone format is not valid",
    },
  },
  website: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        let urlRegex = /^(http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
      },
      message:
        "Website format is not valid",
    },
  },
  company: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    catchPhrase: {
      type: String,
      required: true,
      trim: true,
    },
    bs: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
