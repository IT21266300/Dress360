import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Add a new User
export const addNewUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
      name,
      address,
      phone,
      email,
      password,
    });
    await newUser.save();
    res.send({ message: `New User Added..!`, newUser });
    console.log(`New User Added: `, newUser);
  } catch (error) {
    next(error);
  }
});

//get user's details
export const getUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const user = await User.find();
    res.send(user);
    console.log(user);
  } catch (error) {
    next(error);
  }
});



