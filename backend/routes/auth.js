const express = require('express');
const router = express.Router();
const User = require('../models/User')
const JWT_SECRET = "chelawatak";
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

// 1. Create a user using POST: ./api/auth/newuser
// Does not require authentication
router.post(
    '/newuser', 

    [
        body("name", "Enter user name: "),
        body("email", "Enter user email address: ").isEmail(),
        body("password", "Enter password: ")
    ],

    async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log("User with same credentials already exists ");
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user){
            console.log(req.body);
            const user = User(req.body);
            user.save();
            const data={
                user:{
                id:user.id
                }
            }

            const auth_token =jwt.sign(data,JWT_SECRET);
            success = true;
            res.json({success,auth_token});
            
        }

        else{
            console.log("User with same email already exists");
            return res.status(404).json("User with same email already exists");
        }
        
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
    
})




// 1. Login a user using POST: ./api/auth/login
router.post(
    '/login',
    [
        body("email", "Please enter email address").isEmail(),
        body("password","Please enter your password")
    ],

    async(req,res) => {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            console.log("User with same credentials already exists ");
            return res.status(400).json({ errors: errors.array() });
        }


        try {
            const{email, password}= req.body;
            let user =await User.findOne({email});
            if(!user){
                return res.status(404).json("User with same email doesn't exists");
            }

            else{
                if(user.password === password){
                    const data={
                    user:{
                        id:user.id
                    }
                    }
                
                    const auth_token =jwt.sign(data,JWT_SECRET);
                    success = true;
                    res.json({success,auth_token});
                }

                else{
                    success = false;
                    const falsenote = "Please enter correct password, password doesn't matched";
                    res.send({success, falsenote});
                }
            }   
        } 
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


module.exports = router;