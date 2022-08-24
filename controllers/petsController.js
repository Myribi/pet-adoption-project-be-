const { petModel } = require("../models/petsModel");

async function getPets(req, res) {
  try {
    if (req.query.name) {
      let reqName = new RegExp(`${req.query.name}`, "i");
      req.query.name = reqName;
    }

    if (req.query.weight) {
      if (req.query.weight === "<20lbs") {
        req.query.weight = { $lt: 20 };
      } else if (req.query.weight === "20-50lbs") {
        req.query.weight = { $gte: 20, $lt: 50 };
      } else if (req.query.weight === "50-70lbs") {
        req.query.weight = { $gte: 50, $lt: 80 };
      } else {
        req.query.weight = { $gte: 80 };
      }
    }

    if (req.query.height) {
      if (req.query.height === "<20cm") {
        req.query.height = { $lt: 20 };
      } else if (req.query.height === "20-50cm") {
        req.query.height = { $gte: 20, $lt: 50 };
        console.log(req.query.height);
      } else if (req.query.height === "50-70cm") {
        req.query.height = { $gte: 50, $lt: 80 };
      } else {
        req.query.height = { $gte: 80 };
      }
    }

    const allPets = await petModel.find(req.query);
    console.log(req.query);
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getPetById(req, res) {
  try {
    const petById = await petModel.findById(req.params.id);
    console.log("hey", petById);
    res.send(petById);
  } catch (err) {
    res.status(500).send("fetching pet failed, try again later");
  }
}

async function addPet(req, res) {
  const {
    type,
    name,
    adoptionStatus,
    picUrl,
    height,
    weight,
    color,
    bio,
    hypoallergnic,
    dietery,
    breed,
  } = req.body;
  console.log(req.body, "req.body");
  try {
    const newPet = await petModel.create({
      type: type,
      name: name,
      adoptionStatus: adoptionStatus,
      picture: picUrl,
      height: height,
      weight: weight,
      color: color,
      bio: bio,
      hypoallergnic: hypoallergnic,
      dietery: dietery,
      breed: breed,
    });

    console.log(newPet, "newPet");
    await newPet.save();
    await res.send(newPet);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { getPets, getPetById, addPet };
