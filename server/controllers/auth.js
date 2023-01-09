import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { response } from "express";
// import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      city,
      state,
      country,
      occupation,
      phoneNumber,
    } = req.body;

    // const salt = await bcrypt.genSalt();
    // const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password,
      city,
      state,
      country,
      occupation,
      phoneNumber,
    });

    const savedUser = await newUser.save();

    const accessToken = jwt.sign({email:email,id:savedUser._id},process.env.ACCESS_TOKEN_SECRET);
    res.cookie('token',accessToken,{
        expires: new Date(Date.now() + 900000),  // if 900000 = 8*36000000 (cookie expires in 8 hours)
        secure: false, 
        httpOnly: true,
    })

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).exec();
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    let isVaildPassword = false;
    if(password == user.password)
    {
      isVaildPassword = true;
    }

    if (!isVaildPassword) { 
    res.status(400).json({ msg: "Invalid credentials. " });
    return;
    }

    const accessToken = jwt.sign({email:email},process.env.ACCESS_TOKEN_SECRET);
    res.cookie('token',accessToken,{
      expires: new Date(Date.now() + 900000),  // if 900000 = 8*36000000 (cookie expires in 8 hours)
      secure: false, 
      httpOnly: true,
    })
    // res.send("Cooike ok");
    res.status(201).send('login ok')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};