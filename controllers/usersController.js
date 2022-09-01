const { userModel } = require("../models/usersModel");
const User = require("../models/usersModel");

const jwt = require("jsonwebtoken");
const { petModel } = require("../models/petsModel");

async function signup(req, res) {
  const { name, phone, email, bio, password, repassword } = req.body;
  if (!name || !email || !phone || !password || !repassword) {
    return res.status(400).send("Please fill all the fields");
  }
  try {
    const newUser = await userModel.create({
      name,
      phone,
      email,
      bio,
      password,
    });

    await newUser.save();
    await res.send(newUser);
  } catch (err) {
    console.log(err);
  }
}

function login(req, res) {
  try {
    const { user } = req.body;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({
      token: token,
      userId: user._id,
      user: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      adoptedPets: user.adoptedPets,
      fosteredPets: user.fosteredPets,

    });
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(req, res) {
  try {
    const userById = await userModel.findById(req.params.id);
    res.send(userById);
  } catch (err) {
    res.status(500).send("fetching user failed, try again later");
  }
}

async function editUserData(req, res) {
  try {
    const newInfo = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      {
        new: true,
      }
    );
    await res.send(newInfo);
  } catch (error) {
    console.log(error);
  }
}

async function editUserPwd(req, res) {
  try {
    const newInfo = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { password: req.body.updatedPwd },
      {
        new: true,
      }
    );
    await res.send(newInfo);
  } catch (error) {
    console.log(error);
  }
}

async function addFavPet(req, res) {
  try {
    const addedFavPet = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      
      { $push: { favPets: req.body.petId } }
    );
  } catch (error) {
    console.log(error);
  }
}

async function getFavPets(req, res) {
  
  try {
    const fav = await Promise.all(
      req.body.user.favPets.map(async (id) => {
        const pet = await petModel.findOne({ _id: id });

        return pet;
      })
    );

    // const fostered = await Promise.all(
    //   req.body.user.fosteredPets.map(async (id) => {
    //     const fos = await petModel.findOne({ _id: id });
    //     return fos;
    //   })
    // );

    // const adopted = await Promise.all(
    //   req.body.user.adoptedPets.map(async (id) => {
    //     const ad = await petModel.findOne({ _id: id });
    //     return ad;
    //   })
    // );

    res.send(fav);
  } catch (error) {
    console.log(error);
  }
}

async function removeFavPets(req, res) {
  try {
    const removeFavPet = await userModel.findOneAndUpdate(
      { _id: req.body.id },
      { $pull: { favPets: req.body.petId } }
    );
    res.send(removeFavPet);
  } catch (error) {
    console.log(error);
  }
}



module.exports = {
  signup,
  login,
  getUserById,
  editUserData,
  editUserPwd,
  addFavPet,
  getFavPets,
  removeFavPets,
};
