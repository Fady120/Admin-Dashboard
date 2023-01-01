import User from "../models/User.js";

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
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};