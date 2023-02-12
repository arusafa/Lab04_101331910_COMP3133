const mongoose = require('mongoose');
const validator = require('validator');

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: 'Invalid email address'
    }
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[a-zA-Z\s]+$/.test(value);
      },
      message: 'City name must only contain alphabets and spaces'
    }
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isURL(value, { protocols: ['http', 'https'] });
      },
      message: 'Invalid URL address'
    }
  },
  zipCode: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^\d{5}-\d{4}$/.test(value);
      },
      message: 'Zip code format must be DDDDD-DDDD (D = digit)'
    }
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^\d{1}-\d{3}-\d{3}-\d{4}$/.test(value);
      },
      message: 'Phone format must be D-DDD-DDD-DDD (D = digit)'
    }
  }
});

const User = mongoose.model('User', userModel);

module.exports = User;
