const express = require('express');
const router = express.Router();
const UserModelPath = require('../models/UserModel');

// Sign up
/*
{
    "username": "testuser",
    "email": "test@test.com",
    "city": "testcity",
    "website": "http://test.com",
    "zipCode": "12345-1234",
    "phone": "1-123-123-1234"
}
 */

router.post('/users', async (req, res) => {
    
    const user = new UserModelPath({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        city: req.body.city,
        website: req.body.website,
        zipCode: req.body.zipCode,
        phone: req.body.phone
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser)
    } 
    catch (er){
        res.status(400).json({message:er});
    }
});

// Log in

router.post('/account/login', async (req, res) => {

    const { username, password } = req.body;
    const user = await UserModelPath.findOne({

        username: username,
        password: password
    })

    if(user.password === password) {
        res.status(200).json({"username": user.username, "password": user.password})
    }
    else {

        res.status(400).send('Invalid username or Incorrect password');
    }
});
 
module.exports = router;